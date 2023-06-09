import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from '../redux/store'; // import the RootState from your store

import LoginPage from '../screens/LoginScreen';
import MainPage from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginPage} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    {/* Include any other screens for unauthenticated users here */}
  </AuthStack.Navigator>
);

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Main" component={MainPage} />
    {/* Include the rest of your app's screens here */}
  </MainStack.Navigator>
);

// Add a main Stack Navigator which will decide whether to show AuthStack or MainStack based on authentication state
const Main = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.loading === 'loading') {
    return <LoadingScreen />;
  } else {
    return auth.user ? (
      <MainStackNavigator />
    ) : (
      <AuthStackNavigator /> // unathenticated users
    );
  }
}

export default Main;