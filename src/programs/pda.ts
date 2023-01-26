import { tryPublicKey } from "@cardinal/common";
import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import { CONFIG_ENTRY_SEED, CONFIGS_ADDRESS } from "./constants";

/**
 * Finds the config entry id.
 * @returns
 */
export const findConfigEntryId = (key: string, prefix?: string): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode(CONFIG_ENTRY_SEED),
      utils.bytes.utf8.encode(prefix ? `${prefix}:` : ""),
      tryPublicKey(key)
        ? new PublicKey(key).toBuffer()
        : utils.bytes.utf8.encode(key),
    ],
    CONFIGS_ADDRESS
  )[0];
};
