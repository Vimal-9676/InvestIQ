import express from 'express';
import { uploadDocument, uploadMiddleware } from '../controllers/docController.js';

const router = express.Router();

router.post('/upload', uploadMiddleware, uploadDocument);

export default router;
