import Post from "../models/blogPost.model.js";
import Comment from "../models/comments.model.js";

export const createBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const authorId = req.user._id;
  try {
    if (!title || !content || !category) {
      return res.status(400).json({ message: "all fields are required." });
    }
    const newPost = new Post({
      title,
      content,
      category,
      authorId,
    });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.log("Error in createBlog controller!! ", error);
    res
      .status(500)
      .json({ message: "Internal server error. ", Error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allBlogs = await Post.find({});
    res.status(200).send(allBlogs);
  } catch (error) {
    console.log("Error in getAllPosts controller!! ", error);
    res
      .status(500)
      .json({ message: "Internal server error. ", Error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Fields must be provided." });
    }
    const post = await Post.findById(postId);
    if (!post.authorId.equals(req.user._id)) {
      return res
        .status(400)
        .json({ message: "Unauthorized - U can't update other's post!" });
    }
    const newPost = await Post.findByIdAndUpdate(postId, req.body);
    res
      .status(200)
      .json({ message: "Post updated successfuly!", new_Post: newPost });
  } catch (error) {
    console.log("Error in updatePost controller!! ", error);
    res
      .status(500)
      .json({ message: "Internal server error. ", Error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  try {
    const post = await Post.findById(postId);
    if (!post.authorId.equals(req.user._id)) {
      return res
        .status(400)
        .json({ message: "Unauthorized - U can't delete other's post!" });
    }
    //delete the comments related to the post
    await Comment.deleteMany({ fatherPost: postId });

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.log("Error in deletePost controller!! ", error);
    res
      .status(500)
      .json({ message: "Internal server error. ", Error: error.message });
  }
};
