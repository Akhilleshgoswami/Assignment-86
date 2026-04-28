````md
# RWA Tokenisation Flow

A minimal implementation of a Real World Asset (RWA) tokenisation system.

Includes:
- ERC20 token for fractional ownership
- Treasury contract for deposits and minting
- Backend APIs (Node.js + TypeScript)
- Test coverage using Hardhat

---

##  Deployed Contracts (Sepolia)

- RWAToken: https://sepolia.etherscan.io/address/0xc313D1390c92Aa106c8cbdf462a993893F469f2B  
- Treasury: https://sepolia.etherscan.io/address/0x1944F77475988F5fb864706361E4f127765c07DC  

---

## Architecture

User → Treasury (deposit ETH) → RWAToken (mint tokens)  
Backend reads contract state and exposes APIs

---

## Smart Contracts

### RWAToken
- ERC20 (OpenZeppelin)
- Uses `AccessControl`
- Treasury assigned `MINTER_ROLE`

### Treasury
- Accepts ETH deposits
- Mints tokens based on fixed rate
- Admin-only withdrawals
- Pause / unpause support
- Reentrancy protection

---

##  Roles

- `DEFAULT_ADMIN_ROLE` → Deployer  
- `MINTER_ROLE` → Treasury contract  

---

## ⚙️ Tech Stack

- Solidity `0.8.28`
- Hardhat
- OpenZeppelin
- Node.js + TypeScript
- Ethers v6

---

## 🚀 Setup

**Node Version:** 22+

```bash
git clone <repo-url>
cd rwa-tokenisation
yarn install
````

---

## Scripts

Compile contracts:

```bash
yarn build
```

Run tests:

```bash
yarn test
```

Run coverage:

```bash
yarn coverage
```

---

##Test Coverage

Covers:

* Deposit flow
* Withdrawal flow
* Access control
* Edge cases (zero deposit, unauthorized access)
* Pause/unpause
* Rate updates

---

##  Backend

Start server:

```bash
cd backend
yarn install
yarn start
```

Server:

```
http://localhost:3000
```

---

## Environment Variables

Create `.env`:

```env
PORT=3000
PRIVATE_KEY=0x...
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<KEY>
POLYGONSCAN_API_KEY=<KEY>

```
## start server 

```bash 
yarn start 
```

---

## API Endpoints

### Get Token Balance

```bash
curl --location "http://localhost:3000/api/v1/balance?userAddress=0x1057aA6f8Ca2e9eeBFAe49E9Af2fd6EC86e960ab&chainId=11155111&tokenAddress=0xf08a50178dfcde18524640ea6618a1f965821715"
```

### Get Transaction History

```bash
curl --location "http://localhost:3000/api/v1/transaction/history"
```

---

## Network Config

```ts
const RPC_URL = {
  11155111: process.env.SEPOLIA_RPC_URL,
};
```

---

## Deployment

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

