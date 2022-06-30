import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';

import createConnection from '@shared/infra/typeorm';

import handleError from './middleware/handleError';
import { router } from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleError);

export { app };
