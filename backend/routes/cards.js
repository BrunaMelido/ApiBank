const router = require("express").Router()

const cardController = require("../controllers/CardController")

router
    .route("/cards")
    .post((req, res) => cardController.create(req, res))

router
    .route("/cards")
    .get((req, res) => cardController.getAll(req, res))

router
    .route("/cards/search")
    .get((req, res) => cardController.get(req, res));

router
    .route("/cards/state")
    .put((req, res) => cardController.changeState(req, res))

module.exports = router