import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ Routes
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/coursesRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Added fallback for safety

// ✅ Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://vercel-frontend-eight-liart.vercel.app/",
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" })); // ✅ Add limit for large JSON uploads
app.use(cookieParser());

// ✅ Base Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter); // ✅ changed from /api/create → /api/course (more RESTful)

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully.");
});

// ✅ Global Error Handling Middleware (Optional but recommended)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ Connect DB first, then start server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
