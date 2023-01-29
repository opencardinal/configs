import type { AccountData } from "@cardinal/common";
import type { Connection } from "@solana/web3.js";

import type { ConfigEntryData } from "./constants";
import { configsProgram } from "./constants";
import { findConfigEntryId } from "./pda";

export const getConfigEntry = async (
  connection: Connection,
  key: Buffer,
  prefix: Buffer
): Promise<AccountData<ConfigEntryData>> => {
  const configEntryId = findConfigEntryId(prefix, key);
  const program = configsProgram(connection);
  const parsed = await program.account.configEntry.fetch(configEntryId);
  return {
    pubkey: configEntryId,
    parsed,
  };
};
