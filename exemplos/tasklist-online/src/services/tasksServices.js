import axios from 'axios'
import { server, showError, getUser } from '../commom'
import moment from 'moment'


export const loadTasks = async (daysAhead) => {    
    try{
        const { userId } = await getUser()
        const maxDate = moment().add({ days: daysAhead}).format("YYYY-MM-DDT23:59:59-03:00")
        const url = `${server}/tasks?userId=${userId}&_sort=estimateAt&_order=asc&estimateAt_lte=${maxDate}`        
        const res = await axios.get(url)        
        return res.data
    }catch(e){
        showError(e)
    }
}

export const addTask = async (newTask) => {
    try{
        const { userId } = await getUser()
        const url = `${server}/tasks`
        await axios.post(url, {
            desc: newTask.desc,
            estimateAt: moment(newTask.estimateAt).format("YYYY-MM-DDT23:59:59-03:00"),
            doneAt: false,
            userId: parserInt(userId)
        })                
    }catch(e){
        showError(e)
    }
} 

export const toggleTask = async (toggledTask) => {
    try{
        const url = `${server}/tasks/${toggledTask.id}`
        await axios.patch(url, { 
            doneAt: toggledTask.doneAt ? false : new Date(),
        })  
    }catch(e){
        showError(e)
    }
} 

export const fetchUser = async () => {    
    try{
        const { userId } = await getUser()
        const url = `${server}/users/${userId}`
        const res = await axios.get(url)        
        return res.data
    }catch(e){
        showError(e)
    }
}