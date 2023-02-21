import { chunkArray, tryNull } from "@cardinal/common";
import { utils, Wallet } from "@project-serum/anchor";
import type { Cluster } from "@solana/web3.js";
import {
  Connection,
  Keypair,
  sendAndConfirmRawTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as dotenv from "dotenv";

import {
  configsProgram,
  findConfigEntryId,
  getConfigEntry,
} from "../src/programs";
import { stakePoolMetadatas } from "./mapping";

dotenv.config();

const PARALLEL_TXS = 30;
const CONFIG_VALUE_LIMIT = 790;
const wallet = new Wallet(
  Keypair.fromSecretKey(utils.bytes.bs58.decode(process.env.WALLET || ""))
);

const main = async (cluster: Cluster | "mainnet" | "localnet" = "devnet") => {
  const connection = new Connection(
    cluster === "mainnet"
      ? process.env.MAINNET_PRIMARY_URL || ""
      : "https://api.devnet.solana.com"
  );
  const program = configsProgram(connection);

  const metadataTransactions: Transaction[][] = [];
  for (const config of stakePoolMetadatas) {
    const prefixBuffer = Buffer.from("s", "utf-8");
    const keyBuffer = Buffer.from(config.name, "utf-8");
    const reverseKeyBuffer = config.stakePoolAddress.toBuffer();
    const configEntryId = findConfigEntryId(prefixBuffer, keyBuffer);
    const reverseConfigEntryId = findConfigEntryId(
      prefixBuffer,
      reverseKeyBuffer
    );
    const checkConfigEntry = await tryNull(
      getConfigEntry(connection, prefixBuffer, keyBuffer)
    );

    // reorder
    const { stakePoolAddress: _, ...otherObject } = config;
    const configString = JSON.stringify({
      stakePoolAddress: config.stakePoolAddress.toString(),
      ...otherObject,
    });
    const configChunks = chunkArray(
      configString.split(""),
      CONFIG_VALUE_LIMIT
    ).map((chunk) => chunk.join(""));

    const transactions: Transaction[] = [];
    if (!checkConfigEntry?.parsed) {
      const transaction = new Transaction();
      const initIx = await program.methods
        .initConfigEntry({
          prefix: prefixBuffer,
          key: keyBuffer,
          value: configChunks[0]!,
          extends: [],
        })
        .accountsStrict({
          configEntry: configEntryId,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .remainingAccounts([
          {
            pubkey: config.stakePoolAddress,
            isSigner: false,
            isWritable: false,
          },
        ])
        .instruction();
      const reverseMappingIx = await program.methods
        .initConfigEntry({
          prefix: prefixBuffer,
          key: reverseKeyBuffer,
          value: "",
          extends: [configEntryId],
        })
        .accountsStrict({
          configEntry: reverseConfigEntryId,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .remainingAccounts([
          {
            pubkey: config.stakePoolAddress,
            isSigner: false,
            isWritable: false,
          },
        ])
        .instruction();
      transaction.instructions = [
        ...transaction.instructions,
        initIx,
        reverseMappingIx,
      ];
      transactions.push(transaction);

      for (let index = 1; index < configChunks.length; index++) {
        const transaction = new Transaction();
        const updateIx = await program.methods
          .updateConfigEntry({
            value: configChunks[index]!,
            extends: [],
            append: true,
          })
          .accountsStrict({
            configEntry: configEntryId,
            authority: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .remainingAccounts([
            {
              pubkey: config.stakePoolAddress,
              isSigner: false,
              isWritable: false,
            },
          ])
          .instruction();
        transaction.add(updateIx);
        transactions.push(transaction);
      }
    } else {
      for (let index = 0; index < configChunks.length; index++) {
        const configChunk = configChunks[index]!;
        const transaction = new Transaction();
        const updateIx = await program.methods
          .updateConfigEntry({
            value: configChunk,
            extends: [],
            append: !(index === 0),
          })
          .accountsStrict({
            configEntry: configEntryId,
            authority: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .remainingAccounts([
            {
              pubkey: config.stakePoolAddress,
              isSigner: false,
              isWritable: false,
            },
          ])
          .instruction();
        transaction.add(updateIx);
        transactions.push(transaction);
      }
    }
    metadataTransactions.push(transactions);
  }

  const batchedMetadataTxs = chunkArray(metadataTransactions, PARALLEL_TXS);
  for (const metadataTxs of batchedMetadataTxs) {
    const recentBlockhash = (await connection.getRecentBlockhash("max"))
      .blockhash;
    await Promise.all(
      metadataTxs.map(async (txs, index) => {
        const txids: string[] = [];
        for (const tx of txs) {
          tx.feePayer = wallet.publicKey;
          tx.recentBlockhash = recentBlockhash;
        }
        const signedTransactions = await wallet.signAllTransactions(txs);
        for (const signedTx of signedTransactions) {
          const txid = await sendAndConfirmRawTransaction(
            connection,
            signedTx.serialize()
          );
          txids.push(txid);
        }
        console.log(
          `---[${index + 1}/${metadataTxs.length + 1}] ${txids.toString()}`
        );
      })
    );
    await new Promise((r) => setTimeout(r, 1000));
  }
};

main("mainnet").catch((e) => console.log(e));
