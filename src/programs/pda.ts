import type { web3 } from "@project-serum/anchor";
import { utils } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

import { ONCHAIN_STORAGE_ADDRESS, STORAGE_ENTRY_SEED } from "./constants";

/**
 * Finds the storage entry id.
 * @returns
 */
export const findStorageEntryId = (name: string): web3.PublicKey => {
  return findProgramAddressSync(
    [
      utils.bytes.utf8.encode(STORAGE_ENTRY_SEED),
      utils.bytes.utf8.encode(name),
    ],
    ONCHAIN_STORAGE_ADDRESS
  )[0];
};
