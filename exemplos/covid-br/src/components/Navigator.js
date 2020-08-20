import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import CasesByStateView from '../screens/casesByStateView'
import ChartsView from '../screens/chartsView'
import Home from '../screens/homeView'
import About from '../screens/about'

const Tab = createMaterialBottomTabNavigator();

export default function Navigator() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        activeColor="pink"
        activeColor="#f0edf6"
        inactiveColor="#334"
        
        barStyle={{ backgroundColor: '#187bcd' }}
        
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (<Icon name="home" color={color} size={20} />)
          }}
        />
        <Tab.Screen
          name="States"
          options={{
            tabBarLabel: 'Estados',
            tabBarIcon: ({ color }) => (<Icon name="globe-americas" color={color} size={20} />)
          }}
        >
          {props => <CasesByStateView  {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name="Charts"
          component={ChartsView}
          options={{
            tabBarLabel: 'Estatísticas',
            tabBarIcon: ({ color }) => (<Icon name="chart-pie" color={color} size={20} />)
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarLabel: 'Sobre',
            tabBarIcon: ({ color }) => (<Icon name="copyright" color={color} size={20} />)
          }}
        />
      </Tab.Navigator>

    </NavigationContainer>
  );
}