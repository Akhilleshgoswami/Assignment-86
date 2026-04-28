import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  console.log("Deploying from:", deployerAddress);

  const RATE = 100;

  // Deploy Token
  const Token = await ethers.getContractFactory("RWAToken");
  const token = await Token.deploy(deployerAddress);
  await token.waitForDeployment();

  console.log("Token deployed at:", token.target);

  // Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(
    token.target,
    RATE,
    deployerAddress
  );
  await treasury.waitForDeployment();

  console.log("Treasury deployed at:", treasury.target);

  // Grant MINTER_ROLE
  const MINTER_ROLE = await token.MINTER_ROLE();
  await token.grantRole(MINTER_ROLE, treasury.target);

  console.log("Minter role granted");

  // wait a bit before verify
  console.log("Waiting before verification...");
  await new Promise((resolve) => setTimeout(resolve, 60000));

  // Verify Token
  try {
    await run("verify:verify", {
      address: token.target,
      constructorArguments: [deployerAddress],
    });
    console.log("Token verified");
  } catch (e: any) {
    console.log("Token verify skipped / failed",e);
  }

  // Verify Treasury
  try {
    await run("verify:verify", {
      address: treasury.target,
      constructorArguments: [token.target, RATE, deployerAddress],
    });
    console.log("Treasury verified");
  } catch (e: any) {
    console.log("Treasury verify skipped / failed");
  }

  console.log("Done");
  console.log("Token:", token.target);
  console.log("Treasury:", treasury.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
