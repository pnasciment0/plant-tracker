// /navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

import HomeScreen from '../screens/HomeScreen';
import SpreadsheetView from '../screens/SpreadsheetView';
import LocationsView from '../screens/LocationsView';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home'; 

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              // iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Spreadsheet':
              iconName = 'grid';
              // iconName = focused ? 'table' : 'table-large';
              break;
            case 'Locations':
              iconName = 'building-4';
              // iconName = focused ? 'map' : 'map-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Spreadsheet" component={SpreadsheetView} options={{ title: 'Spreadsheet' }} />
      <Tab.Screen name="Locations" component={LocationsView} options={{ title: 'Locations' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;