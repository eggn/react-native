import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,    
    Platform,
    TouchableOpacity,
    Alert,
    Dimensions,    
    ActivityIndicator,
    BackHandler
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { SwipeListView } from 'react-native-swipe-list-view';

import todayImage from '../../assets/imgs/today.jpg'
//incluir após usar o drawer navigator
import tomorowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

import commonStyles from '../commomStyles'
import Task from '../components/TaskExpo'
import AddTask from '../components/AddTask'
import * as tasksServices from '../services/tasksServices'
import { loadFontsExpo } from '../util/expoFonts'

const initialState = {
    showAddTask: false,
    showDoneTask: true,
    fontsLoaded: false,
    tasks: []
}
export default class TaskList extends Component {
    constructor() {
        super()
        this.state = {
            ...initialState
        }
    }

    loadFonts() {
        loadFontsExpo().then(() => {
            this.setState({ fontsLoaded: true });
        })
    }
    componentDidMount() {  
        BackHandler.addEventListener('hardwareBackPress', this.sair);                
        this.loadState();
        //Mudança 2 para integração com o backend
        this.loadTasks();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.sair);
    }

    sair = () => {
        Alert.alert(
            'Sair do Aplicativo',
            'Deseja sair do app?',
            [
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false });
        return true;
    }

    loadTasks = async () => {        
        const tasks = await tasksServices.loadTasks(this.props.daysAhead)  
        this.setState( { tasks: tasks } )
    }

    async saveState() {
        //Mudança 1 para integração com o backend
        //await AsyncStorage.setItem('TaskListState', JSON.stringify(this.state))
        await AsyncStorage.setItem('TaskListState', JSON.stringify({
            showAddTask: this.state.showAddTask
        }))
    }

    async loadState() {
        const stateStr = await AsyncStorage.getItem('TaskListState')
        const state = JSON.parse(stateStr) || initialState
        state.fontsLoaded = false
        this.setState(state, this.loadFonts())
    }

    renderTask = (task) => {
        return (
            <Task {...task} toggleTask={this.toggleTask} deleteTask={this.deleteTask} />
        )
    }

    toggleFilter = () => {
        this.setState({ showDoneTask: !this.state.showDoneTask }, this.saveState)
    }

    toggleTask = async taskId => {
        //Mudança 6 integração com backend
        // const tasks = [...this.state.tasks]
        // tasks.forEach(task => {
        //     if (task.id === taskId) {
        //         task.doneAt = task.doneAt ? null : new Date()
        //     }
        // })

        //this.setState({ tasks }, this.saveState)

        const toggledTask = this.state.tasks.find(task => task.id === taskId)
        await tasksServices.toggleTask(toggledTask)
        this.loadTasks()

    }


    saveTask = async (newTask) => {        
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }
        //Mudança 3 para integração com o backend
        //const tasks = this.state.tasks
        //newTask.id = Math.random()
        //newTask.doneAt = null
        //tasks.push(newTask)
        //this.setState({ tasks: tasks, showAddTask: false }, this.saveState)
        await tasksServices.addTask(newTask)
        this.setState({ showAddTask: false }, this.loadTasks)

    }

    deleteTask = (rowMap, rowKey) => {      
        let tasks = this.state.tasks.filter(item => item.id != rowKey)
        this.setState({ tasks }, this.saveState)
    };

    renderRightAction = (data, rowMap) => (
        <View style={styles.backSwipe}>
            <TouchableOpacity
                style={[styles.backRightBtn]}
                onPress={() => this.deleteTask(rowMap, data.item.id)}
            >
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        </View>
    );

    onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (value > Dimensions.get('window').width - 1) {
            this.deleteTask(null, key)
        }
    };

    getBackgroudImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        //console.log('RENDER ', this.props.daysAhead)
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                    <ImageBackground source={this.getBackgroudImage()} style={styles.backgroud}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                                <Icon name={this.state.showDoneTask ? "bars" : "eye-slash"} size={25} color={'#FFF'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTask ? "eye" : "eye-slash"} size={25} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            {/* Mudança após o Drawer */}
                            {/* <Text style={styles.title}>Hoje</Text> */}
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskContainer}>  
                        <SwipeListView                            
                            //Mudança integração com backend doneat == false
                            data={this.state.showDoneTask ? this.state.tasks : this.state.tasks.filter(item => item.doneAt == false)}
                            renderItem={({ item }) => this.renderTask(item)}
                            renderHiddenItem={this.renderRightAction}
                            rightOpenValue={-70}
                            leftOpenValue={Dimensions.get('window').width}
                            onSwipeValueChange={this.onSwipeValueChange}
                            keyExtractor={task => `${task.id}`}
                        />
                    </View>
                    <AddTask isVisible={this.state.showAddTask}
                        onCancel={() => this.setState({ showAddTask: false })}
                        onSave={this.saveTask} />
                        {/* mudar o color após o drawer */}
                    <TouchableOpacity style={[styles.addTaskButton, {backgroundColor: this.getColor()}]}
                        onPress={() => this.setState({ showAddTask: true })}
                        activeOpacity={0.7}>
                        <Icon name='plus' size={25} color={'#FFF'} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.isLoadingView}>
                    <ActivityIndicator size={'large'} color="#fff" />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroud: {
        flex: .3
    },
    taskContainer: {
        flex: .7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secudary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secudary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: "row",
        //mudar após incluir drawer
        // justifyContent: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 35 : 30
    },
    addTaskButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 5
            }
        }),
    },
    backRightBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        backgroundColor: 'red',
    },

    backSwipe: {
        alignItems: 'flex-end',
        backgroundColor: 'red',
        flex: 1,
    },
});