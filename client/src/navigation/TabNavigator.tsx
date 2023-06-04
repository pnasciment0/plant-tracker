import { View, Text } from 'react-native';

// Import the necessary modules
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Assume these are your two screens
function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

function App() {
  console.log("hi");
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
  );
}

export default App;