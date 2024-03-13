// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import React from 'react'
import './TasksPage.css'
import Task from '../task/Task'
import { useDispatch, useSelector } from 'react-redux'
import { addUpdateTask } from '../../feature/tasksSlice'
// import { v4 as uuid } from 'uuid'
import { ObjectId } from 'bson'

export default function TasksPage () {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.task.value)

    const handleAddTask = () => {
        dispatch(addUpdateTask(
            {
                updatedTask: {
                    id: (new ObjectId()).toString(),
                    title: '',
                    subtasks: []
                }
            }
        ))
    }

    return (
        <div className='tasksPage-container'>
            <ul>
                {tasks.map((taskItem) => {
                    return (
                        <li key={taskItem.id}>
                            <Task task={taskItem} editMode={taskItem.title === ''} />
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    )
}
