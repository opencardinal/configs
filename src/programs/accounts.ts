import type { AccountData } from "@cardinal/common";
import { fetchIdlAccount } from "@cardinal/common";
import type { Connection } from "@solana/web3.js";

import type { CONFIGS_PROGRAM, StorageEntryData } from "./constants";
import { CONFIGS_IDL } from "./constants";
import { findConfigEntryId } from "./pda";

export const getConfigEntry = async (
  connection: Connection,
  name: string
): Promise<AccountData<StorageEntryData>> => {
  const storageEntryId = findConfigEntryId(name);
  return fetchIdlAccount<"configEntry", CONFIGS_PROGRAM>(
    connection,
    storageEntryId,
    "configEntry",
    CONFIGS_IDL
  );
};
