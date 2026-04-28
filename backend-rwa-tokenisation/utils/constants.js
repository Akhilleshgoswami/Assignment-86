MOCK_TRANSACTIONS = [
 {
  id: "1",
  address: "0x123...",
  type: "deposit",
  amount: 100,
  token: "RWA",
  txHash: "0xabc123",
  status: "success",
  timestamp: Date.now() - 100000,
 },
 {
  id: "2",
  address: "0x123...",
  type: "withdraw",
  amount: 50,
  token: "RWA",
  txHash: "0xdef456",
  status: "success",
  timestamp: Date.now() - 50000,
 },
];
const STATUS_CODES = {
 OK: 200,
 INTERNAL_SERVER_ERROR: 500,
 BAD_REQUEST: 400,
 NOT_FOUND: 404,
 CREATED: 201,
 UNAUTHORISED: 401
}
const ERC20_ABI = [
 "function balanceOf(address owner) view returns (uint256)",
 "function decimals() view returns (uint8)"
];
const RPC_URL = {
 1: "https://rpc.ankr.com/eth",
 137: "https://rpc.ankr.com/polygon",
 11155111: "https://sepolia.infura.io/v3/c0852655a8f54fb6ba3556191dd12ba6",
};
const TREASURY_ABI = [
    "function deposit() payable"
  ];

module.exports = {
 STATUS : STATUS_CODES, MOCK_TRANSACTIONS, ERC20_ABI, RPC_URL,TREASURY_ABI
}
