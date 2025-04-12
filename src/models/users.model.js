import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    profilePic: {
      type: String, //comes from the image uploaded on cloudinary
      default: "",
    },
    resetToken: {
      type: String,
    },
    tokenExpiration: {
      type: Date,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
