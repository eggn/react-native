import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
export const Entrada = props => 
    <View>
        <TextInput value={props.input}
            maxLength={10}
            style={styles.input}
            onChangeText={props.chamarQuandoMudar}
            placeholder='Digite algo...' />
    </View>

const styles =  StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
  });
  