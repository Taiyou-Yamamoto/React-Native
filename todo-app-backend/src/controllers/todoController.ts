import { Request, Response } from 'express';
import TodoService from '../services/todoService.js';

const getAllTodos = async (_: Request, res: Response) => {
    const todos = await TodoService.getAllTodos();
    res.status(200).json(todos);
};

const createTodo = async (req: Request, res: Response) => {
    await TodoService.createTodo(req.body.memo);
    res.status(201).json({ message: 'created successfully' });
};

const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'invalid id' });
    }
    await TodoService.deleteTodo(id);
    res.status(200).json({ message: 'Deleted successfully' });
};

const TodoController = {
    getAllTodos,
    createTodo,
    deleteTodo,
};

export default TodoController;
