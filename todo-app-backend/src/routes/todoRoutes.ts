import express from 'express';
import TodoController from '../controllers/todoController.js';

const router = express.Router();

router.get('/', TodoController.getAllTodos);
router.post('/', TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);

export { router as todoRoutes };
