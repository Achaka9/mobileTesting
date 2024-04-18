// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
