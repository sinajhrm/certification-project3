import React from 'react'
import './TaskDetail.css'

// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import Subtask from '../subtask/Subtask'

// import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { addUpdateSubtaskToTask } from '../../feature/tasksSlice'
import { v4 as uuid } from 'uuid'

export default function TaskDetail () {
    const urlParams = useParams()
    // const task = useLoaderData()

    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.task.value)

    if (tasks.length === 0) {
        return (<Navigate to={'/'}/>)
    }
    const task = tasks.find((task) => task.id === urlParams.taskId)

    const handleAddSubtask = () => {
        dispatch(addUpdateSubtaskToTask(
            {
                subtask: {
                    id: uuid(),
                    title: '',
                    due_date: '',
                    status: '',
                    priority: ''
                },
                taskId: urlParams.taskId
            }
        ))
    }

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
            <div>
                <button onClick={handleAddSubtask}>Add Subtask</button>
            </div>
        </div>
    )
}
