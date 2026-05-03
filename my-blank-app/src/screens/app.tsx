import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import LoginScreen from './LoginScreen';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../navigation/AppNavigator';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <SafeAreaProvider>
            <AppNavigator />
        </SafeAreaProvider>
    );
}

// exportを忘れるとホットリロードができないので注意
export default App;

registerRootComponent(App);
