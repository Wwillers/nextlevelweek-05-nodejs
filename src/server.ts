import express from 'express';
import { createConnection } from 'typeorm';
import { routes } from './routes';

const app = express();
const connection = createConnection();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server is running on Port 3333'));
