// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef taskStateType
 * @property {Types.Task[]} value
 *
 * @returns {taskStateType}
 */
const initialStateCreator = () => {
    return { value: [] }
}

/**
 * @typedef addSubtaskToTaskPayload
 * @property {string} taskId
 * @property {Types.Subtask} subtask
 *
 * @typedef addSubtaskToTaskAction
 * @property {addSubtaskToTaskPayload} payload
 *
 * @typedef {Types.Task} addTaskPayload
 *
 * @typedef addTaskAction
 * @property {addTaskPayload} payload
 *
 * @returns {taskStateType}
 */
export const taskSlice = createSlice({
    name: 'task',
    initialState: initialStateCreator(),
    reducers: {
        /**
         *
         * @param {*} state
         * @param {addTaskAction} action
         */
        addTask: (state, action) => {
            // console.log(action.payload)
            if (state.value.filter((task) => task.id === action.payload?.id).length === 0) { state.value.push(action.payload) }
        },
        addUpdateTask: (state, action) => {
            const { updatedTask } = action.payload
            const existingTaskIndex = state.value.findIndex(task => task.id === updatedTask.id)
            if (existingTaskIndex !== -1) {
                // Update existing task
                state.value[existingTaskIndex] = updatedTask
            } else {
                // Add new task
                state.value.push(updatedTask)
            }
        },
        deleteTask: (state, action) => {
            const { taskId } = action.payload
            state.value = state.value.filter((taskItem) => taskItem.id !== taskId)
        },
        /**
         *
         * @param {*} state
         * @param {addSubtaskToTaskAction} action
        */
        addUpdateSubtaskToTask: (state, action) => {
            const { taskId, subtask } = action.payload
            // console.log(action.payload)
            const taskToUpdate = state.value.find(task => task.id === taskId)
            if (taskToUpdate) {
                const existingSubtaskIndex = taskToUpdate.subtasks.findIndex(existingSubtask => existingSubtask.id === subtask.id)
                if (existingSubtaskIndex !== -1) {
                    // Update existing subtask
                    taskToUpdate.subtasks[existingSubtaskIndex] = subtask
                } else {
                    // Add new subtask
                    taskToUpdate.subtasks.push(subtask)
                }
            }
        },
        deleteSubtask (state, action) {
            const { taskId, subtaskId } = action.payload
            const taskToUpdate = state.value.find(task => task.id === taskId)
            if (taskToUpdate) {
                taskToUpdate.subtasks = taskToUpdate.subtasks.filter(subtask => subtask.id !== subtaskId)
            }
        }

    }
})

export const { addTask, addUpdateSubtaskToTask, deleteSubtask, addUpdateTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer
