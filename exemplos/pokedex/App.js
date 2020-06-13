import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
  ImageBackground
} from 'react-native';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { consultarPokedex } from './src/servicos/pokedexService'
import PokeItem from './src/componentes/PokeItem'
import FiltroPokedex from './src/componentes/FiltroPokedex'
import pokeball_dark from './assets/images/pokeball_dark.png'

const estadoInicial = {
  pokedex: [],
  carregandoFontes: true,
  carregandoPokedex: true,
  exibirFiltro: false,
  filtroSelecionado: 'Número',
}

export default class App extends Component {
  state = {
    ...estadoInicial
  }
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.sair);
    this.carregarPokedex()
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.sair);
  }

  sair = () => {
    Alert.alert(
      'Sair do Aplicativo',
      'Deseja sair do app?',
      [
        { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false });
    return true;
  }

  async carregarPokedex() {
    let pokedex = await consultarPokedex()
    this.setState({ pokedex, carregandoPokedex: false }, this.carregarFonte)
  }

  async carregarFonte() {
    const fontes = {
      'Product Sans': { uri: require('./assets/fonts/ProductSans-Regular.ttf'), display: 'swap' },
      'Product Sans Bold': { uri: require('./assets/fonts/ProductSans-Bold.ttf'), display: 'swap' },
    }
    await Font.loadAsync(fontes);
    this.setState({ carregandoFontes: false });

  }

  onFiltroSelecionado = (filtroSelecionado) => {
    console.log('onFiltroConfirmado 1', filtroSelecionado)
    let pokedex = this.state.pokedex.sort((a, b) => {
      if (filtroSelecionado === 'Número') {
        return a.num > b.num
      } else if (filtroSelecionado === 'Nome') {
        return a.name > b.name
      } else if (filtroSelecionado === 'Tipo') {
        return a.type[0] > b.type[0]
      }

    })
    this.setState({ pokedex, carregandoPokedex: false })
  }

  handleLazyLoad = ({ viewableItems }) => {
    console.log('handleLazyLoad', viewableItems.length)
    const newData = this.state.pokedex.map(image =>
      viewableItems.find(({ item }) => item.num === image.num)
        ? { ...image, loaded: true }
        : image
    );

    this.setState({ pokedex: newData });
  }

  render() {

    return (
      <View style={styles.container}>

        {this.state.carregandoPokedex || this.state.carregandoFontes
          ? <ActivityIndicator size="large" color="red" />
          :
          <View>
            <View style={{ flex: .2, justifyContent: 'center', margin: 12 }}>
              <Text style={{ fontSize: 32, color: '#000', fontWeight: 'bold', fontFamily: 'Product Sans Bold' }}>Pokedex</Text>
              <ImageBackground source={pokeball_dark} imageStyle={{ opacity: 0.1 }}
                style={{ width: 300, height: 300, position: 'absolute', right: -120, justifyContent: 'center', alignItems: 'center' }} >
                  <TouchableOpacity onPress={()=> this.sair()}>
                    <Icon name='times' size={30} color='#000' />
                  </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={{ flex: .8, flexDirection: 'row' }}>
              <FlatList
                data={this.state.pokedex}
                renderItem={({ item }) => <PokeItem {...item} />}
                keyExtractor={(item) => item?.num}
                numColumns={2}
                onViewableItemsChanged={this.handleLazyLoad}
              />
            </View>
          </View>
        }
        <TouchableOpacity style={styles.filtro}
          onPress={() => this.setState({ exibirFiltro: true })}
          activeOpacity={0.7}>
          <Icon name='sort-amount-down' size={30} color='#FFF' />
        </TouchableOpacity>
        <FiltroPokedex
          isVisible={this.state.exibirFiltro}
          onCancel={() => this.setState({ exibirFiltro: false })}
          onOk={(filtroSelecionado) => this.setState({ exibirFiltro: false, filtroSelecionado, carregandoPokedex: true }, () => this.onFiltroSelecionado(filtroSelecionado))}
        />
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
  filtro: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 5
      }
    }),
  },
});
