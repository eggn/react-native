import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    Picker,
    Image
} from 'react-native'

import pokeball from '../../assets/images/pokeball.png'

import {CORES} from '../util/Cores'

const criteriosOrdenacao = ['Número', 'Nome', 'Tipo']

export default class FiltroPokedex extends Component {
    state = {
        valorSelecionado: 'Número'
    }

    setSelectedValue = (valorSelecionado) => {
        console.log('setSelectedValue', valorSelecionado)
        this.setState({ valorSelecionado })
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgroud}></View>
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.backgroudLateral}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image source={pokeball} style={styles.headerPokeball} />
                            <Text style={styles.headerTitulo}>Ordenação</Text>
                            <Image source={pokeball} style={styles.headerPokeball} />
                        </View>
                        <View style={styles.conteudo}>
                            <Text style={{fontFamily: 'Product Sans Bold', marginLeft:35, marginTop:12, color:CORES.cinza}}>Ordernar por:</Text>
                            <Picker
                                selectedValue={this.state.valorSelecionado}
                                style={{ height: 50, width: 150, marginLeft: 30, color:'red' }}
                                onValueChange={(itemValue, _) => this.setSelectedValue(itemValue)}
                            >
                                {
                                    criteriosOrdenacao.map((item, index) =>
                                         <Picker.Item key={index} label={item} value={item} />)
                                }
                            </Picker>
                            <View style={styles.buttoms}>
                                <TouchableOpacity onPress={this.props.onCancel}>
                                    <Text style={styles.buttom}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.onOk(this.state.valorSelecionado)}>
                                    <Text style={styles.buttom}>Filtrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.backgroudLateral}></View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgroud}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    backgroudLateral: {
        flex: .1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        flex: .8,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    header: {
        flexDirection:'row',
        backgroundColor: 'red',        
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 12,
        fontSize: 18,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    headerTitulo: {
        fontFamily: 'Product Sans Bold',
        color: '#fff',
        fontSize: 18,
    },
    headerPokeball:{
        width: 35, 
        height: 35, 
        opacity:0.6
    },
    conteudo: {
        backgroundColor: '#fff',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttoms: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    input: {
        fontFamily: 'Product Sans Bold',
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        padding: 10,
        fontSize: 16
    },
    buttom: {
        margin: 20,
        marginRight: 20,
        color: 'red',
        fontFamily: 'Product Sans Bold'
    },


})