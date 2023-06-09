import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  // Add other screen names here
};

const LoginScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For now, let's just simulate a user logging in with a static user object.
    const user = { username: 'paulo', password: 'pass12388' };

    dispatch(loginUser(user));
  };

  return (
    <View>
      <TextInput 
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Don't have an account? Register for one here</Text>
      </TouchableOpacity>
    </View>
  );

//   return (
//     <View style={styles.container}>
//       <Button title="Log in" onPress={handleLogin} />
//     </View>
//   );
}

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center' },
//   });

export default LoginScreen;