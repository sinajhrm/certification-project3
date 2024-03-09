// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'
import React, { useState } from 'react'
import './Subtask.css'
import { useDispatch } from 'react-redux'
import { addSubtaskToTask } from '../../feature/tasksSlice'
import TasksService from '../../services/TasksService'

/**
 *
 * @param {Types.SubtaskComponentParams} props
 */
// export default function Subtask ({ onSubtaskSubmit = (value) => { console.log(`SUBTASK: ${value}`) }, editMode, subtask, taskId }) {
export default function Subtask ({ editMode, subtask, taskId }) {
    const [isEditingSubtask, setIsEditingSubtask] = useState(editMode)
    const [title, setSubtaskTitle] = useState(subtask.title)
    const [dueDateString, setDueDateString] = useState(subtask.due_date)
    const [status, setStatus] = useState(subtask.status)
    const [priority, setPriority] = useState(subtask.priority)

    const dispatch = useDispatch()

    const handleSubmitSubTask = () => {
        const updateSubtaskRequestObj = {
            subtask: {
                id: subtask.id,
                title,
                due_date: dueDateString,
                status,
                priority
            },
            taskId
        }
        TasksService.AddUpdateSubtask(updateSubtaskRequestObj).then(
            () => {
                dispatch(addSubtaskToTask(
                    updateSubtaskRequestObj
                ))
            }
        )
    }

    return (
        <div className='subtask-container'>
            <select disabled={!isEditingSubtask} value={status} onChange={(e) => { setStatus(e.target.value) }}>
                <option value="in_progress" >In Progress</option>
                <option value="done" >Done</option>
                <option value="todo" >ToDo</option>
            </select>
            {isEditingSubtask
                ? <input type='text' placeholder='Subtask Title' value={title} onChange={(e) => { setSubtaskTitle(e.target.value) }}/>
                : <label className='task-title'>{title}</label>}
            <select disabled={!isEditingSubtask} value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                <option value="low" >Low</option>
                <option value="medium" >Medium</option>
                <option value="high" >High</option>
            </select>
            <input type='date' disabled={!isEditingSubtask} value={dueDateString} onChange={(e) => { setDueDateString(e.target.value) }}/>
            {isEditingSubtask
                ? <button onClick={() => { handleSubmitSubTask() }}>Submit</button>
                : <button onClick={() => { setIsEditingSubtask(true) }}>Edit</button>}
            <button onClick={() => { handleSubmitSubTask() }}>Delete</button>
        </div>
    )
}
