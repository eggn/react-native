import React from 'react';
import { View } from 'react-native';

export const JustifyContentBasics = () => {
    return (
        //['flex-start','flex-end','center','space-between',
        //'space-around','space-evenly',];
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
};
export default JustifyContentBasics