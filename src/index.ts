// Dotenv set-up
import * as dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

import app from './app';

// Own imports
import { msgServerStarted } from './vars/messages';

// Server start
app.listen(PORT, () => console.log(msgServerStarted));
