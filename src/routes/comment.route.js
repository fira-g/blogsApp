import express from "express";
import { protectRout } from "../middleware/auth.middleware.js";
import {
  getAllComments,
  getMyComments,
  deleteMyComment,
  createComment,
} from "../controllers/comment.controller.js";
const router = express.Router();
router.get("/:postId", protectRout, getAllComments);
router.post("/:postId", protectRout, createComment);
router.get("/mine/:postId", protectRout, getMyComments);
router.delete("/:commentId", protectRout, deleteMyComment);
export default router;
