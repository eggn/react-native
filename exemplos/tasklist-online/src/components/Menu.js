import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commomStyles'
import {fetchUser} from '../services/tasksServices'

function Menu(props) {
    const [user, setUser] = useState('');

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('TaskListState')
        AsyncStorage.removeItem('TaskListAuthToken')
        //BackHandler.exitApp()
        props.navigation.navigate('Auth')
    }

    const exit = () => {
        Alert.alert(
            'Sair do Aplicativo',
            'Deseja sair do app?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: () =>  logout()},
            ],
            { cancelable: false });
        return true;
    }

    useEffect(() => {
        async function getUser() {            
            const loadedUser = await fetchUser()
            setUser(loadedUser)
        }
        if (!user) {            
            getUser()
        }
    }, []);    
    
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: user?.email,
                        secure: true,
                        parameters: { "size": "200", "d": `mm` },
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {user?.name}
                    </Text>
                    <Text style={styles.email}>
                        {user?.email}
                    </Text>
                </View>
            </View>

            <DrawerItemList {...props} />
            <View style={{height:1, width:'100%', backgroundColor:'lightgray'}}>

            </View>
            <DrawerItem
                {...props}
                icon={({ color, size }) => (
                    <Icon name='sign-out' size={size} color={color} />
                )}
                label="Sair"
                onPress={exit}
            />            
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222'
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText,
        marginBottom: 5,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10,
    },
    logoutIcon: {
        marginLeft: 20,
        marginBottom: 10
    }
})

export default Menu
