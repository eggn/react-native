import React from 'react'
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const larguraTela = Dimensions.get('window').width
const altura = Dimensions.get('window').height

export const Botao = ({ label, operadorIgual, operador, onClick }) => {
    const labelStyle = [styles.label]
    if (operadorIgual) labelStyle.push({ color: '#fff' })
    if (operador) labelStyle.push({ color: '#fa8231' })
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.areaClicavel} onPress={() => onClick(label)}>
                <View style={operadorIgual ? styles.operadorIgual : null}>
                    <Text style={labelStyle}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: (larguraTela / 4) ,
       // height: (larguraTela / 5) ,
       height: '20%',
        backgroundColor: '#f0ffff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    areaClicavel: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (larguraTela / 4) - 5,
        height: (larguraTela / 4) - 24,
        borderRadius: 20,
        // opacity: 0.7
    },
    operadorIgual: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (larguraTela / 4) - 42,
        height: (larguraTela / 4) - 42,
        borderRadius: 50,
        backgroundColor: '#fa8231',

    },
    label: {
        fontSize: 28,
    }
});
export default Botao