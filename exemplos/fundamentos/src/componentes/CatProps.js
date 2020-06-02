import React from 'react';
import { Text, View, Image } from 'react-native';

export default function CatProps(props) {
  const {altura, largura} = props
  return (
    <View>
      <Image
        source={{uri: "https://reactnative.dev/docs/assets/p_cat1.png"}}
        style={{width: largura, height: altura}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}