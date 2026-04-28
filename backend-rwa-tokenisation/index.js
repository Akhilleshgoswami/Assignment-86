const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const blockChainRouter = require("./routes/blockchain.route")
const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
blockChainRouter(app)
app.listen(process.env.PORT, async () => {
 console.log("app runing on the port ", process.env.PORT)

})
