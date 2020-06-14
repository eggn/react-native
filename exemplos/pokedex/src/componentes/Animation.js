import React, {Component} from 'react';

import { Animated, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';

export default class App extends Component {

  constructor(){
    super();
    this.state={
      animationValue : new Animated.Value(180),
      viewState : true
    }
  }

  toggleAnimation=()=>{

    if(this.state.viewState == true){
    Animated.timing(this.state.animationValue, {
      toValue : 300,
      timing : 1500
    }).start(()=>{
      this.setState({viewState : false})
    });
    }
    else{
      Animated.timing(this.state.animationValue, {
        toValue : 180,
        timing : 1500
      }).start(this.setState({viewState: true})
      );
    }
  }

  render() {

    const animatedStyle = {
      width : this.state.animationValue,
      height : this.state.animationValue
    }

    return (
     
        <View style={styles.MainContainer}>

         <TouchableWithoutFeedback onPress={this.toggleAnimation}>

           <Animated.View style={[styles.animatedBox, animatedStyle]} >

             <Text style={styles.text}>
               Hello Guys, This is some sample Text.
               Hello Guys, This is some sample Text.
               Hello Guys, This is some sample Text.
               Hello Guys, This is some sample Text.
             </Text>

           </Animated.View>
           
         </TouchableWithoutFeedback>  

        </View>
    );
  }
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',
    padding: 12

  },
  animatedBox:
  {
     width : 180,
     height: 180,
     backgroundColor : '#0091EA'
  },

  text:{
    color : '#FFFFFF'
  }

});