import { Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// const server = Platform.OS === 'ios'
//     ? 'http://localhost:3000' : 'http://10.0.2.2:3000'
const server = "https://api-restful-tasks.herokuapp.com"
//const server = "http://192.168.0.16:3005"

function showError(err) {
    if(err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err.response.data}`)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

async function storeAuthToken(auth){
    await AsyncStorage.setItem('TaskListAuthToken', JSON.stringify(auth))
}

async function loadAuthToken(){
    const auth = await AsyncStorage.getItem('TaskListAuthToken')    
    return JSON.parse(auth)
}
const base64decode = input => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }

    return output;
}

async function getUser(){
    const auth = await loadAuthToken()
    const base64str = auth.accessToken.split('.')[1];
    const decodedValue = JSON.parse(base64decode(base64str));    
    const {email, sub, } = decodedValue 

    return {email, userId: sub, accessToken: auth.accessToken}

}

export { server, showError, showSuccess, getUser, storeAuthToken }