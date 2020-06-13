import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
    

} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

const alunos = [
    {
        matricula: 11111,
        nome: "Fulando de tal",
        idade: 20
    },
    {
        matricula: 22222,
        nome: "Beltrano de tal",
        idade: 45
    },
    {
        matricula: 33333,
        nome: "Cicrano de tal",
        idade: 34
    },
  
  ]

const initialState = {alunos}

export default class ListarAluno extends Component {
    state = {
       ...initialState
    }
    remover = (item) =>{         
       let alunosAtualizado = this.state.alunos.filter(aluno => aluno.matricula != item.matricula)
       this.setState({alunos: alunosAtualizado})
    }

    renderItem = (item) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.tituloItem}>
                    <Text style={styles.labelTituloItem}>Aluno</Text>
                    <TouchableOpacity style={styles.trash} onPress={()=>this.remover(item)}>
                        <Icon name='trash' size={25} color='#e7e8ea' />
                    </TouchableOpacity>
                </View>
                <View style={styles.conteudoItem}>
                    <Text style={styles.label}>Matrícula</Text>
                    <Text style={styles.valor}>{item.matricula}</Text>
                    <Text style={styles.label}>Nome</Text>
                    <Text style={styles.valor}>{item.nome}</Text>
                    <Text style={styles.label}>Idade</Text>
                    <Text style={styles.valor}>{item.idade}</Text>
                </View>
            </View>
        )
    }   

    componentDidUpdate(){
        console.log('componentDidUpdate', this.props.route.params?.alunos, this.state.alunos)
        if(this.props.route.params?.alunos && this.state.alunos.length < this.props.route.params?.alunos.length ){
            console.log('componentDidUpdate2', this.props.route.params?.alunos, this.state.alunos)
            this.setState({alunos: this.props.route.params.alunos})  
            this.props.navigation.setParams({alunos: null})
        } 
    }

    render() {
        const { navigation } = this.props                
        return (
            <View style={styles.container}>
                <View style={{ flex: .9 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <FlatList
                            data={this.state.alunos}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={item => item.matricula.toString()} />
                    </View>
                </View>
                <View style={styles.rowButtom}>
                    <TouchableOpacity style={{ marginRight: 20 }} 
                                      onPress={() => navigation.navigate('Cadastrar', 
                                        { alunos: [...this.state.alunos] })}>
                        <Text style={styles.botao}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 14,
        color: 'gray'

    },
    valor: {
        fontSize: 16,
        fontWeight: '400'
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 6

    },
    tituloItem: {
        flex: .2,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a6ff3',
        padding: 12,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6
    },
    conteudoItem: {
        flex: .8,
        padding: 12
    },
    labelTituloItem: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '400'
    },
    rowButtom: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopColor: '#e7e8ea',
        borderTopWidth: 1
    },
    botao: {
        fontSize: 24,
        color: '#3a6ff3'
    },
    trash:{
        position:'absolute', 
        right:12, 
        top:12
    }
});