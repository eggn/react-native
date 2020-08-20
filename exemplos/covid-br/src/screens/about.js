import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
export default function About() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.label}>Desenvolvido por: </Text>
        <Text style={[styles.label, {marginBottom: 60}]}>Eduardo Nóbrega</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="twitter" color={'#187bcd'} size={20} />
          <Text style={styles.labelLink}>@EduN0brega</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="linkedin-in" color={'#187bcd'} size={20} />
          <Text style={styles.labelLink}> www.linkedin.com/in/eduardo-nobrega</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="at" color={'#187bcd'} size={20} />
          <Text style={styles.labelLink}> eduardo.nobrega@gmail.com</Text>
        </View>
        
        <Text style={styles.labelLink}>API: https://brasil.io/covid19/</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
      label:{
          fontFamily: 'Lato',
          fontSize: 22
      },
      labelLink:{
        fontFamily: 'Lato',
        fontSize: 16
    }
  })