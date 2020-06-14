import React, { Component } from 'react'; 
import { StyleSheet, View, Dimensions, PanResponder, Animated,Text } from 'react-native';

export default class ExPanresponder extends Component {
    
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
          this.setState({x:this.pan.x._value})
        this.pan.setOffset({
          x: this.pan.x._value,
          y: this.pan.y._value
        });
      },
      //onPanResponderMove:    Animated.event([
    //     null,
    //     { dx: this.pan.x, dy: this.pan.y }
    //   ]),
      onPanResponderMove: (event, gesture) => {
        this.pan.setValue({ x: gesture.dx, y: gesture.dy });
        this.setState({x:this.pan.x._value})
     },
      onPanResponderRelease: () => {
        this.setState({x:this.pan.x._value})
        this.pan.flattenOffset();
      }
    });
    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                    }}
                    {...this.panResponder.panHandlers}
                    >
                    <View style={styles.ball} />                   
                </Animated.View>  
                <Text>{JSON.stringify({x:this.pan.x._value, y:this.pan.y._value})}</Text>              
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },  
    ball: {
        height: 80,
        width: 80,
        borderColor: 'black',
        borderRadius: 40,
        borderWidth: 40
     },
  });
  