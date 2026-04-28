import { task } from "hardhat/config";

task("verify-all", "Verify contracts").setAction(async (_, hre) => {
  const { run } = hre;

  const token = "0xA8114D4c922bccEE4316ed0191175701F195A149";
  const treasury = "0xbD56225867Cbb56B0dA9586d6b6079C17C388f26";
  const deployer = "0x1057aA6f8Ca2e9eeBFAe49E9Af2fd6EC86e960ab";

  try {
    await run("verify:verify", {
      address: token,
      constructorArguments: [deployer],
    });
    console.log("Token verified");
  } catch (e: any) {
  console.log("Token verify error:", e.message);
}
  try {
    await run("verify:verify", {
      address: treasury,
      constructorArguments: [token, 100, deployer],
    });
    console.log("Treasury verified");
  } catch (e: any) {
  console.log("Token verify error:", e.message);
}});
