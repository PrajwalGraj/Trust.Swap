const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  // Receiver, Hashlock, Timelock
  const receiver = "0x72173590837556cE1f9c50Ba003C0822Ab36E655";
  const hashlock = "0x003ec04989e1a5f97a79b4b89d1a3732909fec6f61a48bd831f185e923e55ae1";
  const timelock = 1757156538;

  // Compile + get factory
  const HTLC = await hre.ethers.getContractFactory("HTLC");

  // Deploy (don’t pass "to", just constructor args + overrides)
  const htlc = await HTLC.deploy(
    receiver,
    hashlock,
    timelock,
    { value: hre.ethers.parseEther("0.01") } // optional ETH
  );

  await htlc.waitForDeployment();

  console.log("Contract deployed at:", await htlc.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
