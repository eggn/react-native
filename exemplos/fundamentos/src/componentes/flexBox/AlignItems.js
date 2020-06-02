import React from 'react';
import { View } from 'react-native';
import {Cores} from '../util/Cores'

export const AlignItemsBasics = () => {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start', //['flex-start','flex-end','center','stretch','baseline',];
      }}>
        <View style={{width: 50, height: 50, backgroundColor: Cores.powderblue}} />
        <View style={{width: 50, height: 50, backgroundColor: Cores.skyblue}} />
        <View style={{width: 50, height: 50, backgroundColor: Cores.steelblue}} />
      </View>
    );
};

export default AlignItemsBasics