import React, { useState } from 'react'
import './Subtask.css'

export default function Subtask ({ subtaskTitle = '', editMode = false, onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) } }) {
    const [isEditingSubtask] = useState(editMode)
    const [title] = useState(subtaskTitle)

    return (
        <div className='subtask-container'>

            <label><input type='checkbox'/></label>
            {isEditingSubtask
                ? <input type='text' placeholder='Subtask Title' value={title} onChange={() => {}}/>
                : <label className='task-title'>{title}</label>}
            <select disabled={!isEditingSubtask}>
                <option value="">Select Priority ...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            {isEditingSubtask && <button onClick={() => { onSubtaskSubmit(title) }}>Submit</button>}
        </div>
    )
}
