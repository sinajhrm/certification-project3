import React, { useState } from 'react'
import './Subtask.css'

export default function Subtask ({ subtaskTitle = '', editMode = false, onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) } }) {
    const [isEditingSubtask] = useState(editMode)
    const [title] = useState(subtaskTitle)

    return (
        <div className='subtask-container'>
            <select disabled={!isEditingSubtask}>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="todo">ToDo</option>
            </select>
            {isEditingSubtask
                ? <input type='text' placeholder='Subtask Title' value={title} onChange={() => {}}/>
                : <label className='task-title'>{title}</label>}
            <select disabled={!isEditingSubtask}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input type='date' />
            {isEditingSubtask
                ? <button onClick={() => { onSubtaskSubmit(title) }}>Submit</button>
                : <button onClick={() => { onSubtaskSubmit(title) }}>Edit</button>}
            <button onClick={() => { onSubtaskSubmit(title) }}>Delete</button>
        </div>
    )
}
