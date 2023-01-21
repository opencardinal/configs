import type { ParsedIdlAccountData } from "@cardinal/common";
import { emptyWallet } from "@cardinal/common";
import { Program } from "@project-serum/anchor";
import type { Wallet } from "@project-serum/anchor/dist/cjs/provider";
import { AnchorProvider } from "@project-serum/anchor/dist/cjs/provider";
import type { ConfirmOptions, Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

import * as CONFIGS_TYPES from "../idl/cardinal_configs";

export const CONFIGS_ADDRESS = new PublicKey(
  "cnf9Q2MmjDVbzX1kjr8tEEtPJyB4e1avEuBMzWygnWo"
);

export const CONFIG_ENTRY_SEED = "config-entry";

export type CONFIGS_PROGRAM = CONFIGS_TYPES.CardinalConfigs;

export const CONFIGS_IDL = CONFIGS_TYPES.IDL;

export type ConfigEntryData = ParsedIdlAccountData<
  "configEntry",
  CONFIGS_PROGRAM
>;

export const configsProgram = (
  connection: Connection,
  wallet?: Wallet,
  confirmOptions?: ConfirmOptions
) => {
  return new Program<CONFIGS_PROGRAM>(
    CONFIGS_IDL,
    CONFIGS_ADDRESS,
    new AnchorProvider(
      connection,
      wallet ?? emptyWallet(PublicKey.default),
      confirmOptions ?? {}
    )
  );
};
