import express from "express";
import {
  createBlog,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/blog.controller.js";
import { protectRout } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", protectRout, createBlog);
router.get("/", protectRout, getAllPosts);
router.put("/:id", protectRout, updatePost);
router.delete("/:id", protectRout, deletePost);

export default router;
