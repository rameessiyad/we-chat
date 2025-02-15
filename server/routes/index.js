const router = require("express").Router();

router.use("/user", require("./user-route"));
router.use("/chat", require("./chat-route"));
router.use("/message", require("./message-route"));

module.exports = router;
