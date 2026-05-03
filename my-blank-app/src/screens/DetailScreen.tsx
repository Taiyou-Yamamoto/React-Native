import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailScreen({ route, navigation, onPressLogout }: any) {
    // パラメータが渡されなかった時のためのデフォルト値
    const { id, name } = route?.params || { id: 'N/A', name: '未選択のアイテム' };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.infoBox}>
                    <Text style={styles.tag}>ID: {id}</Text>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.description}>
                        アイテムの詳しい情報がここに表示されます。 React Navigation を使うと、前の画面から渡されたデータを route.params
                        経由で取得することができます。
                    </Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
                    <Text style={styles.logoutButtonText}>ログアウト</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>一覧に戻る</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 24,
    },
    infoBox: {
        marginTop: 20,
    },
    tag: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2563EB',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 24,
    },
    // 💡 ログアウトボタン用のスタイルを追加
    logoutButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12, // 下のボタンとの隙間を確保
    },
    logoutButtonText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        backgroundColor: '#1F2937', // 黒に近いボタン
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
