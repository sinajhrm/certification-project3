// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import React from 'react'
import './TasksPage.css'
import Task from '../task/Task'
import { useSelector } from 'react-redux'

export default function TasksPage () {
    const tasks = useSelector((state) => state.task.value)

    return (
        <div className='tasksPage-container'>
            <ul>
                {tasks.map((taskItem) => {
                    return (
                        <li key={taskItem.id}>
                            <Task task={taskItem} editMode={taskItem.editing} />
                        </li>)
                })}
            </ul>
        </div>
    )
}
