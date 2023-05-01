import React, { useState } from 'react'
import "../style/style.css"
import Task from './Task';
import { editStatus, allTasks, newTask, editValue, editId, confirmEdit } from '../app/ToDoSlice';
import {useDispatch, useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook, faGithub, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons"

export default function ToDo() {
    const dispatch = useDispatch()
    const tasks = useSelector(allTasks)
    const edit = useSelector(editStatus)
    const editid = useSelector(editId)
    const editvalue = useSelector(editValue)
    const [value, setValue] = useState("");
    const [editTask, setEditTask] = useState('');

    const currunt_year = new Date().getFullYear()
    
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

        <footer className='todo__credentials'>
          <div><span>© Abdelrahman Ahmed / {currunt_year}</span></div>
          <div className='todo__media'>
            <a href="https://web.facebook.com/profile.php?id=100005933071217" target='_blank'>
              <FontAwesomeIcon icon={faFacebook} beat/>
            </a>
            <a href="https://twitter.com/Abdo_Megahed03" target='_blank'>
              <FontAwesomeIcon icon={faTwitter} beat/>
            </a>
            <a href="https://www.linkedin.com/in/abdelrahman-ahmed-saad-b74b35260/" target='_blank'>
              <FontAwesomeIcon icon={faLinkedinIn} beat/>
            </a>
            <a href="https://github.com/Abdo-Ahmed-cs" target='_blank'>
              <FontAwesomeIcon icon={faGithub} beat/>
            </a>
          </div>
        </footer>
    </section>
  )
}
