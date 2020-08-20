import React from 'react'
import { View, Text, StyleSheet, Image, Platform, Dimensions } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import AC from '../assets/imgs/flags/AC.png'
import AL from '../assets/imgs/flags/AL.png'
import AM from '../assets/imgs/flags/AM.png'
import AP from '../assets/imgs/flags/AP.png'
import BA from '../assets/imgs/flags/BA.png'
import CE from '../assets/imgs/flags/CE.png'
import DF from '../assets/imgs/flags/DF.png'
import ES from '../assets/imgs/flags/ES.png'
import GO from '../assets/imgs/flags/GO.png'
import MA from '../assets/imgs/flags/MA.png'
import MG from '../assets/imgs/flags/MG.png'
import MS from '../assets/imgs/flags/MS.png'
import MT from '../assets/imgs/flags/MT.png'
import PA from '../assets/imgs/flags/PA.png'
import PB from '../assets/imgs/flags/PB.png'
import PE from '../assets/imgs/flags/PE.png'
import PI from '../assets/imgs/flags/PI.png'
import PR from '../assets/imgs/flags/PR.png'
import RJ from '../assets/imgs/flags/RJ.png'
import RN from '../assets/imgs/flags/RN.png'
import RO from '../assets/imgs/flags/RO.png'
import RR from '../assets/imgs/flags/RR.png'
import RS from '../assets/imgs/flags/RS.png'
import SC from '../assets/imgs/flags/SC.png'
import SE from '../assets/imgs/flags/SE.png'
import SP from '../assets/imgs/flags/SP.png'
import TO from '../assets/imgs/flags/TO.png'

const getStateImage = uf => {
    switch (uf) {
        case 'AC':
            return AC
        case 'AL':
            return AL
        case 'AM':
            return AM
        case 'AP':
            return AP
        case 'BA':
            return BA
        case 'CE':
            return CE
        case 'DF':
            return DF
        case 'ES':
            return ES
        case 'GO':
            return GO
        case 'MA':
            return MA
        case 'MG':
            return MG
        case 'MS':
            return MS
        case 'MT':
            return MT
        case 'PA':
            return PA
        case 'PB':
            return PB
        case 'PE':
            return PE
        case 'PI':
            return PI
        case 'PR':
            return PR
        case 'RJ':
            return RJ
        case 'RN':
            return RN
        case 'RO':
            return RO
        case 'RR':
            return RR
        case 'RS':
            return RS
        case 'SC':
            return SC
        case 'SE':
            return SE
        case 'SP':
            return SP
        case 'TO':
            return TO
        default:
    }
}

const stateAbbreviation = [
    { Name: 'Acre', Abbreviation: 'AC' },
    { Name: 'Alagoas', Abbreviation: 'AL' },
    { Name: 'Amapá', Abbreviation: 'AP' },
    { Name: 'Amazonas', Abbreviation: 'AM' },
    { Name: 'Bahia', Abbreviation: 'BA' },
    { Name: 'Ceará', Abbreviation: 'CE' },
    { Name: 'Distrito Federal', Abbreviation:  'DF'},
    { Name: 'Espírito Santo', Abbreviation: 'ES' },
    { Name: 'Goiás', Abbreviation: 'GO' },
    { Name: 'Maranhão', Abbreviation: 'MA' },
    { Name: 'Mato Grosso', Abbreviation: 'MT' },
    { Name: 'Mato Grosso do Sul', Abbreviation: 'MS' },
    { Name: 'Minas Gerais', Abbreviation: 'MG' },
    { Name: 'Pará', Abbreviation: 'PA' },
    { Name: 'Paraíba', Abbreviation: 'PB' },
    { Name: 'Paraná', Abbreviation: 'PR' },
    { Name: 'Pernambuco', Abbreviation: 'PE' },
    { Name: 'Piauí', Abbreviation: 'PI' },
    { Name: 'Rio de Janeiro', Abbreviation: 'RJ' },
    { Name: 'Rio Grande do Norte', Abbreviation: 'RN' },
    { Name: 'Rio Grande do Sul', Abbreviation: 'RS' },
    { Name: 'Rondônia', Abbreviation: 'RO' },
    { Name: 'Roraima', Abbreviation: 'RR' },
    { Name: 'Santa Catarina', Abbreviation: 'SC' },
    { Name: 'São Paulo', Abbreviation: 'SP' },
    { Name: 'Sergipe', Abbreviation: 'SE' },
    { Name: 'Tocantins', Abbreviation: 'TO' }
]

const getStateName = (abbreviation) => {
    return stateAbbreviation.find(item=>item.Abbreviation === abbreviation)?.Name
}
const screenWidth = Dimensions.get("window").width

const StateCard = props => {    
    const dateString = moment(props.date).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
    const pupulacao = props.estimated_population_2019 < 1000000 ? (props.estimated_population_2019/1000).toFixed()+ ' mil' : (props.estimated_population_2019/1000000).toFixed(2)+' mi'
    return (
        <View style={styles.container}>
            <View style={styles.title}>

                <View style={styles.flagView}>
                    <Image source={getStateImage(props.state)} style={styles.imgFlag} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8 }}>
                    <Text style={styles.labelUfTitle}>{getStateName(props.state)}</Text>
                    <Text style={styles.labelDateTitle}>{dateString}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={[styles.valueBox, {backgroundColor: '#3F51B5'}]}>
                    <Text style={styles.value}>{props.confirmed}</Text>
                    <Text style={styles.label}>Confirmados</Text>
                </View>
                <View style={[styles.valueBox, {backgroundColor: '#F44336'}]}>
                    <Text style={styles.value}>{props.deaths}</Text>
                    <Text style={styles.label}>Mortes</Text>
                </View>
                <View style={[styles.valueBox, {backgroundColor: '#FF9800'}]}>
                    <Text style={styles.value}>{pupulacao}</Text>
                    <Text style={styles.label}>População</Text>
                </View>
                <View style={[styles.valueBox, {backgroundColor: '#FCDB0A'}]}>
                    <Text style={styles.value}>{(props.death_rate*100).toFixed(2)}</Text>
                    <Text style={styles.label}>% Mortes</Text>
                </View>

            </View>
        </View>
    )
}
export default StateCard

const styles = StyleSheet.create({
    container: {
        width: '90%',
       marginHorizontal: '5%',
        marginTop: 28,
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0.4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 5
            }
        })

    },
    flagView:{
        backgroundColor: '#d8eded', 
        padding: 8, 
        borderBottomEndRadius: 8, 
        borderTopStartRadius: 8 ,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0.4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 5
            }
        })
    },
    imgFlag: {
        resizeMode: 'cover',
        width: 45,
        height: 32,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    title: {
        flex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        backgroundColor: '#f0fcfc'
    },
    content: {
        backgroundColor: '#fff',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    labelUfTitle:{
        fontSize: 22,
        color: '#555'
    },
    labelDateTitle:{
        fontSize: 14,
        color: '#888'
    },
    value:{
        fontSize: 16,
        color: '#FFF'
    },
    label:{
        fontSize: 14,
        color: '#FFF'
    },
    labelDateTitle:{
        fontSize: 14,
        color: '#888'
    },
    valueBox:{
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }

})