import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, PanResponder, Animated, Text, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {consultarSpecies, consultarPokemon, consultarEvolucoes} from '../servicos/pokedexService'
import {getCor,hexToRgba, CORES} from '../util/Cores'

import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');

console.disableYellowBox = true; 


const BarraStatus = props => <View style={{ width: 200, }}>
  <View style={{ flexDirection: 'row', backgroundColor: 'gray', borderRadius:3, overflow:'hidden' }}>
    <View style={{ width: props.status*200/props.max, height: 5, backgroundColor: (props.status/props.max > 0.5) ? 'teal' : CORES.vermelho }} />
  </View>
</View>

function Status({ stats }) {
  function nomeStatus(nome) {
    switch (nome) {
      case 'speed':
        return 'Speed';
      case 'special-defense':
        return 'Sp. Def';
      case 'special-attack':
        return 'Sp. Att';
      case 'defense':
        return 'Defense';
      case 'attack':
        return 'Attack';
      case 'hp':
        return 'HP';
      default:
        return 'Total';
    }
  }
  function calcularTotal(status) {
    let total = 0
    status?.forEach(element => total += element.base_stat)
    return total
  }
 


  return (
    <View style={{ marginLeft: 10, marginTop:40 }}>
      {stats?.map((item, index) => {
        return (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '30%' }}>
              <Text style={styles.label}>{nomeStatus(item.stat.name)}</Text>
              <Text style={styles.descricao}>{item.base_stat}</Text>

            </View>
            <BarraStatus status={item.base_stat} max={160} />
          </View>
        )
      })}

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '30%',   }}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.descricao}>{calcularTotal(stats)}</Text>
        </View>
        <BarraStatus status={calcularTotal(stats)} max={680} />
      </View>
    </View>
  );
}
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function Sobre(props) { 
  

  const descricao = props.species?.flavor_text_entries.filter(item=> item.language.name === "en" && item.version.name === 'sapphire')?.[0].flavor_text
  const especie = props.species?.genera.filter(item=> item.language.name === "en")?.[0].genus
  const peso = props.pokemon.weight
  const altura = props.pokemon.height
  const anatomia = capitalize(props.species?.shape.name)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:30 }}>
      {descricao ? <ScrollView>
        <Text style={styles.label}>Descrição</Text>
        <Text style={[styles.descricao,{marginHorizontal:20}]}>{descricao}</Text>
        <Text style={[styles.label,{marginVertical:6}]}>Biologia</Text>  
        <View style={[styles.row,{width:'60%'}]}>
          <Text style={styles.label}>Espécie</Text>        
          <Text style={styles.descricao}>{especie}</Text>
        </View>
        <View style={[styles.row,{width:'60%'}]}>
          <Text style={styles.label}>Peso</Text>        
          <Text style={styles.descricao}>{peso}</Text>
        </View>
        <View style={[styles.row,{width:'60%'}]}>
          <Text style={styles.label}>Altura</Text>        
          <Text style={styles.descricao}>{altura}</Text>
        </View>
        <View style={[styles.row,{width:'60%'}]}>
          <Text style={styles.label}>Anatomia</Text>        
          <Text style={styles.descricao}>{anatomia}</Text>
        </View>        
      </ScrollView>
      : <ActivityIndicator/>
      }
    </View>
  );
}

function Evolucao(props) {
  const pokemons = props?.pokedex?.filter((pokemon)=>{    
    return pokemon.name.toUpperCase() === props?.evolucoes?.chain.evolves_to[0].species.name.toUpperCase() ||
    pokemon.name.toUpperCase() === props?.evolucoes?.chain.evolves_to[0].evolves_to[0].species.name.toUpperCase() ||
    pokemon.name.toUpperCase() === props?.evolucoes?.chain.species.name.toUpperCase()

  })  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      {
        props?.evolucoes && pokemons.length > 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
            <Text style={[styles.label, { marginLeft: 0 }]}>Corrente de evoluções</Text>
            <ScrollView>
              <View style={[styles.row, { justifyContent: 'space-around', marginTop:15 }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={styles.imageEvolucao} source={{ uri: pokemons[0].img }} />
                  <Text style={[styles.label, { marginLeft: 0 }]}>{capitalize(props?.evolucoes.chain.species.name)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.label]}>{'Lvl'}</Text>
                  <Text style={[styles.label, { marginLeft: 5, marginRight: 5 }]}>{props?.evolucoes.chain.evolves_to[0].evolution_details[0].min_level}</Text>
                  <Icon name='long-arrow-alt-right' size={20} color='#000' />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={styles.imageEvolucao} source={{ uri: pokemons[1].img }} />
                  <Text style={[styles.label, { marginLeft: 0 }]}>{capitalize(props?.evolucoes.chain.evolves_to[0].species.name)}</Text>
                </View>
              </View>

              <View style={[styles.row, { justifyContent: 'space-around', marginTop:15 }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={styles.imageEvolucao} source={{ uri: pokemons[1].img }} />
                  <Text style={[styles.label, { marginLeft: 0 }]}>{capitalize(props?.evolucoes.chain.evolves_to[0].species.name)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={[styles.label]}>Lvl</Text>
                  <Text style={[styles.label, { marginLeft: 5, marginRight: 5 }]}>{props?.evolucoes.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</Text>
                  <Icon name='long-arrow-alt-right' size={20} color='#000' />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={styles.imageEvolucao} source={{ uri: pokemons[2].img }} />
                  <Text style={[styles.label, { marginLeft: 0 }]}>{capitalize(props?.evolucoes.chain.evolves_to[0].evolves_to[0].species.name)}</Text>
                </View>
              </View>
            </ScrollView>

          </View>
          : <ActivityIndicator />
      }
    </View>
  );
}

function DetalhesTab(props) {
  const Tab = createMaterialTopTabNavigator();
  return (

    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontFamily: 'Product Sans Bold' },
        tabStyle: { marginTop: 30 },
        style: { borderTopLeftRadius: 40, borderTopRightRadius: 40 },


      }}>
      <Tab.Screen name="Sobre">
        {_ => <Sobre {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Evolução">
        {_ => <Evolucao {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Status">
        {_ => <Status {...props} stats={props.pokemonDetails?.stats} />}
      </Tab.Screen>


    </Tab.Navigator>


  );
}



export default class Detalhes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      topHeight: 40, // min height for top pane header
      bottomHeight: new Animated.Value(600), // min height for bottom pane header,
      deviceHeight: Dimensions.get('window').height,
      isDividerClicked: false,
      pokemonDetails: null,
      species: null,
      evolucoes : null,
      pokemonExibido: null,
      isLoading: false,

      pan: new Animated.ValueXY()
    }

  }

  async componentDidMount(){
     this.carregarDados()
  }
  

  _animatedValue = new Animated.Value(240);

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const isFarLeft = evt.nativeEvent.pageY < Math.floor(height * 0.2);
      return isFarLeft
    },

    // Initially, set the Y position offset when touch start
    onPanResponderGrant: (e, gestureState) => {
      console.log('onPanResponderGrant')
      this.setState({
        offset: e.nativeEvent.pageY,
        isDividerClicked: true
      })
    },
    // When we drag the divider, set the bottomHeight (component state) again.
    onPanResponderMove: (e, gestureState) => {
      console.log('onPanResponderMove')
      this._animatedValue.setValue(gestureState.moveY > (this._animatedValue - 40) ? 40 : this._animatedValue._value - gestureState.moveY);
      this.setState({
        bottomHeight: gestureState.moveY > (this.state.deviceHeight - 40) ? 40 : this.state.deviceHeight - gestureState.moveY,
        offset: e.nativeEvent.pageY
      })
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,

    onPanResponderRelease: (e, gestureState) => {
      // Do something here for the touch end event
      this.setState({
        offset: e.nativeEvent.pageY,
        isDividerClicked: false
      })

      if (gestureState.moveY >= (height / 2)) {
        console.log('ENTROU AQUI onPanResponderRelease', gestureState.moveY)
        this.handlePop();
      } else {
        console.log('ENTROU AQUI onPanResponderRelease 2', gestureState.moveY)
        Animated.timing(this._animatedValue, {
          toValue: height,
          duration: 250,
          // useNativeDriver: true,
        }).start();

      }
    },
    // onPanResponderTerminate: (evt, gestureState) => {
    //   Animated.timing(this._animatedValue, {
    //     toValue: 0,
    //     duration: 250,
    //    // useNativeDriver: true,
    //   }).start();
    // },
  });

  handlePop = () => {
    console.log('handlePop')
    Animated.timing(this._animatedValue, {
      toValue: 600,
      duration: 250,
      // useNativeDriver: true,
    }).start(() => {
      // this._animatedValue.setValue(240);

    });
  }
  onCarrosselItemChanged = ({ viewableItems, changed }) => {
    console.log("Pokemon alerado", viewableItems[0]?.item?.id, this.props.route.params.pokemon.id);
     //console.log("Changed in this iteration");
    
   // if(viewableItems[0]?.item) this.carregarDados(viewableItems[0]?.item)
   //console.log('IS LOADING ', this.state.isLoading)
   this.setState({isLoading:true})
   this.timer = setTimeout(()=>{ 
     console.log('Carregando....', this.state.isLoading)
     if(this.state.isLoading){
      clearTimeout(this.timer)
      console.log('CEREGADO.............', viewableItems[0]?.item.name)
      this.setState({pokemonExibido : viewableItems[0]?.item, isLoading: false},()=> this.carregarDados())
     }
     //this.setState({isLoading: false})
     // console.log('TIMED OUT ', this.state.isLoading)
    },300)
  }

  async carregarDados(){
    console.log('carregarDados', this.props.route.params?.pokemon?.id, this.state.pokemonExibido?.name)
    if(!!this.state.pokemonExibido){
      const id = this.state.pokemonExibido.id
      const pokemonDetails = await consultarPokemon(id)
      const species = await consultarSpecies(id)
      const evolucoes = await consultarEvolucoes(species?.evolution_chain?.url)
      this.setState({pokemonDetails, species, evolucoes})
     

    }
    //else{
      //console.log(' species', pokemonExibido)
     // this.setState({pokemonDetails, species})
    //}
  }

  otimizarRenderizacao(pokedex, pokemon) {
    let pokedexOtimizada = []
    pokedexOtimizada = pokedex.filter((item) => item.id >= pokemon.id - 5 && item.id <= pokemon.id + 5)
    const indice = pokemon.id - (pokedex[pokemon.id - 5 <= 0 ? 0 : (pokemon.id-1) - 5].id )
    console.log('POKEMON EXIBIDO otimizarRenderizacao', pokemon.id, indice )
    return { pokedexOtimizada, indice };
  }
  render() {
    const {pokemon, pokedex} = this.props.route.params
    let pokemonExibido = pokemon
    var { pokedexOtimizada, indice } = this.otimizarRenderizacao(pokedex, pokemonExibido); 
    if(this.state.pokemonExibido){
      console.log('POKEMON EXIBIDO render', this.state.pokemonExibido?.id, pokemonExibido.id, indice )
      pokemonExibido = this.state.pokemonExibido
    }
   // console.log('pokedexOtimizada ', this.state.pokemonExibido?.name)
    
    //console.log('POKEMON ', pokemon?.type, this.state?.pokemonExibido)
    //if(!this.state?.pokemonExibido) return (<View><Text>Carregando...</Text></View>)
    let tipos = pokemonExibido.type 
          const animatedStyle = {
            height: this._animatedValue
          }    
    return (
      <View style={styles.content}>

        {/* Top View */}
        <Animated.View style={[{ minHeight: 80, flex: 1, backgroundColor:getCor(tipos[0]) }, { height: pokemonExibido.topHeight }]}>
          <TouchableOpacity style={{marginTop:30, marginLeft:20}} onPress={()=>this.props.navigation.goBack()}>
            <Icon name='arrow-left' size={30} color='#fff' />
          </TouchableOpacity>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, marginTop:20}}>
            <Text style={{color:'#FFF', fontFamily:'Product Sans Bold', fontSize:34, fontWeight:'bold'}}>{pokemonExibido.name}</Text>
            <Text style={{color:'#FFF', fontFamily:'Product Sans Bold', fontSize:24}}>#{pokemonExibido.num}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {tipos.map((item, index) => {
              return (
                <View key={index} style={{ backgroundColor: '#fff', borderRadius: 14, flexDirection: 'column', width: '22%', marginLeft: 20 }}>
                  <View style={[styles.labelTypeOverlay, { backgroundColor: hexToRgba(getCor(tipos[0]), 0.6) }]}>
                    <Text style={styles.labelType}>
                      {item}
                    </Text>
                  </View>
                </View>
              )
            })}


          </View>
          
            
        </Animated.View>

        {/* Divider */}
        {/* <View
          style={[{ height: 10 }, this.state.isDividerClicked ? { backgroundColor: '#666' } : { backgroundColor: '#e2e2e2' }]}
          {...this._panResponder.panHandlers}
        >
        </View> */}

        {/* Bottom View */}
        <Animated.View
          style={[styles.animatedBox, animatedStyle,{backgroundColor:getCor(tipos[0])}]}
          {...this._panResponder.panHandlers}
        >
          <View style={styles.carrosselContainer}>
            
            <FlatList
              data={pokedexOtimizada}
              renderItem={({item})=>{
                return (
                  <View key={item.id} style={{ alignItems:'center',   width:Math.floor(width)   }}>                       
                    <Image style={styles.image} source={{ uri: item.img }} />
                  </View>
                )
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              initialScrollIndex={indice}
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={this.onCarrosselItemChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
            />
          </View>

          <DetalhesTab pokemon={pokemonExibido} 
                       species={this.state.species} 
                       pokemonDetails={this.state.pokemonDetails} 
                       evolucoes={this.state.evolucoes}
                       pokedex={pokedex} />

        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // flexDirection: 'column'
  },
  animatedBox:
  {
    minHeight: 600,
    //backgroundColor: 'red',
    //borderTopLeftRadius: 40,
    //borderTopRightRadius: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  carrosselContainer: {
    //flex:.5,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.0)',
    //borderColor: '#ebebeb',
    //borderWidth: 1,
    //borderRadius: 8,
    //shadowColor: '#fcfcfc',
    //shadowOpacity: 1,
    //marginTop: 10,
    // shadowOffset: {
    //    width: 0,
    //    height: 5
    //  },    
    // position:'absolute' ,
    // top:0,
    // left:0
    position: "relative",
    top: 30,
    left: 0,
    zIndex: 1,

  },
  labelType: {
    fontFamily: 'Product Sans Bold',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  labelTypeOverlay: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label:{
    fontFamily: 'Product Sans Bold',
    color: CORES.ciza,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 2,
    marginLeft: 20
  },
  descricao:{
    fontFamily: 'Product Sans',
    color: CORES.ciza,
    fontSize: 16,    
    paddingVertical: 2,
    //marginLeft: 20
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  imageEvolucao: {
    width: 80,
    height: 80,
  },
})



