import React from 'react'
import './TaskDetail.css'

// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import Subtask from '../subtask/Subtask'

// import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

export default function TaskDetail () {
    const urlParams = useParams()
    // const task = useLoaderData()

    const tasks = useSelector((state) => state.task.value)

    if (tasks.length === 0) {
        return (<Navigate to={'/'}/>)
    }
    const task = tasks.find((task) => task.id === urlParams.taskId)

    return (
        <div className='taskDetail-container'>
            <h1>{task.title}</h1>
            <hr/>
            <ul>
                {task.subtasks.map((subtaskItem) => {
                    return (
                        <li key={subtaskItem.id}>
                            <Subtask editMode={false} subtask={subtaskItem} taskId={urlParams.taskId}/>
                        </li>)
                })}
            </ul>
        </div>
    )
}
