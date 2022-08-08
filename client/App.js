import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { loginScreens , authDashboardScreens } from './src/content/screenNames';

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
import ActivitiesList from './src/content/authed/screens/Content/Activities/index';
import ChatScreens    from './src/content/authed/screens/Content/Chat/index';


export default function App ( ) {
    return (
        <UserContextWrapper>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ loginScreens.step_1 } component={ LoginUsername }  />
                    <Stack.Screen name={ loginScreens.step_2 } component={ LoginPassword }   />
                    <Stack.Screen name="dashboard" component={ Dashboard }  />
                    <Stack.Screen name="calendar"  component={ CalendarScreen }  />
                    <Stack.Screen name={ authDashboardScreens.activities }    component={ ActivitiesList }  />
                    <Stack.Screen name={ authDashboardScreens.therapistChat } component={ ChatScreens }  />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContextWrapper> 
    );
};