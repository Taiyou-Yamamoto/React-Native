import { useState } from 'react';
import { Alert } from 'react-native';
import { TaskLog } from '../types';
import { BASE_URL } from '../config/api';

export const useTasks = () => {
    const [logs, setLogs] = useState<TaskLog[]>([
        { id: '1', memo: 'Expressの基礎を学ぶ', status: 'pending' },
        { id: '2', memo: 'React NativeのUIを作る', status: 'done' },
    ]);
    const [loading, setLoading] = useState(false);

    const addTask = async (memo: string) => {
        if (!memo.trim()) {
            Alert.alert('エラー', 'タスクを入力してください');
            return false; // 失敗を画面に伝える
        }

        setLoading(true);
        try {
            console.log(`📡 [POST] ${BASE_URL} へ送信:`, { memo });
            const newTask: TaskLog = { id: Date.now().toString(), memo: memo, status: 'pending' };
            setLogs([newTask, ...logs]);
            return true; // 成功を画面に伝える
        } catch (error) {
            console.error(error);
            Alert.alert('エラー', '追加に失敗しました');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const completeTask = async (taskId: string) => {
        setLoading(true);
        try {
            console.log(`📡 [PATCH] ${BASE_URL}/${taskId} のステータスを更新`);
            setLogs(logs.map((log) => (log.id === taskId ? { ...log, status: 'done' } : log)));
        } catch (error) {
            console.error(error);
            Alert.alert('エラー', '更新に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return { logs, loading, addTask, completeTask };
};
