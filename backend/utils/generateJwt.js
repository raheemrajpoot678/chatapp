import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = function (userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development", // Only send cookie over HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: "strict", // Only send cookie to same site (not cross-site)
  });
  return token;
};
