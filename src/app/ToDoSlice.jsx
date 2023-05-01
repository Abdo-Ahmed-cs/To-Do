import {createSlice, nanoid} from "@reduxjs/toolkit"

function createTask (value){
    return {
        id: nanoid(),
        value: value,
        isDone: false,
    }
}

const initialState = {
    tasks: [],
    editStatus: false,
    taskId: "",
    taskValue: "",
} 
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        newTask: (state, action) => {
            state.tasks.push(createTask(action.payload));
        },
        editTask: (state, action) => {
            state.editStatus = true;
            state.taskId = action.payload.id;
            state.taskValue = action.payload.value;
        },
        confirmEdit: (state, action) => {
            state.tasks = state.tasks.map(task => (
                task.id === state.taskId ? {...task, value: action.payload} : task
            ))
            state.editStatus = false
        },
        changeEditValue: (state, action) => {
            state.editValue = action.payload
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        toggleDone: (state, action) => {
            state.tasks = state.tasks.map(task => (
                task.id === action.payload ? {...task, isDone: !task.isDone} : task
            )) 
        }
    }
})

export default todoSlice.reducer
export const {newTask, editTask, removeTask, confirmEdit, changeEditValue, toggleDone} = todoSlice.actions

export const allTasks = (state) => (state.todo.tasks)
export const editStatus = (state) => (state.todo.editStatus)
export const editValue = (state) => (state.todo.taskValue)
export const editId = (state) => (state.todo.taskid)
