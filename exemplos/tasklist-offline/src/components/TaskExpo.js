import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import 'moment/locale/pt-br'

import commomStyle from '../commomStyles'


function renderCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={20} color='#FFF' />
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const renderRightAction = () =>{
    return (
        <TouchableOpacity style={styles.right}
            onPress={() => props.onDelete && props.onDelete(props.id)}>
            <Icon name="trash" size={30} color='#FFF' />
        </TouchableOpacity>
    )
}

const renderLeftAction = () => {
    return (
        <View style={styles.left}>
            <Icon name="trash" size={20} color='#FFF'
                style={styles.excludeIcon} />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )
}
// export default (props) => {
//     const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}
//     const date = props.doneAt ? props.doneAt : props.estimateAt
//     const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

//     return (
                            
            // <View style={styles.container}>
            //     <View style={styles.checkContainer}>
            //         <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
            //             {renderCheckView(props.doneAt)}
            //         </TouchableWithoutFeedback>
            //     </View>
            //     <View style={styles.contentContainer}>
            //         <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            //         {/* <Text style={styles.date}>{props.estimateAt + ""}</Text> */}
            //         <Text style={styles.date}>{formattedDate}</Text>
            //         {/* <Text>{props.doneAt + ""}</Text> */}
            //     </View>
            
            // </View>
       
//     )
// }
export default (props) => {               
    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    
    return (

        <View style={styles.container}>
            <View style={styles.checkContainer}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    
                    {renderCheckView(props.doneAt)}
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.contentContainer}>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>                
                <Text style={styles.date}>{formattedDate}</Text>                
            </View>

        </View>


    )
}


const styles = StyleSheet.create({
    container: {      
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        
    },    
    checkContainer: {
        flex: .2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    contentContainer: {
        flex: .8,
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4B7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.mainText,
        fontSize: 18
    },
    date: {
        fontFamily: commomStyle.fontFamily,
        color: commomStyle.colors.subText,
        fontSize: 16
    },
    
    
})