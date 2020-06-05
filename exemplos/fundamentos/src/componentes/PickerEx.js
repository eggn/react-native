import React from 'react'
import {Alert, StyleSheet, Text} from 'react-native'
import {Picker} from '@react-native-community/picker'



const linguagens = [
    {
        label: 'Selecione uma linguagem',
        value: '-1'
    },
    {
        label: 'JavaScript',
        value: 'javascript'
    },
    {
        label: 'Java',
        value: 'java'
    },
]
const ExemploPicker = props => (
    
        <Picker
            selectedValue={'-1'}
            mode={"dialog"}
            style={styles.container}
            prompt={'Selecione uma linguagem'}           
            onValueChange={(itemValue, itemIndex) =>  Alert.alert('Valor selecionado: ' + itemValue)}
        >
            {linguagens.map((item, indice) => < Picker.Item label={item.label} value={item.value} key={indice} color={item.value=='-1' ? '#FFF' : '#333'}/>)}
        </Picker>

   
)

const styles = StyleSheet.create({
    container: {
      color: '#ccc',  
      width:230,
      height:50
    },
  });
  


 export default  ExemploPicker

