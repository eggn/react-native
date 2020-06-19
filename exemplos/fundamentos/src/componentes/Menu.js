import * as React from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
//import Constants from 'expo-constants';

import Cat from './Cat'
import CatMaru from './CatMaru'
import CatFunctionCall from './CatFunctionCall'
import MeuTextInput from './MeuTextInput'
import CatProps from './CatProps'
import CatState from './CatState'
import ComunicacaoIndireta from './ComunicacaoIndireta'
import FlexBasico from './flexBox/FlexBasico'
import { FlexDirectionBasics } from './flexBox/FlexDirectionsEx'
import JustifyContentBasics from './flexBox/JustifyContent'
import FlexBoxDemo from './flexBox/FlexBoxDemo'
import AlignItemsBasics  from './flexBox/AlignItems'
import FlatListEx from './flexBox/FlatListEx'
import ExercicioFlex from './flexBox/ExercicioFlex'
import ExemploPicker from './PickerEx'

console.disableYellowBox = true;

const HomeButton = ({navigation}) =>
 <TouchableOpacity style={[styles.cornerButton, { backgroundColor: "#1e90ff" }]}
    activeOpacity={0.7}
    onPress={() => navigation.goBack()}>
    <Icon name="home" size={20} color={"#fff"} />
</TouchableOpacity>


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Esta eh minha tela inicial!</Text>           
            <TouchableOpacity style={[styles.cornerButton, 
                            { backgroundColor: "#1e90ff", left:30, top:30}]}
                activeOpacity={0.7}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} color={"#fff"} />
            </TouchableOpacity>
        </View>
    );
}

function renderMeusComponentes({ navigation }, renderComponente) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {renderComponente()}
            <HomeButton navigation={navigation}/>
        </View>
    );
}
function renderMeusComponentesFlex({ navigation }, renderComponente) {
    return (
        <View style={{ flex: 1 }}>
            {renderComponente()}
            <HomeButton navigation={navigation}/>
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function AppComMenu() {
    return (
        
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />

                <Drawer.Screen name="Primeiro componente">
                    {props => renderMeusComponentes(props, Cat )}
                </Drawer.Screen>
                <Drawer.Screen name="Variaveis no componente">

                    {props => renderMeusComponentes(props, CatMaru)}
                </Drawer.Screen>
                <Drawer.Screen name="Funcoes no componente">

                    {props => renderMeusComponentes(props,CatFunctionCall)}
                </Drawer.Screen>
                <Drawer.Screen name="Customizando um componente">

                    {props => renderMeusComponentes(props, MeuTextInput)}
                </Drawer.Screen>
                <Drawer.Screen name="Comunicacao direta entre comp.">
                    {props => renderMeusComponentes(props, () => <CatProps altura={100} largura={100} />)}
                </Drawer.Screen>
                <Drawer.Screen name="Estado (State) de um componente">
                    {props => renderMeusComponentes(props, () => <CatState />)}
                </Drawer.Screen>
                <Drawer.Screen name="Comunicacão indireta">
                    {props => renderMeusComponentes(props, () => <ComunicacaoIndireta />)}
                </Drawer.Screen>
                <Drawer.Screen name="Flex Box (Basico)">
                    {props => renderMeusComponentesFlex(props, () => <FlexBasico />)}
                </Drawer.Screen> 
                <Drawer.Screen name="Flex Box (Directions)">
                    {props => renderMeusComponentesFlex(props, () => <FlexDirectionBasics />)}
                </Drawer.Screen>
                <Drawer.Screen name="Flex Box (JustifyContent)">
                    {props => renderMeusComponentesFlex(props, () => <JustifyContentBasics />)}
                </Drawer.Screen>
                <Drawer.Screen name="Flex Box (AlignItems)">
                    {props => renderMeusComponentesFlex(props, () => <AlignItemsBasics />)}
                </Drawer.Screen> 
                <Drawer.Screen name="Flex Box (FlatList)">
                    {props => renderMeusComponentesFlex(props, () => <FlatListEx />)}
                </Drawer.Screen>
                <Drawer.Screen name="Flex Box (Exercicio)">
                    {props => renderMeusComponentesFlex(props, () => <ExercicioFlex />)}
                </Drawer.Screen>
                <Drawer.Screen name="FlexBox Demo">
                    {props => renderMeusComponentesFlex(props, () => <FlexBoxDemo />)}
                </Drawer.Screen>
                <Drawer.Screen name="Componente Picker">
                    {props => renderMeusComponentes(props, () => <ExemploPicker />)}                
                </Drawer.Screen> 

            </Drawer.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    
    cornerButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 5
            }
        }),
    }
});