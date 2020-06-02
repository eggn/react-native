import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    Platform,
    TouchableOpacity,
    Alert,
    Dimensions,
    Animated
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { SwipeListView } from 'react-native-swipe-list-view';

import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commomStyles'
import Task from '../components/TaskExpo'
import AddTask from '../components/AddTask'

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
            //showAddTask: false,
            //showDoneTask: true,
            //fontsLoaded: false,
            //tasks: [
                // {
                //     id: Math.random(),
                //     desc: 'Assistir primeira aula de React-Native',
                //     estimateAt: new Date(),
                //     doneAt: new Date()
                // }, {
                //     id: Math.random(),
                //     desc: 'Ler Livro de React-Native',
                //     estimateAt: new Date(),
                //     doneAt: null
                // }
                // , {
                //     id: Math.random(),
                //     desc: 'Ler Livro de React-Native',
                //     estimateAt: new Date(),
                //     doneAt: null
                // }
           // ]

           ...initialState
        }
    }
    //Apenas pra quem ta usando o expo
    async loadFontsAsync() {
        await Font.loadAsync({ 'Lato': require('../../assets/fonts/Lato.ttf') });
        this.setState({ fontsLoaded: true });
    }
    componentDidMount() {        
        //this.loadFontsAsync();
        this.loadState();
    }
    
    async saveState () {       
        await AsyncStorage.setItem('TaskListState', JSON.stringify(this.state))
    }

    async loadState() {
        const stateStr = await AsyncStorage.getItem('TaskListState')
        const state = JSON.parse(stateStr) || initialState
        state.fontsLoaded =  false
        this.setState(state, this.loadFontsAsync)
    }

    renderTask = (task) => {
        

        // if (task.doneAt && !this.state.showDoneTask){
        //     return null
        // }else{
            return (
                // <Task desc={task.desc} doneAt={task.doneAt} estimateAt={task.estimateAt}/>
                <Task {...task} toggleTask={this.toggleTask} deleteTask={this.deleteTask} />
            )

       // }
    }

    toggleFilter = () => {
        this.setState({ showDoneTask: !this.state.showDoneTask }, this.saveState)
    }

    toggleTask = taskId => {        
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.saveState)
    }


    saveTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }
        const tasks = this.state.tasks
        newTask.id = Math.random()
        newTask.doneAt = null
        tasks.push(newTask)
        this.setState({ tasks: tasks, showAddTask: false }, this.saveState)
    }

    deleteTask = (rowMap, rowKey) => {       
       // if (rowMap) this.closeSwipeItem(rowMap, rowKey)
        let tasks = this.state.tasks.filter(item => item.id != rowKey)
        this.setState({ tasks },this.saveState)
        
    };

    // closeSwipeItem = (rowMap, rowKey) => {
    //     if (rowMap[rowKey]) {
    //         rowMap[rowKey].closeRow();
    //     }
    // };


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


    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')        
        if (this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                    <ImageBackground source={todayImage} style={styles.backgroud}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTask ? "eye" : "eye-slash"} size={25} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskContainer}>
                        {/* <Task desc="Comprar Livro" estimateAt={new Date()} doneAt={new Date()}></Task>
                        <Task desc="Ler Livro" estimateAt={new Date()} doneAt={null}></Task> */}
                        {/* <FlatList data={this.state.tasks}
                                  keyExtractor={task => `${task.id}`}
                                  renderItem={({item}) => this.renderTask(item)}/> */}

                        <SwipeListView
                            //disableRightSwipe
                            data={this.state.showDoneTask ? this.state.tasks: this.state.tasks.filter( item => item.doneAt == null)}
                            renderItem={({item})=>this.renderTask(item)}
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
                    <TouchableOpacity style={styles.addTaskButton}
                        onPress={() => this.setState({ showAddTask: true })}
                        activeOpacity={0.7}>
                        <Icon name='plus' size={25} color={'#FFF'} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return <AppLoading />;
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
        justifyContent: 'flex-end',
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
        flex:1,
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