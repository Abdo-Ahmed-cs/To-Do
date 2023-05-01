import React, { useState } from 'react'
import "../style/style.css"
import Task from './Task';
import { editStatus, allTasks, newTask, editValue, editId, confirmEdit } from '../app/ToDoSlice';
import {useDispatch, useSelector} from "react-redux"

export default function ToDo() {
    const dispatch = useDispatch()
    const tasks = useSelector(allTasks)
    const edit = useSelector(editStatus)
    const editid = useSelector(editId)
    const editvalue = useSelector(editValue)
    const [value, setValue] = useState("");
    const [editTask, setEditTask] = useState('');
    
    const tasksElements = tasks.map(task => (
        <Task key={task.id} id={task.id} value={task.value} isDone={task.isDone}/>
    ))

    function addTask(e){
        e.preventDefault();
        dispatch(newTask(value))
        setValue((prev) => "")
    }

    function taskValueChange(e) {
        setValue((prev) => e.target.value)
    }

    function handleEditChange(e){
        setEditTask((prev) => e.target.value)
    }

    function handleEditTask(e){
        e.preventDefault()
        dispatch(confirmEdit(editTask))
        setEditTask((prev) => "")
    }
    
  return (
    <section className='todo'>
        <div className='todo__container'>
            <h1 className='todo__header'>Git Things Done!</h1>
            <div className="todo__forms">
                <form onSubmit={addTask} action='add task' className='todo__adding'>
                    <input type="text" value={value} onChange={taskValueChange}/>
                    <button className='todo__btn' disabled={value === "" ? true: false}>Add Task</button>
                </form>
                
                {edit &&<form onSubmit={handleEditTask} action='submit' className='todo__editing'>
                    <input type="text" value={editTask} onChange={handleEditChange}/>
                    <button type='submit' className='todo__btn' disabled={editTask === "" ? true: false}>Edit Task</button>
                </form>}

            </div>
            <div className='todo__tasks'>
                {tasksElements}
            </div>
        </div>
    </section>
  )
}
