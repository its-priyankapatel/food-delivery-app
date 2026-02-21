import express from "express";
import { typeaheadController } from "../controllers/searchController.js";
import { userAuthMiddleware } from "../Middlewares/userAuthMiddleware.js";

const router = express.Router();
router.get("/typeahead", userAuthMiddleware, typeaheadController);
export default router;
