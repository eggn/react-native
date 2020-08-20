import React, {Component} from 'react'
import {View, FlatList, StyleSheet, ActivityIndicator, Text} from 'react-native'
import StateCard from '../components/StateCard'
import axios from 'axios';
//import {acumulatedDataByState} from '../data/data'
export default class CasesByStateView extends Component {
    state = {
        data: null
    }
    componentDidMount(){
        axios.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&place_type=state`)
        .then(res => {
          const data = res.data;          
          this.setState({ data });
        })

    }

    renderDataList(data){
        if(data){            
            return(               
                <FlatList
                    data={data.results}
                    renderItem={({ item }) => {                        
                        return <StateCard {...item} />
                    }}
                    keyExtractor={item => item.state}
                />
                
            )
        }else{
            return (
                <View style={{flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#187bcd"/>
                </View>
            )
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>                    
                        <Text style={{fontSize: 24, color: '#fff'}}>
                            Casos de COVID-19 no Brasil
                        </Text>
                        <Text style={{fontSize: 8, color: '#fff', marginHorizontal: 60}}>
                            Fonte: Secretarias Estaduais de Saúde/Consolidação por Brasil.IO. 
                        </Text>
                        <Text style={{fontSize: 8, color: '#fff', marginHorizontal: 60}}>
                            *Nota: dados sendo consolidados para os últimos dias.
                        </Text>
                </View>
               {this.renderDataList(this.state.data)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,        
        justifyContent: 'flex-start',

    },
    header:{
        height:'20%',
        backgroundColor:'#187bcd',
        alignItems: 'center',
        justifyContent: 'center'
    }
})