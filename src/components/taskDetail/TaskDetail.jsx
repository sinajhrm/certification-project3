import React from 'react'
import './TaskDetail.css'

// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import Subtask from '../subtask/Subtask'

import { v4 as uuid } from 'uuid'

/**
 *
 * @param {Types.TaskDetailParams} props
 */
export default function TaskDetail ({ task }) {
    // const urlParams = useParams()
    // const task = useLoaderData()

    return (
        <div className='taskDetail-container'>
            <h1>{task.title}</h1>
            <hr/>
            <ul>
                {task.subtasks.map((subtaskItem) => {
                    return (
                        <li key={uuid()}>
                            <Subtask editMode={subtaskItem.editing} subtaskTitle={subtaskItem.title}/>
                        </li>)
                })}
            </ul>
        </div>
    )
}
