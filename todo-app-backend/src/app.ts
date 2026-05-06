import express from 'express';
import { todoRoutes } from './routes/todoRoutes.js';
import { ApiError } from './utils/ApiError.js';

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/health', (_, res) => {
    res.status(200).send({ status: 'OK' });
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error('[ERROR LOG]:', err.stack);

    const status = err instanceof ApiError ? err.status : 500;

    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
});

export { app };
