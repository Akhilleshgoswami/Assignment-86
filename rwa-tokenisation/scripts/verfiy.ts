import { task } from "hardhat/config";

task("verify-all", "Verify contracts").setAction(async (_, hre) => {
  const { run } = hre;

  const token = "0xc313D1390c92Aa106c8cbdf462a993893F469f2B";
  const treasury = "0x1944F77475988F5fb864706361E4f127765c07DC";
  const deployer = "0x1057aA6f8Ca2e9eeBFAe49E9Af2fd6EC86e960ab";

  try {
    await run("verify:verify", {
      address: token,
      constructorArguments: [deployer],
    });
    console.log("Token verified");
  }    catch (e: any) {
  console.log("Token verify error:", e.message);

  }

  try {
    await run("verify:verify", {
      address: treasury,
      constructorArguments: [token, 100, deployer],
    });
    console.log("Treasury verified");
  } 
    catch (e: any) {
  console.log("Token verify error:", e.message);

  }
});
