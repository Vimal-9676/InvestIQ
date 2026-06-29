import express from "express";
import { chatWithAI, getChatHistory, getChatSession, analyzeEarningsCall, getBullBear } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadMiddleware } from "../controllers/docController.js";

const router = express.Router();

router.post("/chat", protect, chatWithAI);
router.get("/history", protect, getChatHistory);
router.get("/history/:id", protect, getChatSession);
router.post("/analyze-earnings", protect, uploadMiddleware, analyzeEarningsCall);
router.post("/bull-bear", protect, getBullBear);

export default router;