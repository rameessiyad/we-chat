const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user-controller");
const { protect } = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", protect, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
