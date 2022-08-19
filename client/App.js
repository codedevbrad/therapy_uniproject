import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

import { loginScreens , authDashboardScreens , authSingleScreens } from './src/content/screenNames';

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
import ActivitiesList from './src/content/authed/screens/Content/Activities/ActivityList/index';
import ChatScreens    from './src/content/authed/screens/Content/Chat/index';
// goals

// authed activity items
import ActivityWelcome  from './src/content/authed/screens/Content/Activities/Activity/screens/0.activity.stage.welcome/index';
import ActivityStarting from './src/content/authed/screens/Content/Activities/Activity/screens/1.activity.stage.activity/index';
import ActivityEnded    from './src/content/authed/screens/Content/Activities/Activity/screens/2.activity.stage.endscreen/index';


export default function App ( ) {
    return (
        <UserContextWrapper>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false } }>
                    <Stack.Screen name={ loginScreens.step_1 } component={ LoginUsername } />
                    <Stack.Screen name={ loginScreens.step_2 } component={ LoginPassword } />

                    <Stack.Screen name="dashboard" component={ Dashboard } options={{ gestureEnabled: false} } />
                    <Stack.Screen name="calendar"  component={ CalendarScreen } />
                    <Stack.Screen name={ authDashboardScreens.therapistChat } component={ ChatScreens } />

                    <Stack.Screen name={ authDashboardScreens.activities }    component={ ActivitiesList   } />

                    <Stack.Screen name={ authSingleScreens.activityWelcome  } component={ ActivityWelcome  } />
                    <Stack.Screen name={ authSingleScreens.activityStarting } component={ ActivityStarting } />
                    <Stack.Screen name={ authSingleScreens.activityEnded    } component={ ActivityEnded    } />

                </Stack.Navigator>
            </NavigationContainer>
        </UserContextWrapper> 
    );
};