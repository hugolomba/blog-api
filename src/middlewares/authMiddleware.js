import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // the user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}