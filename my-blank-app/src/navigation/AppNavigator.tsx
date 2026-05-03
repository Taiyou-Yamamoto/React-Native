import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name='Home' options={{ title: 'ホーム' }}>
                            {(props) => (
                                <HomeScreen
                                    {...props}
                                    onPressLogout={() => {
                                        setIsLoggedIn(false);
                                    }}
                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen name='Detail' options={{ title: '詳細' }}>
                            {(props) => (
                                <DetailScreen
                                    {...props}
                                    onPressLogout={() => {
                                        setIsLoggedIn(false);
                                    }}
                                />
                            )}
                        </Stack.Screen>
                    </>
                ) : (
                    <Stack.Screen name='Login' options={{ headerShown: false }}>
                        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
