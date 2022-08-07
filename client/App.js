import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loginScreens } from './src/content/screenNames';

const Stack = createNativeStackNavigator();

// contexts
import UserContextWrapper from './src/contexts/context.user';

// noAuth..
import LoginUsername from './src/content/noAuthed/screens/Login/step.one/index';
import LoginPassword from './src/content/noAuthed/screens/Login/step.two/index';

// authed navigation item..
import Dashboard      from './src/content/authed/screens/Dashboard/index';
import CalendarScreen from './src/content/authed/screens/Calendar';

// authed dashboard items.

export default function App ( ) {
    return (
        <UserContextWrapper>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ loginScreens.step_1 } component={ LoginUsername }  />
                    <Stack.Screen name={ loginScreens.step_2 } component={ LoginPassword }   />
                    <Stack.Screen name="dashboard" component={ Dashboard }  />
                    <Stack.Screen name="calendar"  component={ CalendarScreen }  />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContextWrapper> 
    );
};