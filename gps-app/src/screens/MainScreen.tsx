import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from '../components/TaskItem';

export const MainScreen = () => {
    const [memo, setMemo] = useState('');

    const { logs, loading, addTask, completeTask } = useTasks();

    const handleAdd = async () => {
        const success = await addTask(memo);
        if (success) {
            setMemo('');
        }
    };

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
                renderItem={({ item }) => <TaskItem item={item} onComplete={completeTask} />}
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
