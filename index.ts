import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dotenv set-up
import * as dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

// Own imports
// const db = require('./utils/db');
import { msgServerStarted, msgPageNotFound } from './vars/messages.js';

// Start express
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Routes
import appRoutes from './routes/App.js';

app.use('*', appRoutes);

// Server start
app.listen(PORT, () => console.log(msgServerStarted));
