import * as express from 'express';
import * as cors from 'cors';

// Start express
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Routes
import appRoutes from './routes/App';
import suggestionsRoutes from './routes/Suggestions';

app.use('/suggestions', suggestionsRoutes);
app.use('*', appRoutes);

export default app;
