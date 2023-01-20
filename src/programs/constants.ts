import type { ParsedIdlAccountData } from "@cardinal/common";
import { emptyWallet } from "@cardinal/common";
import { Program } from "@project-serum/anchor";
import type { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { AnchorProvider } from "@project-serum/anchor/dist/cjs/provider";
import type { ConfirmOptions, Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

import * as ONCHAIN_STORAGE_TYPES from "../idl/cardinal_onchain_storage";

export const ONCHAIN_STORAGE_ADDRESS = new PublicKey(
  "cosTRGbPdRwuyAnWXQ8H7rNXZNXvsQ3nbvzGd9BdvoT"
);

export const STORAGE_ENTRY_SEED = "storage-entry";

export type ONCHAIN_STORAGE_PROGRAM =
  ONCHAIN_STORAGE_TYPES.CardinalOnchainStorage;

export const ONCHAIN_STORAGE_IDL = ONCHAIN_STORAGE_TYPES.IDL;

export type StorageEntryData = ParsedIdlAccountData<
  "storageEntry",
  ONCHAIN_STORAGE_PROGRAM
>;

export const onchainStorageProgram = (
  connection: Connection,
  wallet?: Wallet,
  confirmOptions?: ConfirmOptions
) => {
  return new Program<ONCHAIN_STORAGE_PROGRAM>(
    ONCHAIN_STORAGE_IDL,
    ONCHAIN_STORAGE_ADDRESS,
    new AnchorProvider(
      connection,
      wallet ?? emptyWallet(PublicKey.default),
      confirmOptions ?? {}
    )
  );
};
