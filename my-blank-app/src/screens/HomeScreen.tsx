import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation, onPressLogout }: any) {
    // ダミーのデータ配列
    const dummyItems = [
        { id: '101', name: '商品A', price: '¥1,200' },
        { id: '102', name: '商品B', price: '¥3,400' },
        { id: '103', name: '商品C', price: '¥5,600' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>🏠 ホーム</Text>
                <Text style={styles.sectionTitle}>新着アイテム一覧</Text>

                {dummyItems.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('Detail')}>
                        <View>
                            <Text style={styles.cardName}>{item.name}</Text>
                            <Text style={styles.cardPrice}>{item.price}</Text>
                        </View>
                        <Text style={styles.arrow}>➔</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
                    <Text style={styles.logoutButtonText}>ログアウト</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4B5563',
        marginBottom: 12,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
    },
    cardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    cardPrice: {
        fontSize: 14,
        color: '#2563EB',
        marginTop: 4,
    },
    arrow: {
        fontSize: 18,
        color: '#9CA3AF',
    },
    logoutButton: {
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EF4444',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
    },
});
