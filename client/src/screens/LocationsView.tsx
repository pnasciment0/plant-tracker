import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationsView = () => (
  <View style={styles.container}>
    <Text>Location View</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationsView;