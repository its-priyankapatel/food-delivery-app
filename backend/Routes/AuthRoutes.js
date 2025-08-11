import express from "express";
import {
  getUserByIdController,
  getUserController,
  Login,
  SignUp,
} from "../controllers/authController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();
router.post("/sign-up", SignUp);
router.post("/login", Login);
router.get("/get-user", authMiddleware, getUserController);
router.get("/retrive-user/:id", authMiddleware, getUserByIdController);

export default router;
