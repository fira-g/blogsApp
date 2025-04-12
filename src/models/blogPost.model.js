import mongoose from "mongoose";
import User from "./users.model.js";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      minlength: 20,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    category: {
      type: String,
      default: "Other",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", blogPostSchema);

export default Post;
