 // RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import ApiFunctions from '../api/apiHelper';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    // We'll register a user using the API helper function
    const response = await ApiFunctions.registerUser(username, password);

    if (response.data) {
      Alert.alert('Success', 'Registered successfully!');
    } else {
      Alert.alert('Error', 'Could not register user.');
    }
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
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

export default RegisterScreen;