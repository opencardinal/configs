import { executeTransaction } from "@cardinal/common";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import {
  findStorageEntryId,
  getStorageEntry,
  onchainStorageProgram,
} from "../src/programs";
import type { CardinalProvider } from "./workspace";
import { getProvider } from "./workspace";

describe("Create storage entry", () => {
  const storageEntryName = `storage-entry-${Math.random()}`;
  let provider: CardinalProvider;

  it("Init storage entry", async () => {
    provider = await getProvider();
    const program = onchainStorageProgram(provider.connection);

    const transaction = new Transaction();
    const storageEntryId = findStorageEntryId(storageEntryName);
    const ix = await program.methods
      .initStorageEntry({
        name: storageEntryName,
        extends: [],
      })
      .accounts({
        storageEntry: storageEntryId,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const storageEntryData = await getStorageEntry(
      provider.connection,
      storageEntryName
    );

    expect(storageEntryData.parsed.name).toEqual(storageEntryName);
    expect(storageEntryData.parsed.authority.toString()).toEqual(
      provider.wallet.publicKey.toString()
    );
  });

  it("Update storage entry", async () => {
    const program = onchainStorageProgram(provider.connection);

    const transaction = new Transaction();
    const ix = await program.methods
      .updateStorageEntry({
        value: "150",
        extends: [],
      })
      .accounts({
        storageEntry: PublicKey.default,
        authority: PublicKey.default,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const storageEntryData = await getStorageEntry(
      provider.connection,
      storageEntryName
    );

    expect(storageEntryData.parsed.name).toEqual(storageEntryName);
    expect(storageEntryData.parsed.value).toEqual("150");
    expect(storageEntryData.parsed.authority.toString()).toEqual(
      provider.wallet.publicKey.toString()
    );
  });
});
