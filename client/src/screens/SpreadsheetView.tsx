// /screens/SpreadsheetView.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpreadsheetView = () => (
  <View style={styles.container}>
    <Text>Spreadsheet View</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpreadsheetView;