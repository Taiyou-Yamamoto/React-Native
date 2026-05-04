import { Request, Response } from 'express';
import { getAllTodos } from '../services/todoService.js';

export const getTodos = (_: Request, res: Response) => {
    res.status(200).json(getAllTodos());
};
