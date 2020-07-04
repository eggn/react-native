import React, { Component } from 'react'
import {
    ImageBackground,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native'
import backgroudImage from '../../assets/imgs/login.jpg'
import commomStyles from '../commomStyles'
import { loadFontsExpo } from '../util/expoFonts'
import AuthInput from '../components/AuthInput'

export default class Auth extends Component {
    state = {
        fontsLoaded: false,
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        isNewUser: false
    }

    componentDidMount() {
        loadFontsExpo().then(() => {
            this.setState({ fontsLoaded: true });
        })
    }

    signinOrSignup = () => {
        if(this.state.isNewUser){
            Alert.alert('Sucesso!', 'Criar conta')
        }else{
            Alert.alert('Sucesso!', 'Logar')
        }
    }

    render() {
        if (!this.state.fontsLoaded) {
            return (
                <View style={styles.isLoadingView}>
                    <ActivityIndicator size={'large'} color="#fff" />
                </View>
            )
        }
        return (

            <ImageBackground source={backgroudImage}
                style={styles.backgroud}>
                <Text style={styles.title}>Task</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.isNewUser ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {
                        this.state.isNewUser &&
                        <AuthInput placeholder={'Nome'} icon={'user'}
                            value={this.state.namr}
                            //style={styles.input}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    }
                    <AuthInput placeholder={'E-mail'} icon={'at'}
                        value={this.state.email}
                        // style={styles.input}
                        onChangeText={(email) => this.setState({ email: email.toLowerCase() })}
                    />
                    <AuthInput placeholder={'Senha'} icon={'lock'}
                        value={this.state.password}
                        secureTextEntry={true}
                        //style={styles.input}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    {
                        this.state.isNewUser &&
                        <AuthInput placeholder={'Confirmação de senha'} icon={'asterisk'}
                            value={this.state.confirmPassword}
                            secureTextEntry={true}
                          //  style={styles.input}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        />
                    }

                    <TouchableOpacity style={styles.buttom}>
                        <Text style={styles.buttomText}>{this.state.isNewUser ? 'Registrar' : 'Entrar'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttom, { backgroundColor: 'rgba(100,100,100,0.5)' }]}
                        onPress={() => this.setState({ isNewUser: !this.state.isNewUser })}
                    >
                        <Text style={styles.buttomText}>
                            {this.state.isNewUser ? 'Já tenho conta' : 'Ainda não tenho conta'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secudary,
        fontSize: 70,
        marginBottom: 10
    },
    subTitle:{
        color: '#FFF',
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },
    isLoadingView: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#FFF',
        marginVertical: Platform.OS == 'ios' ? 15 : 10,
        borderRadius: 5,
        color: 'black',
        padding: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
        width: '90%',
        borderRadius: 10
    },
    buttom: {
        backgroundColor: '#080',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        borderRadius: 5
    },
    buttomText: {
        color: '#fff'
    },
   
})