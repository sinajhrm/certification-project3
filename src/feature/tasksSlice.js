import * as Types from '../utils/types'
import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef taskStateType
 * @property {Types.Task[]} value
 *
 * @returns {taskStateType}
 */
const initialStateCreator = () => {
    return {
        value: []
    }
}

/**
 * @typedef addSubtaskToTaskPayload
 * @property {string} taskId
 * @property {Types.Subtask} subtask
 *
 * @typedef addSubtaskToTaskAction
 * @property {addSubtaskToTaskPayload} payload
 *
 * @typedef addTaskPayload
 * @property {Types.Task} task
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
            state.value.push(action.payload)
        },
        /**
         *
         * @param {*} state
         * @param {addSubtaskToTaskAction} action
        */
        addSubtaskToTask: (state, action) => {
        }

    }
})

export const { addTask, addSubtaskToTask } = taskSlice.actions

export default taskSlice.reducer
