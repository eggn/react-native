import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, PanResponder, Animated, Text, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { height } = Dimensions.get('window');


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function DetalhesTab() {
  const Tab = createMaterialTopTabNavigator();
  return (

    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontFamily: 'Product Sans Bold' },
        tabStyle: { borderBottomLeftRadius: 20, marginTop: 30 },
        style: { borderTopLeftRadius: 40, borderTopRightRadius: 40 },
      }}>
      <Tab.Screen name="Sobre" component={HomeScreen} />
      <Tab.Screen name="Evolução" component={HomeScreen} />
      <Tab.Screen name="Status" component={SettingsScreen} />

    </Tab.Navigator>


  );
}



export default class Detalhes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      topHeight: 40, // min height for top pane header
      bottomHeight: new Animated.Value(500), // min height for bottom pane header,
      deviceHeight: Dimensions.get('window').height,
      isDividerClicked: false,

      pan: new Animated.ValueXY()
    }

  }
  _animatedValue = new Animated.Value(240);

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const isFarLeft = evt.nativeEvent.pageY < Math.floor(height * 0.3);
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
      this._animatedValue.setValue(gestureState.moveY > (this.state.deviceHeight - 40) ? 40 : this.state.deviceHeight - gestureState.moveY);
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
      toValue: 360,
      duration: 250,
      // useNativeDriver: true,
    }).start(() => {
      // this._animatedValue.setValue(240);

    });
  }
  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
  }


  render() {
    const {pokemon} = this.props.route.params
    const animatedStyle = {
      height: this._animatedValue
    }
    return (
      <View style={styles.content}>

        {/* Top View */}
        <Animated.View
          style={[{ backgroundColor: 'pink', minHeight: 40, flex: 1, alignItems:'center', justifyContent:'center' }, { height: this.state.topHeight }]}
        >
          <Text>{pokemon.name}</Text>
          <Image style={styles.image} source={{ uri: pokemon.img }} />
        </Animated.View>

        {/* Divider */}
        {/* <View
          style={[{ height: 10 }, this.state.isDividerClicked ? { backgroundColor: '#666' } : { backgroundColor: '#e2e2e2' }]}
          {...this._panResponder.panHandlers}
        >
        </View> */}

        {/* Bottom View */}
        <Animated.View
          style={[styles.animatedBox, animatedStyle]}
          {...this._panResponder.panHandlers}
        >

          <DetalhesTab />

        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column'
  },
  animatedBox:
  {
    minHeight: 420,
    backgroundColor: 'red',
    //borderTopLeftRadius: 40,
    //borderTopRightRadius: 40,
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: 100,
    bottom: -20,
    
},
})