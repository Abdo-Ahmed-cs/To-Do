import React from 'react'
import "../style/style.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faPenToSquare, faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import { editTask, removeTask,  toggleDone} from '../app/ToDoSlice'
import { useDispatch } from 'react-redux'

export default function Task({id, value, isDone}) {
  const dispatch = useDispatch()

  function handleEdit(id, value){
    dispatch(editTask({id, value}))
  }

  function handleRemove(id){
    dispatch(removeTask(id))
  }

  function Done(id){
    dispatch(toggleDone(id))
  }
  return (
    <div className={`todo__task ${isDone ? "todo__task--done": ""}`}>
        <span>{value}</span>
        <div className='todo__icons'>
            <FontAwesomeIcon icon={faCircleCheck} className='todo__icon' onClick={() => Done(id)}/>
            <FontAwesomeIcon icon={faPenToSquare} className='todo__icon' onClick={() => handleEdit(id, value)}/>
            <FontAwesomeIcon icon={faTrash} className='todo__icon' onClick={() => handleRemove(id)}/>
        </div>
    </div>
  )
}
