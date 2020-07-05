import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
} from 'react-native'


const estatoInicial = {
    nome: '',
    idade: ''
}
export default class CadastrarAluno extends Component {
    state = {
        ...estatoInicial
    }
    validar = () => {
        let campo        
        if(!this.state.nome){
            campo = 'Nome'
        }else if(!this.state.idade){
            campo = 'Idade'
        }        
        if(campo) Alert.alert(`O campo ${campo} é obrigatório.`)
        return !campo
    }
    cadastrar = () => {
        if(!this.validar()) return false
        let { alunos } = this.props.route.params
        let matricula
        if (!alunos || alunos.length == 0) {            
            matricula = 1
        } else {
            matricula = alunos.slice(-1)[0].matricula + 1
        }        
        alunos.push({
            matricula,
            nome: this.state.nome,
            idade: this.state.idade
        })

        if (Platform.OS == 'web') {
            this.props.navigation.navigate('Alunos', {alunos})
        }else{
            Alert.alert('SUCESSO!',
                'Operação realizada com sucesso!',
                [{ text: "OK", onPress: () => this.props.navigation.navigate('Alunos', {alunos}) }])
        }
    }
    render() {       
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput  
                        maxLength={30}
                        style={styles.input} 
                        onChangeText={(texto) => this.setState({nome: texto})}
                        value = {this.state.nome} 
                        placeholder={'Digite no nome'}                      
                    />
                    <Text style={styles.label}>Idade</Text>
                    <TextInput  
                        maxLength={3}
                        style={[styles.input,{width:80}]}
                        keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                        onChangeText={(texto) => this.setState({idade: texto})}
                        value = {this.state.idade}
                        placeholder={'Idade'}
                    />
                </View>


                <View style={styles.rowButtom}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => this.cadastrar()}>
                        <Text style={styles.botaoCadastrar}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 0.9,
        marginHorizontal: 20,
        justifyContent:'center'

    },
    botaoCadastrar: {
        fontSize: 24,
        color: '#3a6ff3'
    },
    rowButtom: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopColor: '#e7e8ea',
        borderTopWidth: 1
    },
    label:{
        fontSize: 14,
        color: 'gray',
        paddingBottom: 6,
        paddingTop: 20
        
    },
    input:{
        backgroundColor:'#fff', 
        padding: 12,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
    }
});