import * as express from 'express';
const router = express.Router();
import suggestionCategoriesController from '../controllers/SuggestionCategories';

// If the requested page has not been found
router.get('/', suggestionCategoriesController.get);

export default router;
