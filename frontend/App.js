import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRScanner from './screens/QRScanner';
import Menu from './screens/Menu';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="QRScanner" component={QRScanner} />
                <Stack.Screen name="Menu" component={Menu} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
