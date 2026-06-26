import express from 'express';
import { getMyPortfolio } from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/portfolio
router.get('/', protect, getMyPortfolio);

export default router;
