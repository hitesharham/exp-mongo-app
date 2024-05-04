import express from "express";
import auth from "./auth.routes";
import userRouter from "./user.routes";
import { welcomeMessage } from "../controllers/welcome.controller";
import postRouter from "./post.routers";
const router = express.Router();

router.get("/", welcomeMessage);
router.use("/auth", auth);
router.use("/user", userRouter);
router.use("/post", postRouter);


export default router;
