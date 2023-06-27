const router = require("express").Router()

const cardRouter = require("./cards")

router.use("/", cardRouter)

module.exports = router