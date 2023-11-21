import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;
const tokenTime = process.env.TOKEN_TIME;

export const generateToken = (user) => {
  const tokenPayload = {
    userId: user.id,
    // Include either email, username, or phoneNumber based on availability
    ...(user.email && { email: user.email }),
    ...(user.username && { username: user.username }),
    ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
  };

  const token = jwt.sign(
    tokenPayload,
    tokenSecretKey, // Replace with a strong secret key
    { expiresIn: tokenTime } // Token expires in 2 hours
  );

  return token;
};

export const requireToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: "failed",
      error: "Unauthorized",
      message: "Token is missing",
    });
  }

  jwt.verify(token, tokenSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "failed",
        error: "Unauthorized",
        message: "Invalid token",
      });
    }

    req.user = decoded;
    next();
  });
};
