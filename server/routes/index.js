const router = require("express").Router();

router.use("/user", require("./user-route"));
router.use("/chat", require("./chat-route"));

module.exports = router;
