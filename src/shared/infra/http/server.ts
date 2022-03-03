import express from 'express';
import cors from 'cors';
import routes from './routes';
import handleError from './middleware/handleError';

const app = express();

const PORT = 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
