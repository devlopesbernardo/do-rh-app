import React from 'react';
import * as eva from '@eva-design/eva';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import { ApplicationProvider, Layout } from '@ui-kitten/components';

import Revisao from './pages/Revisao';
import DetalhesTemplate from './templates/DetalhesTemplate';
import ParabensTemplate from './templates/ParabensTemplate';
import EnviadoTemplate from './templates/EnviadoTemplate';
import Login from './pages/Login';
import LoggedIn from './pages/LoggedIn';
import Register from './pages/Register';
import PlanTemplate from './templates/PlanTemplate';
import Feedback from './pages/Feedback';

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
        <Stack.Screen name="Detalhes" component={DetalhesTemplate} />
        <Stack.Screen name="Parabens" component={ParabensTemplate} />
        <Stack.Screen name="Enviado" component={EnviadoTemplate} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Plan" component={PlanTemplate} />
        <Stack.Screen name="Feedback" component={Feedback} />

        <Stack.Screen name="LoggedIn" component={LoggedIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);
