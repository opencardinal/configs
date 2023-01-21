import { executeTransaction } from "@cardinal/common";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import {
  configsProgram,
  findConfigEntryId,
  getConfigEntry,
} from "../src/programs";
import type { CardinalProvider } from "./workspace";
import { getProvider } from "./workspace";

describe("Create config entry", () => {
  const configEntryName = `config-entry-${Math.random()}`;
  let provider: CardinalProvider;

  it("Init config entry", async () => {
    provider = await getProvider();
    const program = configsProgram(provider.connection);

    const transaction = new Transaction();
    const configEntryId = findConfigEntryId(configEntryName);
    const ix = await program.methods
      .initConfigEntry({
        key: configEntryName,
        value: "value",
        extends: [],
      })
      .accountsStrict({
        configEntry: configEntryId,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const configEntryData = await getConfigEntry(
      provider.connection,
      configEntryName
    );

    expect(configEntryData.parsed.key).toEqual(configEntryName);
    expect(configEntryData.parsed.value).toEqual("value");
  });

  it("Update config entry", async () => {
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
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.instructions.push(ix);

    await executeTransaction(provider.connection, transaction, provider.wallet);

    const configEntryData = await getConfigEntry(
      provider.connection,
      configEntryName
    );

    expect(configEntryData.parsed.key).toEqual(configEntryName);
    expect(configEntryData.parsed.value).toEqual("150");
  });
});
