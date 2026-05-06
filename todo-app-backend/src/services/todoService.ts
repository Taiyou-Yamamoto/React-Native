import { FieldValue } from 'firebase-admin/firestore';
import db from '../config/firebase.js';
import { TaskLog } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';

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

const createTodo = async (memo: string): Promise<TaskLog> => {
    const docRef = await db.collection('todos').add({
        memo,
        status: 'pending',
        createdAt: FieldValue.serverTimestamp(),
    });

    return {
        id: docRef.id,
        memo,
        status: 'pending',
    } as TaskLog;
};

const updateStatus = async (id: string, status: 'pending' | 'done'): Promise<void> => {
    const docRef = db.collection('todos').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        throw new ApiError(404, '指定されたタスクが見つかりません');
    }

    await docRef.update({ status });
};

const deleteTodo = async (id: TaskLog['id']): Promise<void> => {
    await db.collection('todos').doc(id).delete();
};

const TodoService = {
    getAllTodos,
    createTodo,
    updateStatus,
    deleteTodo,
};

export default TodoService;
