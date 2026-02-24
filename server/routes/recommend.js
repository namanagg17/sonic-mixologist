import express from 'express';
import { recommendController } from '../controllers/recommendController.js';

const router = express.Router();

// Get complete recommendation (song + drink)
router.get('/', recommendController.getRecommendation);

// Get multiple recommendations for comparison
router.post('/multiple', recommendController.getMultipleRecommendations);

// Get translation only (no cocktail)
router.get('/translation', recommendController.getTranslationOnly);

export default router;
