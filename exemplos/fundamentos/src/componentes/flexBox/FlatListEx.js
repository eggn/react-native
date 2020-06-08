import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Platform } from 'react-native';
import Constants from 'expo-constants';

const DADOS = [
  {
    id: '1',
    nome: 'Fabiano',
    nota: 10.0
  },
  {
    id: '2',
    nome: 'Maria',
    nota: 9.5
  },
  {
    id: '3',
    nome: 'Zezinho',
    nota: 6.5
  },
  {
    id: '4',
    nome: 'Jose',
    nota: 8.0
  },
  
];

function Item({ nome, nota }) {
  return (
    <View style={styles.item}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={[styles.nota, {color: nota < 7 ? 'orange' : 'green' }]}>{nota}</Text>
    </View>
  );
}

export default function FlatListEx() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DADOS}
        renderItem={({ item }) => <Item nome={item.nome} nota={item.nota} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f6f5f5',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#6c6b6b',
    borderWidth: 1,
    borderRadius:5,
    ...Platform.select({
      ios: {
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 1
      },
      android: {
          elevation: 5
      }
  }),
  },
  nome: {
    fontSize: 32,
  },
  nota: {
    fontSize: 24,
    fontStyle: 'italic'
  }
});
