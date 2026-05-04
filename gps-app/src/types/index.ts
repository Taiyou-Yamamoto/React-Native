// 💡 データの形（型）を定義しておきます
export type TaskLog = {
    id: string;
    memo: string;
    status: 'pending' | 'done';
};
