import express from "express";
import {
  updateProfile,
  getUserProfile,
} from "../controllers/profile.controller.js";
import { protectRout } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRout, getUserProfile);
router.put("/", protectRout, updateProfile);

export default router;
