import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getCurrentUser,
  editUserDetails,
  changePassword,
  updateProfileImage,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.get("/details", verifyJWT, getCurrentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.put("/edit-details", verifyJWT, editUserDetails);
router.post("/change-password", verifyJWT, changePassword);
router.put(
  "/update-profle-image",
  verifyJWT,
  upload("users").single("image"),
  updateProfileImage
);

export default router;
