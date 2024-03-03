import React from 'react'
import Subtask from '../subtask/Subtask'
import './TasksPage.css'
import Task from '../task/Task'

export default function TasksPage () {
    const subtasks = [
        { id: 1, title: 'Subtask 1', editing: true },
        { id: 2, title: 'Subtask 2', editing: true },
        { id: 3, title: 'Subtask 3', editing: true },
        { id: 4, title: 'Subtask 4', editing: true },
        { id: 5, title: 'Subtask 5', editing: true }
    ]

    const tasks = [
        { id: 1, subtasks, title: 'Task 1 title', editing: true },
        { id: 2, subtasks: [], title: 'Task 2 title', editing: true },
        { id: 3, subtasks: [], title: 'Task 3 title', editing: true },
        { id: 4, subtasks: [], title: 'Task 4 title', editing: true }
    ]

    return (
        <div className='tasksPage-container'>
            <ul>
                {/* {subtasks.map((subtaskItem) => {
                    return (
                        <li key={subtaskItem.id}>
                            <Subtask editMode={subtaskItem.editing} subtaskTitle={subtaskItem.title}/>
                        </li>)
                })} */}
                {tasks.map((taskItem) => {
                    return (
                        <li key={taskItem.id}>
                            <Task editMode={taskItem.editing} taskTitle={taskItem.title}/>
                        </li>)
                })}
            </ul>
        </div>
    )
}
