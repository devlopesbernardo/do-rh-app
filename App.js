import React from 'react';
import * as eva from '@eva-design/eva';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import Revisao from './pages/Revisao';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // headerStatusBarHeight: 0,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Revisao" component={Revisao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);
