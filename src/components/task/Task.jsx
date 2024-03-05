import React, { useState } from 'react'
import './Task.css'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types.js'

/**
 *
 * @param {Types.TaskComponentParams} props
 * @returns
 */
export default function Task ({ task, editMode = false, onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) } }) {
    const [isEditingTask, setIsEditingTask] = useState(editMode)
    const [title] = useState(task.title)

    // onSubtaskSubmit

    return (
        <div className='task-container'>
            <label><input type='checkbox'/></label>
            {isEditingTask
                ? <input type='text' placeholder='Task Title' value={title} onChange={() => {}}/>
                : <Link to={`/tasks/${task.id}`}>{task.title}</Link>}

            {isEditingTask
                ? <button onClick={() => { onSubtaskSubmit(title); setIsEditingTask(false) }}>Submit</button>
                : <button onClick={() => { setIsEditingTask(true) }}>Edit</button>
            }
            {isEditingTask && <button onClick={() => { onSubtaskSubmit(title) }}>Delete</button>}
        </div>
    )
}
