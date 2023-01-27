import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import { CONFIG_ENTRY_SEED, CONFIGS_ADDRESS } from "./constants";

/**
 * Finds the config entry id.
 * @returns
 */
export const findConfigEntryId = (prefix: Buffer, key: Buffer): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode(CONFIG_ENTRY_SEED), prefix, key],
    CONFIGS_ADDRESS
  )[0];
};
