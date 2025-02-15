const router = require("express").Router();
const { sendMessage } = require("../controllers/message-controller");
const { protect } = require("../middleware/auth-middleware");

router.post("/", protect, sendMessage);

module.exports = router;
