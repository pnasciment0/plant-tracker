import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

const LoginScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(''); // reset error state whenever username or password changes
  }, [username, password]);

  // TODO (Long-term): Add password complexity requirements (i.e. upper/lowercase, numbers, special characters)
  const handleLogin = () => {
    if (password !== '' && username !== '') {
      const userInfo = { username: username, password: password}
      dispatch(loginUser(userInfo));
    }
    else {
      setErrorMessage("Error logging in. Forgot username or password?");
    }
    setUsername('');
    setPassword('');
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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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