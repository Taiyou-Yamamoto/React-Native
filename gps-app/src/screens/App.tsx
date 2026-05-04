import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { registerRootComponent } from 'expo';

export default function App() {
    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [loading, setLoading] = useState(false); // 読み込み中の状態

    const getLocation = async () => {
        setLoading(true);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('位置情報が必要です', '現在地を取得するには、端末の設定から位置情報の利用を許可してください。', [
                    {
                        text: 'キャンセル',
                        style: 'cancel',
                    },
                    {
                        text: '設定を開く',
                        onPress: () => Linking.openSettings(),
                    },
                ]);
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setLocation(currentLocation.coords);
        } catch (error) {
            console.error(error);
            Alert.alert('エラー', '位置情報の取得中に問題が発生しました。再度お試しください。');
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={getLocation} disabled={loading}>
                <Text style={styles.text}>{loading ? '取得中...' : '現在地を取得'}</Text>
            </TouchableOpacity>

            {location && (
                <View style={styles.resultContainer}>
                    <Text style={styles.result}>緯度: {location.latitude.toFixed(5)}</Text>
                    <Text style={styles.result}>経度: {location.longitude.toFixed(5)}</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                    setLocation(null);
                }}
                disabled={loading}
            >
                <Text style={styles.text}>リセット</Text>
            </TouchableOpacity>
        </View>
    );
}

registerRootComponent(App);

const styles = StyleSheet.create({
    container: { flex: 1, gap: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, width: 200, alignItems: 'center' },
    resetButton: { backgroundColor: '#EF4444', padding: 15, borderRadius: 8, width: 200, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#A0AEC0' },
    text: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    resultContainer: { marginTop: 24, alignItems: 'center', backgroundColor: '#F7FAFC', padding: 16, borderRadius: 8 },
    result: { fontSize: 18, fontWeight: '500', color: '#2D3748', marginVertical: 4 },
});
