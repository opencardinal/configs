import type { AccountData } from "@cardinal/common";
import { fetchIdlAccount } from "@cardinal/common";
import type { Connection } from "@solana/web3.js";

import type { configs_PROGRAM, StorageEntryData } from "./constants";
import { configs_IDL } from "./constants";
import { findStorageEntryId } from "./pda";

export const getConfigEntry = async (
  connection: Connection,
  name: string
): Promise<AccountData<StorageEntryData>> => {
  const storageEntryId = findStorageEntryId(name);
  return fetchIdlAccount<"storageEntry", configs_PROGRAM>(
    connection,
    storageEntryId,
    "storageEntry",
    configs_IDL
  );
};
