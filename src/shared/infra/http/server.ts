import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import handleError from './middleware/handleError';
import createConnection from '@shared/infra/typeorm';

const PORT = 3333;

createConnection();
const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
