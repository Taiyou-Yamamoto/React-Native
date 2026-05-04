import express from 'express';
import { todoRoutes } from './routes/todoRoutes.js';

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/health', (_, res) => {
    res.status(200).send({ status: 'OK' });
});

export { app };
