import React, { useState } from 'react'
import './Task.css'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types.js'
import { useDispatch } from 'react-redux'
import { addUpdateTask, deleteTask } from '../../feature/tasksSlice.js'
import TasksService from '../../services/TasksService.js'

/**
 *
 * @param {Types.TaskComponentParams} props
 * @returns
 */
export default function Task ({ task, editMode = false }) {
    const [isEditingTask, setIsEditingTask] = useState(editMode)
    const [title, setTitle] = useState(task.title)

    const dispatch = useDispatch()

    const handleSubmitTask = () => {
        const updateTaskRequestObj = {
            updatedTask: {
                id: task.id,
                title,
                subtasks: task.subtasks
            }
        }
        TasksService.AddUpdateTask(updateTaskRequestObj).then(
            () => {
                dispatch(addUpdateTask(
                    updateTaskRequestObj
                ))
            }
        )
        setIsEditingTask(false)
    }

    const handleDeleteTask = () => {
        const deleteTaskRequestObj = { taskId: task.id }
        TasksService.DeleteTask(deleteTaskRequestObj.taskId).then(
            () => dispatch(deleteTask(deleteTaskRequestObj))
        )
    }

    return (
        <div className='task-container'>
            <label><input type='checkbox' defaultChecked={task.subtasks.every((subtaskItem) => subtaskItem.status === 'done')} /></label>
            {isEditingTask
                ? <input type='text' placeholder='Task Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                : <Link to={`/tasks/${task.id}`}>{task.title}</Link>}

            {isEditingTask
                ? <button onClick={() => { handleSubmitTask(false) }}>Submit</button>
                : <button onClick={() => { setIsEditingTask(true) }}>Edit</button>
            }
            {isEditingTask && <button onClick={handleDeleteTask}>Delete</button>}
        </div>
    )
}
