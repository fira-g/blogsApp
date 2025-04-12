import mongoose from "mongoose";
import User from "./users.model.js";
import Post from "./blogPost.model.js";

const commentSchema = new mongoose.Schema(
  {
    commentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    fatherPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Post,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
