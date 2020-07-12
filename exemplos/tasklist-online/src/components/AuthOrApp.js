import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

import axios from 'axios'
import {getUser} from '../commom/'

export default class AuthOrApp extends Component {

    componentDidMount = async () => {        
        let userData = null
        
        try {
            userData = await getUser()
        } catch(e) {
            // userData está inválido
        }
        
        if(userData && userData.accessToken) {            
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`
            this.props.navigation.navigate('Home')
        } else {
            console.log('não autenticado')
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})