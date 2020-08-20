import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';


const width = Dimensions.get("window").width
export default function Home() {

    const [fontLoaded] = useFonts({
        Lato: require('../assets/fonts/Lato.ttf'),
    })
    if(!fontLoaded){
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#187bcd" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{fontFamily: 'Lato', color: '#555', fontSize:22, fontWeight: '400'}}>O que vamos aprender com essa app?</Text>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>Charts</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>React Hooks</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>Menu com React Navigation Tab</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>Axios</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>Promise</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.labelButton}>Fontes Personalizadas</Text>
                </View>

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    card: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#187bcd',
        margin: 8,
        width: width/2 - 24,
        height: width/2 - 24,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0.4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 5
            }
        })
    },
    row: {
        flexDirection: 'row'
    },
    labelButton:{
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Lato'
    }

})
