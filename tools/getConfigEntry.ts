import { connectionFor, tryNull } from "@cardinal/common";
import type { Cluster } from "@solana/web3.js";

import { getConfigEntry } from "../src/programs";

const main = async (
  prefix: string,
  key: string,
  cluster: Cluster | "mainnet" | "localnet" = "devnet"
) => {
  const connection = connectionFor(cluster);
  const prefixBuffer = Buffer.from(prefix, "utf-8");
  const keyBuffer = Buffer.from(key, "utf-8");
  const configEntry = await tryNull(
    getConfigEntry(connection, prefixBuffer, keyBuffer)
  );
  console.log(configEntry);
};

main("", "").catch((e) => console.log(e));
