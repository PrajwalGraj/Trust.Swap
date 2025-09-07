// Aptos Atomic Swap Demo
// This script demonstrates the Aptos HTLC flow only.
// Inline comments for hackathon explanation.

import { AptosClient, AptosAccount, FaucetClient } from "aptos";

const APTOS_NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const APTOS_FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const aptosClient = new AptosClient(APTOS_NODE_URL);
const faucetClient = new FaucetClient(APTOS_NODE_URL, APTOS_FAUCET_URL);

const aliceAptos = new AptosAccount();
const bobAptos = new AptosAccount();

async function main() {
  // Fund accounts
  await faucetClient.fundAccount(aliceAptos.address(), 100_000_000);
  await faucetClient.fundAccount(bobAptos.address(), 100_000_000);

  // Deploy HTLC Move module (use CLI or IDE)
  console.log("Deploy Aptos HTLC module using CLI or IDE (see htlc.move)");

  // Lock, claim, refund logic would go here using AptosClient
  // For demo, show function calls:
  console.log("Alice locks APT in HTLC");
  console.log("Bob claims APT with secret");
  console.log("Refund if timelock expires");
}

main().catch(console.error);
