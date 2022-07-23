import axios from 'axios';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// noAuth..
import LoginWelcome from './src/content/noAuthed/screens/Login/index';

// authed..
import Dashboard from './src/content/authed/screens/Dashboard/index';


export default function App ( ) {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="login" component={ LoginWelcome } />
            <Stack.Screen name="dashboard" component={ Dashboard } options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};