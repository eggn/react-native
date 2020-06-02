
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
//import Constants from 'expo-constants';
import {Entrada} from './Entrada'


export default class TextoSincronizado extends Component {

    state = {
        texto: ''
    }
    
    alterarTexto = texto => {
        this.setState({ texto })
    }

    render() {
        return (
            <View >
                <Text style={{ fontSize: 40 }}>{this.state.texto}</Text>
                <Entrada texto={this.state.texto}
                    chamarQuandoMudar={this.alterarTexto} />
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    input: {
        height: 70,
        fontSize: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
  });