import { Alert, Platform } from 'react-native'

// const server = Platform.OS === 'ios'
//     ? 'http://localhost:3000' : 'http://10.0.2.2:3000'
//const server = "https://api-restful-tasks.herokuapp.com"
const server = "http://192.168.0.6:3005"

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

export { server, showError, showSuccess }