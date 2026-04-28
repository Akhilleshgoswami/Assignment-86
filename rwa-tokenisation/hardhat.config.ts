import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.AMOY_RPC_URL?.toString() || " " + process.env.POLYGONSCAN_API_KEY?.toString())
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: process.env.AMOY_RPC_URL?.toString() || " ",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
};

export default config;
