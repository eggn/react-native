import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function FlexBasiso() {
  return (
    <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.middle}/>
      <View style={styles.bottom}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  top:{
    flex:1,
    backgroundColor: 'red'
  },
  middle:{
    flex:2,
    backgroundColor: 'green'
  },
  bottom:{
    flex:3,
    backgroundColor: 'yellow'
  }
});
