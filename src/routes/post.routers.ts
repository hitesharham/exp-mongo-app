import { Router } from "express";
import authMiddleware from "../middleware/jwt-middleware";
import { createPost } from "../controllers/postController/post.controller";
import multerMiddleware from "../middleware/multer-middleware";
const postRouter = Router();

postRouter.use(authMiddleware);

postRouter.post("", multerMiddleware.single("image"), createPost);

export default postRouter;
