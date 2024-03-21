// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types.js'
import axios from 'axios'

// import path from 'path'
// import dotenv from 'dotenv'
// dotenv.config()
// dotenv.config({ path: path.join(__dirname, '../.env') })

const TasksService = {
    GetAllTasks: async (userId, popSubtasks = false) => {
        // console.log(popSubtasks)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
                { params: { popSubtasks, userId } })
            // console.log(response.data)
            return response.data
        } catch (error) {
            throw new Error(`Error while fetching tasks: ${error.message}`)
        }
    },

    GetTaskById: async (taskId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`)
            return response.data
        } catch (error) {
            throw new Error(`Error while fetching task with ID ${taskId}: ${error.message}`)
        }
    },

    AddUpdateTask: async (task) => {
        try {
            console.log(task)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, task)
            return response.data
        } catch (error) {
            throw new Error(`Error while adding/updating task: ${error.message}`)
        }
    },

    DeleteTask: async (taskId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`)
        } catch (error) {
            throw new Error(`Error while deleting task with ID ${taskId}: ${error.message}`)
        }
    },

    AddUpdateSubtask: async ({ taskId, subtask }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/subtasks/${taskId}`, subtask)
            return response.data
        } catch (error) {
            throw new Error(`Error while adding/updating subtask: ${error.message}`)
        }
    },

    DeleteSubtask: async ({ taskId, subtaskId }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/subtasks/${taskId}/${subtaskId}`)
        } catch (error) {
            throw new Error(`Error while deleting subtask with ID ${subtaskId} from task with ID ${taskId}: ${error.message}`)
        }
    }
}

// console.log(await TasksService.GetAllTasks(true))
// console.log(await TasksService.GetAllTasksConcatSubtasks())

export default TasksService
