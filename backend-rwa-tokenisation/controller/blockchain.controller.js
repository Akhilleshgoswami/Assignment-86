const blockchainService = require("../service/blockchain.service")
const { STATUS } = require("../utils/constants")
const { errorResponseBody, successResponseBody } = require("../utils/requestResponeBody")

const getTransactionHistory = async (req, res) => {
 try {
  const result = await blockchainService.transactionHistory()
  successResponseBody.data = result
  successResponseBody.message = "transaction history fetch successFully"
  res.status(STATUS.OK).json(successResponseBody)
 }
 catch (error) {
   errorResponseBody.error = error.message || error;
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json()
 }

}
const getUserTokenBalance = async (req, res) => {
 try {
  const result = await blockchainService.getUserTokenBalance(req.query);
  successResponseBody.data = result;
  successResponseBody.message = "balance fetched successfully";

  return res.status(STATUS.OK).json(successResponseBody);
 } catch (error) {
  errorResponseBody.error = error.message || error;
  return res
   .status(STATUS.INTERNAL_SERVER_ERROR)
   .json(errorResponseBody);
 }
};
const deposit = async (req, res) => {
 try {
  const result = await blockchainService.depositToTreasury(req.body);
  successResponseBody.data = result;
  successResponseBody.message = "deposit successfully";

  return res.status(STATUS.OK).json(successResponseBody);
 } catch (error) {
  errorResponseBody.error = error.message || error;
  return res
   .status(STATUS.INTERNAL_SERVER_ERROR)
   .json(errorResponseBody);
 }
};
module.exports = {
 getTransactionHistory, getUserTokenBalance,deposit
}
