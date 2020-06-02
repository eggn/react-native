import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

function Item ({ expressao, resultado }) {
    return (
        <View style={styles.item}>            
            <Text style={styles.texto}>{expressao}</Text>
            <Text style={styles.texto}>={resultado}</Text>
        </View>
    );
}

export default class Historico extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                
                <FlatList
                    ref={ref => this.historico = ref}
                    data={this.props.historico}
                    renderItem={({ item }) => <Item expressao={item.expressao} resultado={item.resultado} />}
                    keyExtractor={item => item.id.toString()}
                    onContentSizeChange={() => this.historico?.scrollToEnd({ animated: true })}
                />

                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: .3,
        backgroundColor: '#f0ffff',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',        
    },
    item: {        
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    texto: {
        fontSize: 22,
        color: '#d3d3d3'
    }
});