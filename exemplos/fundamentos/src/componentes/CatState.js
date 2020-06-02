import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
const IMG_CAT_URI = "https://reactnative.dev/docs/assets/p_cat1.png"
class CatState extends Component {
    state = { contador: 0 }
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={()=>this.setState({contador: this.state.contador+1})}>
                    <Image
                        source={{ uri: IMG_CAT_URI }}
                        style={{ width: 50, height: 50 }}
                    />

                </TouchableOpacity>
                <Text>Touch me count: {this.state.contador}</Text>
            </View>
        )
    }
}
export default CatState