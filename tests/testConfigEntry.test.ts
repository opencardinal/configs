import { executeTransaction } from "@cardinal/common";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import {
  configsProgram,
  findConfigEntryId,
  getConfigEntry,
} from "../src/programs";
import type { CardinalProvider } from "./workspace";
import { getProvider } from "./workspace";

describe("Create storage entry", () => {
  const storageEntryName = `storage-entry-${Math.random()}`;
  let provider: CardinalProvider;

  it("Init storage entry", async () => {
    provider = await getProvider();
    const program = configsProgram(provider.connection);

    const transaction = new Transaction();
    const storageEntryId = findConfigEntryId(storageEntryName);
    const ix = await program.methods
      .initConfigEntry({
        key: storageEntryName,
        extends: [],
      })
      .accountsStrict({
        configEntry: storageEntryId,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const storageEntryData = await getConfigEntry(
      provider.connection,
      storageEntryName
    );

    expect(storageEntryData.parsed.key).toEqual(storageEntryName);
  });

  it("Update storage entry", async () => {
    const program = configsProgram(provider.connection);

    const transaction = new Transaction();
    const ix = await program.methods
      .updateConfigEntry({
        value: "150",
        extends: [],
      })
      .accountsStrict({
        configEntry: PublicKey.default,
        authority: PublicKey.default,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const storageEntryData = await getConfigEntry(
      provider.connection,
      storageEntryName
    );

    expect(storageEntryData.parsed.key).toEqual(storageEntryName);
    expect(storageEntryData.parsed.value).toEqual("150");
  });
});
