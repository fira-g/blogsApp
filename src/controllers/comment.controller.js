import Comment from "../models/comments.model.js";
export const getAllComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ fatherPost: postId });
    res.send(comments);
  } catch (error) {
    console.log("error in getAllComments controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({
      fatherPost: postId,
      commentorId: req.user._id,
    });
    res.status(200).json({
      message: `Here are your comments for the post with ID : ${postId}`,
      comments: comments,
    });
  } catch (error) {
    console.log("error in getMyComments controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const newComment = new Comment({
      fatherPost: postId,
      content,
      commentorId: req.user._id,
    });
    await newComment.save();
    res.status(201).json({ message: "commented successfully" });
  } catch (error) {}
};
export const deleteMyComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    console.log(comment.commentorId, req.user._id);
    if (!comment.commentorId.equals(req.user._id)) {
      return res.status(400).json({ message: "Unauthorized - no access" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.log("error in deleteMyComment controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
