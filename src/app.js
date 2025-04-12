import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializeGoogleAuth } from "./controllers/auth.controller.js";
import session from "express-session";
import blogRoutes from "./routes/blogs.route.js";
import profileRoutes from "./routes/profile.route.js";
import commentRoutes from "./routes/comment.route.js";
dotenv.config(); //to read the enviroment variables

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializeGoogleAuth();

app.use("/api/auth", authRoute);
app.use("/api/posts", blogRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/comment", commentRoutes);

app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
  connectDB();
});
