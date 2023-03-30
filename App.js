import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Preload from './src/screens/Preload';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import Cursos from './src/screens/Cursos/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen component={Home} name="Home" />
    <Tab.Screen component={Cursos} name="Cursos" />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
    </Stack.Navigator>
  </NavigationContainer>
);
export default App;
