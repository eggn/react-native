import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'



export default class BoasVindas extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.crud}>CRUD</Text>
                <Text style={styles.bemVindo}> Seja bem-vindo(a)</Text>
                <TouchableOpacity style={styles.botao} onPress={this.props.entrarClick}>
                    <Text style={styles.labelBotao}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,      
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    },
    crud: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFF'
    },
    bemVindo: {
        fontSize: 18,
        color: 'red'        
    },
    botao:{
        backgroundColor: '#6c6b6b',
        marginVertical: 40

    },
    labelBotao:{
        color: '#FFF',
        padding:10
    }
  });