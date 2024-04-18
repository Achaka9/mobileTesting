// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraComponent from './CameraComponent';
import VTKViewer from './VTKViewer';  // Ensure you have created this component
import ModelViewer from './modelViewer';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const HomePage = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Page</Text>
  </View>
);

const BlankPage = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Future Feature</Text>
  </View>
);

export const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Camera" component={CameraComponent} />
    <Tab.Screen name="Closet" component={BlankPage} />
    <Tab.Screen name="VTK Viewer" component={VTKViewer} />
    <Tab.Screen name="Model Viewer" component={ModelViewer} />
  </Tab.Navigator>
);
