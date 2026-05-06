import { Request, Response } from 'express';
import TodoService from '../services/todoService.js';

const getAllTodos = (_: Request, res: Response) => {
    res.status(200).json(TodoService.getAllTodos());
};

const createTodo = (req: Request, res: Response) => {
    TodoService.createTodo(req.body.memo);
    res.status(201).json({ message: 'created successfully' });
};

const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id === 'string') {
        TodoService.deleteTodo(id);
        return res.status(200).json({ message: 'Deleted successfully' });
    }
    res.status(400).json({ message: 'invalid id' });
};

const TodoController = {
    getAllTodos,
    createTodo,
    deleteTodo,
};

export default TodoController;
