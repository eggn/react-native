import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default class Display extends Component {


    renderExpressao = () => {
        let resultado = this.props.displayResultado;
        let fontSize = 64
        let fontWeight = '500'
        let color = 'black'
        if (resultado === '0') {
            fontSize = 44
            color = '#808080'
        }
        let display = (this.props.displayExpressao + '').toString()
        if (display && display.length >= 10 && display.length <= 16) fontSize = 44
        if (display && display.length >= 16) fontSize = 34
        if(this.props.igualPressionado){
            fontSize = 44
            color = '#808080'
        }
        return (
            <Text style={{ fontSize, fontWeight, color }}>{this.props.displayExpressao}</Text>
        )
    }
    renderResultdo = () => {
        let resultado = this.props.displayResultado;
        let fontSize = 64
        let fontWeight = '500'
        let color = 'black'
        if (resultado !== '0') {
            resultado = '=' + resultado
            fontSize = 44
            color = '#808080'
        }
        let display = (this.props.displayExpressao + '').toString()
        if (display && display.length >= 10 && display.length <= 16) fontSize = 34
        if (display && display.length >= 17) fontSize = 20
        if(this.props.igualPressionado){
            fontSize = 64
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
        justifyContent: 'center',
    },
    display: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 16,
        flexWrap: 'wrap',
        alignContent: 'flex-end'
    }
});