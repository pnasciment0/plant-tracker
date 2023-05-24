import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const LoginScreen = () => {
const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For now, let's just simulate a user logging in with a static user object.
    const user = { name: 'Tony', email: 'tony@starkindustries.com' };

    dispatch(login(user));
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