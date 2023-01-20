import type { AccountData } from "@cardinal/common";
import { fetchIdlAccount } from "@cardinal/common";
import type { Connection } from "@solana/web3.js";

import type { ONCHAIN_STORAGE_PROGRAM, StorageEntryData } from "./constants";
import { ONCHAIN_STORAGE_IDL } from "./constants";
import { findStorageEntryId } from "./pda";

export const getStorageEntry = async (
  connection: Connection,
  name: string
): Promise<AccountData<StorageEntryData>> => {
  const storageEntryId = findStorageEntryId(name);
  return fetchIdlAccount<"storageEntry", ONCHAIN_STORAGE_PROGRAM>(
    connection,
    storageEntryId,
    "storageEntry",
    ONCHAIN_STORAGE_IDL
  );
};
