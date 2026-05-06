import { apiClient } from '../api/apiClient';
import { TaskLog } from '../types';

export const todoService = {
    getAll: (): Promise<TaskLog[]> => apiClient('/todos'),

    create: (memo: string): Promise<TaskLog> =>
        apiClient('/todos', {
            method: 'POST',
            body: JSON.stringify({ memo, status: 'pending' }),
        }),

    updateStatus: (id: string, status: 'pending' | 'done') =>
        apiClient(`/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),

    delete: (id: string) =>
        apiClient(`/todos/${id}`, {
            method: 'DELETE',
        }),
};
