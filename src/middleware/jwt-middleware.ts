import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
interface AuthenticatedRequest extends Request {
  user?: any;
}
const revokedTokens: Set<string> = new Set();
const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if token is in the blacklist
  if (revokedTokens.has(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      [key: string]: any;
    };

    // Attach decoded payload to request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};

export default authMiddleware;
