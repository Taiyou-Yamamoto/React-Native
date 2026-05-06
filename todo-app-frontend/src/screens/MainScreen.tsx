import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskItem } from '../components/TaskItem';
import { TaskLog } from '../types';
import { BASE_URL } from '../config/api';
import { todoService } from '../api/todoService';

export const MainScreen = () => {
    const [memo, setMemo] = useState('');
    const [logs, setLogs] = useState<TaskLog[]>([]);
    const [loading, setLoading] = useState(false);

    const addTask = async (text: string) => {
        if (!text.trim()) return false;

        setLoading(true);
        try {
            const newTask = await todoService.create(text);

            setLogs([newTask, ...logs]);
            return true;
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
            await todoService.updateStatus(taskId, 'done');

            setLogs(logs.map((log) => (log.id === taskId ? { ...log, status: 'done' } : log)));
        } catch (error) {
            console.error(error);
            Alert.alert('エラー', '更新に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId: string) => {
        Alert.alert('確認', 'このタスクを削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            {
                text: '削除',
                style: 'destructive',
                onPress: async () => {
                    setLoading(true);
                    try {
                        await todoService.delete(taskId);

                        setLogs(logs.filter((log) => log.id !== taskId));
                    } catch (error) {
                        console.error(error);
                        Alert.alert('エラー', '削除に失敗しました');
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    const handleAdd = async () => {
        const success = await addTask(memo);
        if (success) {
            setMemo('');
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                console.log(BASE_URL);
                const response = await fetch(`${BASE_URL}/todos`);
                const data: TaskLog[] = await response.json();

                setLogs(data);
            } catch (error) {
                console.error('取得失敗:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>🏠 おこもり開発ロガー</Text>

            <View style={styles.inputArea}>
                <TextInput style={styles.input} placeholder='今からやるタスクを入力' value={memo} onChangeText={setMemo} editable={!loading} />
                <TouchableOpacity style={[styles.addButton, loading && styles.addButtonDisabled]} onPress={handleAdd} disabled={loading}>
                    <Text style={styles.addButtonText}>{loading ? '追加中...' : '追加'}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={logs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TaskItem item={item} onComplete={completeTask} onDelete={deleteTask} />}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginVertical: 15 },
    inputArea: { flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#E5E7EB' },
    input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', fontSize: 16 },
    addButton: { backgroundColor: '#3B82F6', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 8, marginLeft: 10 },
    addButtonDisabled: { backgroundColor: '#9CA3AF' },
    addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    listContainer: { padding: 15, gap: 10 },
});
