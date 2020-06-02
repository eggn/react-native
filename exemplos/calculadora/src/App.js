import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Teclado from './componentes/Teclado'
import Display from './componentes/Display'
import Historico from './componentes/Historico'
const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
const operadores = ['+', '-', '*', '/', '%']
const acoes = ['C', 'CE', '<<', '=']
export default class App extends Component {
    state = {
        tecla: '',
        displayExpressao: '',
        displayResultado: '0',
        igualPressionado: false,
        historico: []
    }
    isNumero = digito => {
        return numeros.includes(digito)
    }
    isOperador = digito => {
        return operadores.includes(digito)
    }
    isAcao = digito => {
        return acoes.includes(digito)
    }
    hasOperador = _ => {
        return operadores.some((d) => this.state.displayExpressao.includes(d))
    }
    hasAcoes = _ => {
        return acoes.some((d) => this.state.displayExpressao.includes(d))
    }
    tecladoClicado = tecla => {
        
        if (this.isAcao(tecla)) {
            this.tratarAcao(tecla);

        }
        else if (this.isNumero(tecla)) {

            this.tratarNumero(tecla);

        } else if (this.isOperador(tecla)) {
            if (this.isOperador(this.state.displayExpressao.slice(-1))) {
                return //ignora se ja tiver um operador na agulha
            }
            this.tratarOperador(tecla);
        }

    }

    tratarOperador(tecla) {
        let displayResultado;
        let displayExpressao;
        let historico = [...this.state.historico];
        if (tecla === '%') {
            const ar = this.state.displayExpressao.split(/[*+-/]/);
            const ultimoElemento = ar.slice(-1)[0];
            displayExpressao = this.state.displayExpressao.slice(0, -(ultimoElemento.length));
            displayExpressao = displayExpressao.concat(ultimoElemento / 100);
            displayResultado = eval(displayExpressao);
        }
        else {
            if (this.state.igualPressionado) {
                historico.push({ id: Math.random(), expressao: this.state.displayExpressao, resultado: this.state.displayResultado });
                displayExpressao = Number(this.state.displayResultado).toString() + tecla;
                displayResultado = this.state.displayResultado;
            }
            else {
                displayExpressao = this.state.displayExpressao + tecla;
                displayResultado = Number(this.state.displayResultado).toString();
            }
        }
        this.setState({
            displayExpressao,
            displayResultado,
            igualPressionado: false,
            historico,
            tecla
        });
    }

    tratarNumero(tecla) {
        let displayExpressao = this.state.displayExpressao + tecla;
        let displayResultado;
        let historico = [...this.state.historico];
        if (this.hasOperador() && !this.state.igualPressionado) {
            displayResultado = eval(this.state.displayExpressao.concat(tecla));
        }
        else {
            if (this.state.igualPressionado) {
                historico.push({ id: Math.random(), expressao: this.state.displayExpressao, resultado: this.state.displayResultado });
                displayResultado = tecla;
                displayExpressao = tecla;
            }
            else {
                displayResultado = this.state.displayResultado === '0' ? tecla : this.state.displayResultado + tecla;
            }
        }
        this.setState({
            displayExpressao,
            displayResultado,
            historico,
            igualPressionado: false,
            tecla
        });
    }

    tratarAcao(tecla) {
        if (tecla === 'C') {
            this.setState({ displayExpressao: '', displayResultado: '0', igualPressionado: false });
            //return
        }
        else if (tecla === 'CE') {
            this.setState({ displayExpressao: '', displayResultado: '0', historico: [], igualPressionado: false });
            //return
        }
        else if (tecla == '<<') {
            let displayExpressao = this.state.displayExpressao.slice(0, -1);
            let displayResultado;
            try {
                if (!!displayExpressao) {
                    displayResultado = eval(displayExpressao);
                }
                else {
                    displayResultado = '0';
                }
            }
            catch (e) {
                displayResultado = eval(displayExpressao.slice(0, -1));
            }
            this.setState({
                displayExpressao,
                displayResultado,
                tecla
            });
        }
        else if (tecla === '=') {
            this.setState({ igualPressionado: true });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Historico historico={this.state.historico}/>
                <Display displayExpressao={this.state.displayExpressao} displayResultado={this.state.displayResultado} igualPressionado={this.state.igualPressionado} />
                <Teclado onClick={this.tecladoClicado} />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
