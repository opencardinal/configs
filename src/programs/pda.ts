import type { web3 } from "@project-serum/anchor";
import { utils } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

import { CONFIG_ENTRY_SEED, configs_ADDRESS } from "./constants";

/**
 * Finds the config entry id.
 * @returns
 */
export const findConfigEntryId = (name: string): web3.PublicKey => {
  return findProgramAddressSync(
    [utils.bytes.utf8.encode(CONFIG_ENTRY_SEED), utils.bytes.utf8.encode(name)],
    configs_ADDRESS
  )[0];
};
