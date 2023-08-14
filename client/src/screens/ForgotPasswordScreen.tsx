import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Handle the forgot password functionality here
    // Send a request to your backend API to initiate the password reset process
    // You can use your apiHelper or axios to make the API call

    // Example:
    // apiHelper.post('/forgot-password', { email })
    //   .then((response) => {
    //     // Handle the response, such as showing a success message or navigating to a confirmation screen
    //   })
    //   .catch((error) => {
    //     // Handle any error, such as displaying an error message or logging the error
    //   });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Reset Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;