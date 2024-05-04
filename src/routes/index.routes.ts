import express from "express";
import auth from "./auth/auth.routes";
import { welcomeMessage } from "../controllers/welcome.controller";
const router = express.Router();

router.use("/auth", auth);
router.get("/", welcomeMessage)

export default router;
