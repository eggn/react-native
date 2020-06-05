import React, { Component } from 'react'
import { View, Text, StyleSheet,Platform } from 'react-native'


export default class Display extends Component {


    renderExpressao = () => {
        let resultado = this.props.displayResultado;
        let fontSize = 48
        let fontWeight = '500'
        let color = 'black'
        if (resultado === '0') {
            fontSize = 32
            color = '#808080'
        }
        let display = (this.props.displayExpressao + '').toString()
        if (display && display.length >= 10 && display.length <= 16) fontSize = 28
        if (display && display.length >= 16) fontSize = 24
        if(this.props.igualPressionado){
            fontSize = 32
            color = '#808080'
        }
        return (
            <Text style={{ fontSize, fontWeight, color }}>{this.props.displayExpressao}</Text>
        )
    }
    renderResultdo = () => {
        let resultado = this.props.displayResultado;
        let fontSize = 48
        let fontWeight = '500'
        let color = 'black'
        if (resultado !== '0') {
            resultado = '=' + resultado
            fontSize = 32
            color = '#808080'
        }
        let display = (this.props.displayExpressao + '').toString()
        if (display && display.length >= 10 && display.length <= 16) fontSize = 24
        if (display && display.length >= 17) fontSize = 22
        if(this.props.igualPressionado){
            fontSize = 48
            color = 'black'
        }
        return (
            <Text style={{ fontSize, fontWeight, color }}>{resultado}</Text>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.display}>
                    {this.renderExpressao()}
                    {this.renderResultdo()}                    
                </View>
                <View style={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                    marginLeft: 16,
                    marginRight: 16
                }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: .2,
        backgroundColor: '#f0ffff',
        justifyContent: 'flex-end',
    },
    display: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 16,
        flexWrap: 'wrap',
        alignContent: 'flex-end'
    }
});