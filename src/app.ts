import * as express from 'express';
import * as cors from 'cors';

// Start express
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

// Routes
import appRoutes from './routes/App';
import suggestionsRoutes from './routes/Suggestions';
import categoriesRoutes from './routes/Categories';

app.use('/suggestions', suggestionsRoutes);
app.use('/categories', categoriesRoutes);
app.use('*', appRoutes);

export default app;
