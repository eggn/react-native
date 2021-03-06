import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'

import * as Animatable from 'react-native-animatable';

import { getCor, hexToRgba } from '../util/Cores'

import pokeball from '../../assets/images/pokeball.png'
const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
export default function PokeItem({pokemon, onClick}) {   
    return (
        <AnimatableTouchableOpacity animation={pokemon.id%2 == 0 ? "bounceInRight" : "bounceInLeft"} iterationCount={1}            
            onPress={() => onClick(pokemon)}
            style={[styles.container, { backgroundColor: getCor(pokemon.type[0]) }]}>
            <ImageBackground source={pokeball} style={styles.backImage} imageStyle={{ opacity: 0.3 }}>
                <View style={styles.overlay}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <View style={styles.labelTypeContainer}>
                        {pokemon.type.map((tipo, index) =>
                            <View key={index} style={{
                                backgroundColor: '#fff',
                                borderRadius: 14,
                                marginTop: 4,

                            }}>
                                <View style={[styles.labelTypeOverlay, { backgroundColor: hexToRgba(getCor(pokemon.type[0]), 0.6) }]}>
                                    <Text style={styles.labelType}>
                                        {tipo}
                                    </Text>
                                </View>
                            </View>
                        )}

                    </View>
                    {pokemon.loaded && <Image style={styles.image} source={{ uri: pokemon.img }} />}
                </View>

            </ImageBackground>
        </AnimatableTouchableOpacity>
    )
    // }
}

const largura = (Dimensions.get('window').width / 2) - 24;

const styles = StyleSheet.create({
    container: {
        width: largura,
        height: largura,
        borderRadius: largura / 6,
        margin: 12,
        padding: 16
    },
    overlay: {
        //  alignItems: 'flex-end',
        //   justifyContent: 'center',      
        flex: 1,
        // backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius: largura / 6,
    },
    image: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -10,
        bottom: -5,
    },
    name: {
        fontFamily: 'Product Sans',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    backImage: {
        flex: 1,
        width: '100%',
        // resizeMode: "cover",
        justifyContent: "center",
    },
    labelType: {
        fontFamily: 'Product Sans Bold',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    labelTypeOverlay: {
        flex: 1,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelTypeContainer: {
        flexDirection: 'row',
        width: '60%',
        flexWrap: 'wrap',
        marginTop: 20,
    }
});
