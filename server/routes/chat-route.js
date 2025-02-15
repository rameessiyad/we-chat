const {
  accessChat,
  fetchChats,
  createGroupChat,
} = require("../controllers/chat-controller");
const { protect } = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", protect, fetchChats);
router.post("/", protect, accessChat);
router.post("/group", protect, createGroupChat);

module.exports = router;
