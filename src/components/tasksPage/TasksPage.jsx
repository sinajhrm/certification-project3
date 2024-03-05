import React from 'react'
// import Subtask from '../subtask/Subtask'
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
        { id: '40465310-ff8c-4716-8c78-7aedd42d7b93', subtasks, title: 'Task 1 title', editing: false },
        { id: '895a034d-e26b-4ffb-a23a-33e112eb7249', subtasks: [], title: 'Task 2 title', editing: false },
        { id: 'e96d798d-996b-4987-92e5-95c17cd01676', subtasks: [], title: 'Task 3 title', editing: false },
        { id: '2f9f3b60-ff60-48fc-b4a9-d49949ea9607', subtasks: [], title: 'Task 4 title', editing: false }
    ]

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
