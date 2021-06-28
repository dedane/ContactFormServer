const router = require("express").Router();
const userController = require("./controller");

router.post("/", userController.contacts);

module.exports = router;