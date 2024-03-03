import React from 'react'
import Subtask from '../subtask/Subtask'
import './TasksPage.css'

export default function TasksPage () {
    const subtasks = [
        { id: 1, title: 'Subtask 1', editing: false },
        { id: 2, title: 'Subtask 2', editing: false },
        { id: 3, title: 'Subtask 3', editing: false },
        { id: 4, title: 'Subtask 4', editing: false },
        { id: 5, title: 'Subtask 5', editing: false }
    ]

    return (
        <div className='tasksPage-container'>
            <ul>
                {subtasks.map((subtaskItem) => {
                    return (
                        <li key={subtaskItem.id}>
                            <Subtask editMode={subtaskItem.editing} subtaskTitle={subtaskItem.title}/>
                        </li>)
                })}
            </ul>
        </div>
    )
}
