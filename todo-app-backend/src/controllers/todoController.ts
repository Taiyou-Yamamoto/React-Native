import { Request, Response } from 'express';
import TodoService from '../services/todoService.js';

const getAllTodos = async (_: Request, res: Response) => {
    const todos = await TodoService.getAllTodos();
    res.status(200).json(todos);
};

const createTodo = async (req: Request, res: Response) => {
    try {
        const newTask = await TodoService.createTodo(req.body.memo);

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== 'done' && status !== 'pending') {
        return res.status(400).json({ error: '無効なステータスです' });
    }
    if (typeof id === 'string') {
        await TodoService.updateStatus(id, status);
        res.status(200).json({ message: 'Updated successfully' });
    }
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
    updateStatus,
    deleteTodo,
};

export default TodoController;
