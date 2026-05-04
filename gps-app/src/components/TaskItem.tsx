import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TaskLog } from '../types';

// 💡 親画面から受け取るデータの型
type Props = {
    item: TaskLog;
    onComplete: (id: string) => void;
};

export const TaskItem = ({ item, onComplete }: Props) => {
    return (
        <View style={styles.logItem}>
            <View style={styles.logTextContainer}>
                <Text style={[styles.statusBadge, item.status === 'done' && styles.statusDone]}>{item.status === 'done' ? '完了' : '作業中'}</Text>
                <Text style={[styles.logMemo, item.status === 'done' && styles.logMemoDone]}>{item.memo}</Text>
            </View>

            {item.status === 'pending' && (
                <TouchableOpacity style={styles.completeButton} onPress={() => onComplete(item.id)}>
                    <Text style={styles.completeButtonText}>完了にする</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    logItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    logTextContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    statusBadge: {
        backgroundColor: '#FEF3C7',
        color: '#D97706',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 12,
        overflow: 'hidden',
        fontWeight: 'bold',
    },
    statusDone: { backgroundColor: '#D1FAE5', color: '#059669' },
    logMemo: { fontSize: 16, color: '#374151', flexShrink: 1 },
    logMemoDone: { color: '#9CA3AF', textDecorationLine: 'line-through' },
    completeButton: { backgroundColor: '#10B981', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
    completeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
});
