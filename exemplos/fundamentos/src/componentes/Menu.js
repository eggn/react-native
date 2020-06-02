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

                <Drawer.Screen name="Primeiro componente" component={(props) => renderMeusComponentes(props, () => <Cat />)} />
                <Drawer.Screen name="Variaveis no componente" component={(props) => renderMeusComponentes(props, () => <CatMaru />)} />
                <Drawer.Screen name="Funcoes no componente" component={(props) => renderMeusComponentes(props, () => <CatFunctionCall />)} />
                <Drawer.Screen name="Customizando um componente" component={(props) => renderMeusComponentes(props, () => <MeuTextInput />)} />
                <Drawer.Screen name="Comunicacao direta entre comp." component={(props) => renderMeusComponentes(props, () => <CatProps altura={100} largura={100} />)} />
                <Drawer.Screen name="Estado (State) de um componente" component={(props) => renderMeusComponentes(props, () => <CatState />)} />
                <Drawer.Screen name="Comuniccao indireta" component={(props) => renderMeusComponentes(props, () => <ComunicacaoIndireta />)} />
                <Drawer.Screen name="Flex Box (Basico)" component={(props) => renderMeusComponentesFlex(props, () => <FlexBasico />)} />
                <Drawer.Screen name="Flex Box (Directions)" component={(props) => renderMeusComponentesFlex(props, () => <FlexDirectionBasics />)} />
                <Drawer.Screen name="Flex Box (JustifyContent)" component={(props) => renderMeusComponentesFlex(props, () => <JustifyContentBasics />)} />
                <Drawer.Screen name="Flex Box (AlignItems)" component={(props) => renderMeusComponentesFlex(props, () => <AlignItemsBasics />)} />
                <Drawer.Screen name="Flex Box (FlatList)" component={(props) => renderMeusComponentesFlex(props, () => <FlatListEx />)} />
                <Drawer.Screen name="Flex Box (Exercicio)" component={(props) => renderMeusComponentesFlex(props, () => <ExercicioFlex />)} />
                <Drawer.Screen name="FlexBox Demo" component={(props) => renderMeusComponentesFlex(props, () => <FlexBoxDemo />)} />

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