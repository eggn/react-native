import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {Text} from 'react-native'
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyles from './commomStyles'
import Auth from './screens/Auth'
import TaskList from './screens/TaskListExpo'
import Menu from './components/Menu'
import AuthOrApp from './components/AuthOrApp'

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <Menu {...props} />}
            drawerContentOptions={{
                activeTintColor: '#800',
                itemStyle: {

                },
                labelStyle: {
                    fontSize: 20,
                    fontFamily: commonStyles.fontFamily,
                },                
            }}>
            <Drawer.Screen
                name="Today"
                options={{ 
                    title: 'Hoje',
                    drawerIcon: ({focused, size}) => <Icon name='calendar-times' size={size} color={focused ? '#800' : 'gray'} />,
                    // drawerLabel: ({focused, size}) => <Text>Hoje</Text> //Opção para customização
                 }}
                >
                {props => <TaskList title='Hoje' daysAhead={0} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Tomorrow"
                options={{ 
                    title: 'Amanhã',
                    drawerIcon: ({focused, size}) => <Icon name='calendar-day' size={size} color={focused ? '#800' : 'gray'} />}}
                >
                {props => <TaskList title='Amanhã' daysAhead={1} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Week"
                options={{ 
                    title: 'Semana',
                    drawerIcon: ({focused, size}) => <Icon name='calendar-week' size={size} color={focused ? '#800' : 'gray'} /> }} 
                >
                {props => <TaskList title='Semana' daysAhead={7} {...props} />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Month"
                options={{ 
                    title: 'Mês',
                    drawerIcon: ({focused, size}) => <Icon name='calendar-alt' size={size} color={focused ? '#800' : 'gray'} /> }}  
            >
                {props => <TaskList title='Mês' daysAhead={30} {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

const Stack = createStackNavigator();
function Navigator() {
    let [fontsLoaded] = useFonts({
        'Lato': require('../assets/fonts/Lato.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        return (
            <NavigationContainer >
                <Stack.Navigator initialRouteName="AuthOrApp">
                    <Stack.Screen name="AuthOrApp"
                        component={AuthOrApp}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Auth"
                        component={Auth}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Home"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator