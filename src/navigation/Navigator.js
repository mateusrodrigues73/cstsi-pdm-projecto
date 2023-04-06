import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons.js';

import SignIn from '../screens/SignIn';
import Estudantes from '../screens/Estudantes';
import Estudante from '../screens/Estudante';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Cursos from '../screens/Cursos/styles';
import { colors } from '../assets/colors';


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
    <Stack.Screen component={SignUp} name="Sig>nUp" />
    <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Estudantes"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen 
      component={Estudantes} 
      name="Estudantes" 
      options={{
        tabBarLabel: 'Estudantes',    
        tabBarIcon: () => {
          <Icon name="people" color={colors.primary} size={24}/>
        }
      }}
    />
    
    <Tab.Screen component={Cursos} name="Cursos" />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen component={Estudante} name="Estudante" />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;