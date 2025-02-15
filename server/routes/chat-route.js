const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addtoGroup,
  removeFromGroup,
} = require("../controllers/chat-controller");
const { protect } = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", protect, fetchChats);
router.post("/", protect, accessChat);
router.post("/group", protect, createGroupChat);
router.patch("/rename", protect, renameGroup);
router.patch("/groupadd", protect, addtoGroup);
router.patch("/groupremove", protect, removeFromGroup);

module.exports = router;
