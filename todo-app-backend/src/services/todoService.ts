import { FieldValue } from 'firebase-admin/firestore';
import db from '../config/firebase.js';
import { TaskLog } from '../types/index.js';

const getAllTodos = async (): Promise<TaskLog[]> => {
    const snapshot = await db.collection('todos').orderBy('createdAt', 'asc').get();

    const todos = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        } as TaskLog;
    });

    return todos;
};

const createTodo = async (memo: string): Promise<void> => {
    await db.collection('todos').add({
        memo,
        status: 'pending',
        createdAt: FieldValue.serverTimestamp(),
    });
};

const deleteTodo = async (id: TaskLog['id']): Promise<void> => {
    await db.collection('todos').doc(id).delete();
};

const TodoService = {
    getAllTodos,
    createTodo,
    deleteTodo,
};

export default TodoService;
