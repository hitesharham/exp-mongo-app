import { Router } from "express";
import {
  logIn,
  logOut,
  signUp,
} from "../controllers/authController/auth-controller";
import authMiddleware from "../middleware/jwt-middleware";

const auth = Router();

auth.post("/signup", signUp);
auth.post("/signin", logIn);
auth.post("/signout", authMiddleware, logOut);

export default auth;
