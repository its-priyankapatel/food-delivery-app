import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { typeaheadController } from "../controllers/searchController.js";

const router = express.Router();
router.get("/typeahead", authMiddleware, typeaheadController);
export default router;
