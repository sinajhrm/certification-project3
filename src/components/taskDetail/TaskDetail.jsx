import React from 'react'
import './TaskDetail.css'

// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import Subtask from '../subtask/Subtask'

import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function TaskDetail () {
    const urlParams = useParams()
    // const task = useLoaderData()

    const tasks = useSelector((state) => state.task.value)
    const task = tasks.filter((task) => task.id === urlParams.taskId)[0]

    return (
        <div className='taskDetail-container'>
            <h1>{task.title}</h1>
            <hr/>
            <ul>
                {task.subtasks.map((subtaskItem) => {
                    return (
                        <li key={uuid()}>
                            <Subtask editMode={false} subtask={subtaskItem}/>
                        </li>)
                })}
            </ul>
        </div>
    )
}
