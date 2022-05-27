import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';

import createConnection from '@shared/infra/typeorm';

import handleError from './middleware/handleError';
import router from './routes';

const PORT = 3333;

createConnection();
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on port ${PORT}`);
});
