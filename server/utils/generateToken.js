import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' allows cross-site cookies
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  
  return res.status(200).json({
    success: true,
    message,
    user
  });
};
