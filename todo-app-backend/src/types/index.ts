export type TaskLog = {
    id: string;
    memo: string;
    status: 'pending' | 'done';
    createdAt: Date;
};
