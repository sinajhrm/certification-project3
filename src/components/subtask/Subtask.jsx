// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import React, { useState } from 'react'
import './Subtask.css'

/**
 *
 * @param {Types.SubtaskComponentParams} props
 */
export default function Subtask ({ onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) }, editMode, subtask }) {
    const [isEditingSubtask, setIsEditingSubtask] = useState(editMode)
    const [title, setSubtaskTitle] = useState(subtask.title)
    const [dueDateString, setDueDateString] = useState(subtask.due_date)

    return (
        <div className='subtask-container'>
            <select disabled={!isEditingSubtask}>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="todo">ToDo</option>
            </select>
            {isEditingSubtask
                ? <input type='text' placeholder='Subtask Title' value={title} onChange={(e) => { setSubtaskTitle(e.target.value) }}/>
                : <label className='task-title'>{title}</label>}
            <select disabled={!isEditingSubtask}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input type='date' disabled={!isEditingSubtask} value={dueDateString} onChange={(e) => { setDueDateString(e.target.value) }}/>
            {isEditingSubtask
                ? <button onClick={() => { setIsEditingSubtask(false) }}>Submit</button>
                : <button onClick={() => { setIsEditingSubtask(true) }}>Edit</button>}
            <button onClick={() => { onSubtaskSubmit(title) }}>Delete</button>
        </div>
    )
}
