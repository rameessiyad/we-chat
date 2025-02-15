const router = require("express").Router();
const {
  sendMessage,
  fetchAllMessages,
} = require("../controllers/message-controller");
const { protect } = require("../middleware/auth-middleware");

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, fetchAllMessages);

module.exports = router;
