import express from 'express';
const router = express.Router();
import appController from '../controllers/App.js';

// If the requested page has not been found
router.get('/', appController.pageNotFound);

export default router;
