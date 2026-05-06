import { TaskLog } from '../types/index.js';

let data = [{ id: '1', memo: '買い物に行く!', status: 'pending' }] satisfies TaskLog[];

const getAllTodos = (): TaskLog[] => {
    return data;
};

const createTodo = (memo: TaskLog['memo']): TaskLog => {
    const newData = { id: Date.now().toString(), memo, status: 'pending' as const };

    data = [...data, newData];

    return newData;
};

const deleteTodo = (id: TaskLog['id']) => {
    data = data.filter((item) => item.id !== id);
};

const TodoService = {
    getAllTodos,
    createTodo,
    deleteTodo,
};

export default TodoService;
