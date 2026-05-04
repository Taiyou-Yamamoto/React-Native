import { TaskLog } from '../types/index.js';

export const getAllTodos = (): TaskLog[] => {
    return [{ id: '1', memo: '買い物に行く!', status: 'pending' }];
};
