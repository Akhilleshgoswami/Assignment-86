const blockchainController = require("../controller/blockchain.controller")
const router = (app) => {
 app.get("/api/v1/balance", blockchainController.getUserTokenBalance)
 app.get("/api/v1/transaction/history", blockchainController.getTransactionHistory)
 app.get("/mba/api/v1/deposit", blockchainController.deposit)
}

module.exports = router
