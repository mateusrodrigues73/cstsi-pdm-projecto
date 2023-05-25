/* eslint-disable react/no-unstable-nested-components */
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
import Usuario from '../screens/Usuario';
import Anuncios from '../screens/Anuncios';
import Anuncio from '../screens/Anuncio';
import ProdutosMap from '../screens/ProdutosMap';
import {colors} from '../assets/colors';

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
    initialRouteName="Estudantes"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      component={Estudantes}
      name="Estudantes"
      options={{
        tabBarLabel: 'Estudantes',
        tabBarIcon: () => (
          <Icon name="people" color={colors.primary} size={24} />
        ),
      }}
    />
    <Tab.Screen
      component={Anuncios}
      name="Anuncios"
      options={{
        tabBarLabel: 'Seus anúncios',
        tabBarIcon: () => (
          <Icon name="basket" color={colors.primary} size={24} />
        ),
      }}
    />
    <Tab.Screen
      component={Usuario}
      name="Usuario"
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: () => (
          <Icon name="person" color={colors.primary} size={24} />
        ),
      }}
    />
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
      <Stack.Screen component={Anuncio} name="Anuncio" />
      <Stack.Screen
        component={ProdutosMap}
        name="ProdutosMap"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;
