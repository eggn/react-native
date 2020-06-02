import React from 'react';
import { View } from 'react-native';

export const FlexDirectionBasics = () => {
    return (
      // ['row', 'row-reverse', 'column', 'column-reverse'];
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
};
