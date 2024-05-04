import { Router } from "express";
import authMiddleware from "../middleware/jwt-middleware";
import {
  deleteUser,
  getUserById,
  updateUser,
  userList,
} from "../controllers/userController/user.controller";

const userRouter = Router();

userRouter.use(authMiddleware); // added auth guard middleware for all routes
userRouter.get("", userList);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);

export default userRouter;
