import React, {Component} from 'react';
import Navegador from './src/Navegador'
import BoasVindas from './src/screens/BoasVindas'


export default class App extends Component {
  state = {
    entrar: false
  }

  entrarClick = () =>{
    this.setState({entrar:true})
  }
  render(){
    return (    
        this.state.entrar ? <Navegador /> : <BoasVindas entrarClick={()=>this.entrarClick()}/>
    )
  }
}


