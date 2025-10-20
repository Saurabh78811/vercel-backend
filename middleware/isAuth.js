import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "User is not authenticated. Token missing." });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({ message: "Invalid token. Authentication failed." });
    }

    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: `isAuth middleware error: ${error.message}` });
  }
};

export default isAuth;
