const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
} = require("../controllers/chat-controller");
const { protect } = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", protect, fetchChats);
router.post("/", protect, accessChat);
router.post("/group", protect, createGroupChat);
router.patch("/rename", protect, renameGroup);

module.exports = router;
