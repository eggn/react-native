import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function MeuTextInput() {
  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        placeholder={'Digite seu nome...'}
        defaultValue=""
        maxLength={15}
      />
    </View>
  );
}
