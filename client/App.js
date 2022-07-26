import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loginScreens } from './src/content/screenNames';

const Stack = createNativeStackNavigator();

// contexts
import UserContextWrapper from './src/contexts/context.user';

// noAuth..
import LoginUsername from './src/content/noAuthed/screens/Login/step.one/index';
import LoginPassword from './src/content/noAuthed/screens/Login/step.two/index';

// authed..
import Dashboard from './src/content/authed/screens/Dashboard/index';


export default function App ( ) {
    return (
        <UserContextWrapper>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={ loginScreens.step_1 } component={ LoginUsername }  options={{ headerShown: false }} />
                    <Stack.Screen name={ loginScreens.step_2 } component={ LoginPassword }  options={{ headerShown: false }} />
                    <Stack.Screen name="dashboard" component={ Dashboard }      options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContextWrapper> 
    );
};