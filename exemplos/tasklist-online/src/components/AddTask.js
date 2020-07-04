import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import commomStyle from '../commomStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }
    onDescChange = (text) => {
        this.setState({desc: text})
    }

    saveTask = (props) => {
        this.props.onSave &&
            this.props.onSave(
                {                    
                    desc: this.state.desc,
                    estimateAt: this.state.date                   
                })
        this.setState({ ...initialState })
    }

    
    renderDatePicker = () => {
        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
        let datePicker = <DateTimePicker
            value={this.state.date}
            onChange={(_/*ignorar o event*/, date) => {
                this.setState({date,showDatePicker:false})                
            }
            }
            mode='date'
            minimumDate={new Date()}
        />
        if(Platform.OS === 'android') {
            datePicker = (
                <View style={styles.dataRow}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Icon name='calendar-alt' size={30} color={styles.iconCalendar.color}/>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='fade'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgroud}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} 
                               onChangeText={this.onDescChange} 
                               value={this.state.desc}
                               maxLength={50}
                               placeholder={"Digite uma descrição"}/>
                    {this.renderDatePicker()}
                    <View style={styles.buttoms}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.buttom}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.saveTask}>
                            <Text style={styles.buttom}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.backgroud}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    backgroud: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        //flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commomStyle.fontFamily,
        backgroundColor: commomStyle.colors.today,
        color: commomStyle.colors.secudary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttoms:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    input: {
        fontFamily: commomStyle.fontFamily,        
        height: 40,
        margin: 15,        
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        padding:10,
        fontSize:16
    },
    buttom:{
        margin:20,
        marginRight:20,
        color: commomStyle.colors.today
    },
    date: {
        fontFamily: commomStyle.fontFamily,
        fontSize: 20,
        marginLeft: 15,
        paddingRight: 15
    },
    dataRow:{
        flexDirection:'row'    ,
        marginHorizontal: 15,
        borderWidth:1,
        padding:5,
        borderRadius:6,
        borderColor: '#E3E3E3',
        backgroundColor: '#FFF',
    
    },
    iconCalendar:{
        color: commomStyle.colors.today
    }


})