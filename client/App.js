import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// contexts
import UserContextWrapper from './src/contexts/context.user';

// noAuth..
import LoginUsername from './src/content/noAuthed/screens/Login/login.username';
import LoginPassword from './src/content/noAuthed/screens/Login/login.password';

// authed..
import Dashboard from './src/content/authed/screens/Dashboard/index';


export default function App ( ) {

  return (
    <UserContextWrapper>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login-1"   component={ LoginUsername }  options={{ headerShown: false }} />
                <Stack.Screen name="login-2"   component={ LoginPassword }  options={{ headerShown: false }} />
                <Stack.Screen name="dashboard" component={ Dashboard }      options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </UserContextWrapper> 
  );
};