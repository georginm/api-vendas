import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import upload from '@config/upload';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import { pagination } from 'typeorm-pagination';

import createConnection from '@shared/infra/typeorm';

import handleError from './middleware/handleError';
import { router } from './routes';

createConnection();

const app = express();

app.use(pagination);

app.use(cors());
app.use(express.json());

app.use(router);
app.use('/files', express.static(upload.directory));

app.use(errors());
app.use(handleError);

export { app };
