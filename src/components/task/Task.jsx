import React, { useState } from 'react'
import './Task.css'

export default function Task ({ taskTitle = '', editMode = false, onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) } }) {
    const [isEditingTask] = useState(editMode)
    const [title] = useState(taskTitle)

    return (
        <div className='task-container'>
            <label><input type='checkbox'/></label>
            {isEditingTask
                ? <input type='text' placeholder='Task Title' value={title} onChange={() => {}}/>
                : <a><label className='task-title'>{title}</label></a>}
            {isEditingTask && <button onClick={() => { onSubtaskSubmit(title) }}>Submit</button>}
            {isEditingTask && <button onClick={() => { onSubtaskSubmit(title) }}>Delete</button>}
        </div>
    )
}
