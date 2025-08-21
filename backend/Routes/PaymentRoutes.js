import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { paymentController } from "../controllers/paymentController.js";
import { authMiddleware } from "./../Middlewares/authMiddleware.js";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, paymentController);
export default router;
