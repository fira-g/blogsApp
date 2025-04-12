import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/generateToken.js";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config();
const googleAuthConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback",
  passReqToCallback: true,
};
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ message: "Email already exists try to signup." });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully!", userID: newUser._id });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in signup controller", error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }
    //validate the password with the hashed one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    generateToken(user._id, res);
    res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in login controller", error.message);
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to logout." });
    }
  });
  res.clearCookie("connect.sid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in logout controller", error.message);
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkout controller", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const passwordResetRequest = async (req, res) => {
  const user = req.user;
  try {
    const resetToken = crypto.randomBytes(10).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);
    user.resetToken = hashedToken;
    user.tokenExpiration = Date.now() + 10 * 60 * 1000;
    await user.save();

    //send the link
    try {
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/reset-password/${resetToken}`;
      const resetMessage = {
        email: user.email,
        message: `Here is a link to reset Your password. If You did'nt request for a password reset simply ignore this message\n\n${resetURL}\n\nThe link expires in 10 minutes.`,
        subject: "reset your password",
      };
      await sendEmail(resetMessage);
      res.status(200).json({
        status: "success",
        message: "Password reset email sent successfully.",
      });
    } catch (error) {
      user.resetToken = null;
      user.tokenExpiration = null;
      await user.save();
      console.log("error sending password reset email", error.message);
      return res.json({ message: "failed to send password reset link." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in passwordResetRequest controller", error.message);
  }
};

export const resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const user = req.user;
  const { newPassword } = req.body;
  try {
    console.log(resetToken);
    if (!user.resetToken) {
      return res.status(404).json({ message: "request doesnt found" });
    }
    const isTokenValid = await bcrypt.compare(resetToken, user.resetToken);
    if (!isTokenValid) {
      return res
        .status(400)
        .json({ message: "Unauthorized - invalid token used." });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Unauthorized - Token expired." });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    //clear the resetToken
    user.tokenExpiration = null;
    user.resetToken = null;
    await user.save();
    res.json({ message: "password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in resetPassword controller", error.message, error);
  }
};

// GOOGLE AUTH
const googleVerifyCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(
        new Error("Google profile does not contain an email address."),
        null
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      fullName: profile.displayName,
      email: profile.emails?.[0]?.value,
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return done(error, null);
  }
};

passport.use(new GoogleStrategy(googleAuthConfig, googleVerifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

export const initializeGoogleAuth = () => {};
