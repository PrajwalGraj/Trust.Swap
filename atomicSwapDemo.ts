// Atomic Swap Demo Script
// This script shows the flow for deploying and interacting with HTLC contracts on Aptos and Ethereum testnets.
// Inline comments provided for hackathon explanation.

import { AptosClient, AptosAccount, FaucetClient } from "aptos";
import { ethers } from "ethers";

// --- CONFIG ---
const APTOS_NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const APTOS_FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const ETH_RPC_URL = "https://rpc.sepolia.org"; // Use Sepolia testnet
const HTLC_SOL_PATH = "./ethereum-contracts/contracts/HTLC.sol";
const HTLC_MOVE_PATH = "./htlc.move";

// --- SETUP ---
const aptosClient = new AptosClient(APTOS_NODE_URL);
const faucetClient = new FaucetClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
const ethProvider = new ethers.JsonRpcProvider(ETH_RPC_URL);

// Create demo accounts
const aliceAptos = new AptosAccount();
const bobAptos = new AptosAccount();
const aliceEth = ethers.Wallet.createRandom().connect(ethProvider);
const bobEth = ethers.Wallet.createRandom().connect(ethProvider);

async function main() {
  // Fund Aptos accounts
  await faucetClient.fundAccount(aliceAptos.address(), 100_000_000);
  await faucetClient.fundAccount(bobAptos.address(), 100_000_000);

  // Fund Ethereum accounts (use faucet manually for Sepolia)
  console.log("Fund Alice and Bob on Sepolia using a faucet if needed.");

  // --- Deploy HTLC contracts ---
  // Deploy Move module (use CLI or SDK)
  console.log("Deploy Aptos HTLC module using CLI or IDE (see htlc.move)");

  // Deploy Solidity contract
  const HTLCFactory = new ethers.ContractFactory(
    // ABI and Bytecode from compiled HTLC.sol
    [
      "function claim(bytes32 _secret) external",
      "function refund() external",
      "constructor(address _receiver, bytes32 _hashlock, uint256 _timelock) payable"
    ],
    "0x...", // Replace with compiled bytecode
    aliceEth
  );

  // --- Atomic Swap Flow ---
  // 1. Alice picks a secret and hash
  const secret = ethers.encodeBytes32String("supersecret");
  const hashlock = ethers.keccak256(secret);
  const timelock = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  // 2. Alice locks APT in Aptos HTLC
  console.log("Alice locks APT in Aptos HTLC (see htlc.move)");
  // Use AptosClient to submit lock transaction

  // 3. Bob locks ETH in Ethereum HTLC
  const htlcEth = await HTLCFactory.deploy(bobEth.address, hashlock, timelock, { value: ethers.parseEther("0.01") });
  await htlcEth.waitForDeployment();
  console.log("Bob locks ETH in Ethereum HTLC:", htlcEth.target);

  // 4. Alice claims ETH on Ethereum by revealing secret
  await htlcEth.functions.claim(secret);
  console.log("Alice claims ETH by revealing secret.");

  // 5. Bob sees secret on Ethereum, uses it to claim APT on Aptos
  console.log("Bob claims APT on Aptos using revealed secret (see htlc.move)");
  // Use AptosClient to submit claim transaction

  // 6. If swap fails, refund after timelock
  // htlcEth.refund(); // Bob can refund if Alice doesn't claim in time

  console.log("Atomic swap demo complete.");
}

main().catch(console.error);
