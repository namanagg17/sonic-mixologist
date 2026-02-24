import express from 'express';
import { songController } from '../controllers/songController.js';

const router = express.Router();

// Get audio features for a single song
router.get('/', songController.getSongFeatures);

// Get audio features for multiple songs (batch processing)
router.post('/batch', songController.getBatchSongFeatures);

export default router;
