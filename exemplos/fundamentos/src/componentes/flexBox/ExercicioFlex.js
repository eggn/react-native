import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Constants from 'expo-constants';

export default class ExercicioFlex extends Component {
  state = {
    precoEtanol: '',
    precoGasolina: '',
    resultado: null
  }
  onChangeEtanol = (preco) => {
    this.setState({ precoEtanol: preco })
  }
  onChangeGasolina = (preco) => {
    this.setState({ precoGasolina: preco })
  }
  calculaResultado = () => {
    this.setState({ resultado: this.state.precoEtanol / this.state.precoGasolina })
  }
  renderResultado = () => {
    if (this.state.resultado) {
      return (
        this.state.resultado >= 0.7 ?
          <Text style={styles.labelResultado}>Abasteça com GASOLINA</Text> :
          <Text style={styles.labelResultado}>Abasteça com ETANOL</Text>
      )
    }
  }

  renderImageResultado = () => {
    if (this.state.resultado) {
      let uri = this.state.resultado >= 0.7 ?
        "https://seeklogo.com/images/G/gasolina-br-logo-7313236C54-seeklogo.com.png" :
        "https://seeklogo.com/images/E/etanol-br-logo-87251D06A2-seeklogo.com.png"
      return (
        <Image
          source={{ uri }}
          style={{ width: 300, height: 100 }}
        />
      )
    }

  }

  render() {
    return (

      <View style={styles.container}>
          {/* <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={styles.top} > */}
        <View style={styles.top} >
            <Text style={styles.label} >Preço do ETANOL:</Text>
            <TextInput maxLength={10} style={styles.input}
              keyboardType={Platform.OS == "ios" ? "numbers-and-punctuation" : "numeric"}
              value={this.state.precoEtanol}
              onChangeText={this.onChangeEtanol} />

            <Text style={[styles.label, { paddingTop: 12 }]} >Preço do Gasolina:</Text>
            <TextInput maxLength={10} style={styles.input}
              value={this.state.precoGasolina}
              onChangeText={this.onChangeGasolina}
              keyboardType={Platform.OS == "ios" ? "numbers-and-punctuation" : "numeric"} />
              
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
              <TouchableOpacity style={styles.botao} onPress={this.calculaResultado}>
                <Icon name="gas-pump" size={30} color={"#fff"} />
                <Text style={{ color: '#fff', fontSize: 20 }}>Calcular</Text>
              </TouchableOpacity>
            </View>
        </View>
          {/* </KeyboardAvoidingView> */}
        <View style={styles.middle} >
          {
            this.renderResultado()
          }
        </View>
        <View style={styles.bottom} >
          {this.renderImageResultado()}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    paddingTop: Constants.statusBarHeight,
    minHeight:750//workaround parao teclado
  },
  top: {
    flex: 0.3,
    backgroundColor: "#7fffd4",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    justifyContent: 'center'
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    color: 'gray'
  },
  input: {
    //height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    color: 'gray',
    padding: 10
  },
  botao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    //height: 40,
    borderRadius: 5,
    backgroundColor: '#2f4f4f',
    alignItems: 'center',
    padding: 8

  },
  labelResultado: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});

