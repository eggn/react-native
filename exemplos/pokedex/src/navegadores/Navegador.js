// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Pokedex from '../screens/Pokedex'


import Detalhes from '../screens/Detalhes'


const Stack = createStackNavigator();

function Navegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Pokedex"
    //   screenOptions={{
    //     gestureEnabled: true,
    //     cardOverlayEnabled: true,
    //     ...TransitionPresets.ModalPresentationIOS,
    //   }}
      >
        <Stack.Screen name="Pokedex" component={Pokedex} options={{headerShown: false}}/>        
        <Stack.Screen name="Detalhes" component={Detalhes} options={{headerShown: false}}/>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navegador;