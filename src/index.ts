// Dotenv set-up
import * as dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;

// Own imports
import { msgServerStarted } from './vars/messages';
import app from './app';

// Server start
app.listen(PORT, () => console.log(msgServerStarted));
