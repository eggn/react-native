import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Cat from './componentes/Cat'
import CatMaru from './componentes/CatMaru'
import CatFunctionCall from './componentes/CatFunctionCall'
import MeuTextInput from './componentes/MeuTextInput'
import CatProps from './componentes/CatProps'
import CatState from './componentes/CatState'
export default class App extends Component {
  render(){
    return (
      <View style = {styles.container}>
        <Cat></Cat>
        <CatMaru/>
        <CatFunctionCall></CatFunctionCall>
        <MeuTextInput/>
        <CatProps altura={100} largura={100}/>
        <CatState></CatState>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

