import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Botao from './Botao'

export default class Teclado extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Botao label={'C'} operador onClick={this.props.onClick} />
                <Botao label={'<<'} operador onClick={this.props.onClick} />
                <Botao label={'%'} operador onClick={this.props.onClick} />
                <Botao label={'/'} operador onClick={this.props.onClick} />
                <Botao label={'7'} onClick={this.props.onClick} />
                <Botao label={'8'} onClick={this.props.onClick} />
                <Botao label={'9'} onClick={this.props.onClick} />
                <Botao label={'*'} operador onClick={this.props.onClick} />
                <Botao label={'4'} onClick={this.props.onClick} />
                <Botao label={'5'} onClick={this.props.onClick} />
                <Botao label={'6'} onClick={this.props.onClick} />
                <Botao label={'-'} operador onClick={this.props.onClick} />
                <Botao label={'1'} onClick={this.props.onClick} />
                <Botao label={'2'} onClick={this.props.onClick} />
                <Botao label={'3'} onClick={this.props.onClick} />
                <Botao label={'+'} operador onClick={this.props.onClick} />
                <Botao label={'CE'} operador onClick={this.props.onClick} />
                <Botao label={'0'} onClick={this.props.onClick} />
                <Botao label={'.'} onClick={this.props.onClick} />
                <Botao label={'='} operadorIgual onClick={this.props.onClick} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: .5,
        flexDirection: 'row',
        flexWrap: 'wrap',

        alignItems: 'center',
        justifyContent: 'center',
    },
});