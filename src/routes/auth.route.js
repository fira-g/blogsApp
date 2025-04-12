import express from "express";
import {
  checkAuth,
  login,
  logout,
  passwordResetRequest,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";
import { requestingUser } from "../middleware/passwordReset.middleware.js";
import { protectRout } from "../middleware/auth.middleware.js";
import passport from "passport";
import { generateToken } from "../services/generateToken.js";
const router = express.Router();
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/check-auth", protectRout, checkAuth);
router.post("/reset-password/request", requestingUser, passwordResetRequest);
router.patch("/reset-password/:token", requestingUser, resetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "callback/failure",
  }),
  (req, res) => {
    generateToken(req.user._id, res);
    res.redirect("callback/success");
  }
);
router.get("/google/callback/failure", (req, res) => {
  res.send("Couldnt login with google");
});
router.get("/google/callback/success", (req, res) => {
  res.send("logged in with google");
});
export default router;
