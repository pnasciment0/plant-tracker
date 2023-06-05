import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../screens/LoginScreen';
import MainPage from '../screens/HomeScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginPage} />
    {/* Include any other screens for unauthenticated users here */}
  </AuthStack.Navigator>
);

export const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Main" component={MainPage} />
    {/* Include the rest of your app's screens here */}
  </MainStack.Navigator>
);