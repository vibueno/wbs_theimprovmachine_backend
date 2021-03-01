import * as express from 'express';
const router = express.Router();
import suggestionsController from '../controllers/Suggestions';

// If the requested page has not been found
router.get('/', suggestionsController.get);

export default router;
