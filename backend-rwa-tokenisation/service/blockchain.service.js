const { MOCK_TRANSACTIONS, ERC20_ABI, RPC_URL } = require("../utils/constants")
const ethers = require("ethers")
const transactionHistory = async () => {
 return MOCK_TRANSACTIONS
}
const getUserTokenBalance = async (data) => {
 const { userAddress, tokenAddress, chainId } = data
 const provider = new ethers.JsonRpcProvider(RPC_URL[chainId]);
 try {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  const [balance, decimals] = await Promise.all([
   contract.balanceOf(userAddress),
   contract.decimals(),
  ]);

  const formatted = ethers.formatUnits(balance, decimals);

  return formatted

 } catch (err) {
  console.log(err)
  throw new Error("Failed to fetch token balance");
 }
}
const depositToTreasury = async (data) => {
 const { amount, chainId, treasuryAddress } = data;

 const provider = new ethers.JsonRpcProvider(RPC_URL[chainId]);
 const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


 try {
  const contract = new ethers.Contract(
   treasuryAddress,
   TREASURY_ABI,
   wallet
  );
  const tx = await contract.deposit({
   value: ethers.parseEther(amount),
  });

  const receipt = await tx.wait();

  return {
   txHash: receipt.hash,
   status: receipt.status,
  };

 } catch (err) {
  console.log(err);
  throw new Error("Failed to deposit to treasury");
 }
};

module.exports = {
 transactionHistory, getUserTokenBalance, depositToTreasury
}
