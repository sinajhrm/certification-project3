// I used ChatGPT to create async reading/writing of json files

// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types'
import { readJSON, writeJSON } from './JSONService'

const DB_JSON_PATH = './data/taskList.json'

const TasksService = {
    /**
     *
     * @returns {Types.Task[]}
     */
    GetAllTasks: async () => {
        return await readJSON(DB_JSON_PATH)
    },
    /**
     *
     * @param {string} taskId
     * @returns {Types.Task}
     */
    GetTaskById: async (taskId) => {
        const tasks = await TasksService.GetAllTasks()
        return tasks.filter((task) => task.id === taskId)[0]
    },

    /**
     * @param {Types.Task} newTask
     * @returns {Types.Task}
     */
    UpdateTask: async (newTask) => {
        const tasks = await TasksService.GetAllTasks()
        const newTasksWithoutTargetTask = tasks.filter((task) => task.id !== newTask.id)
        await writeJSON(DB_JSON_PATH, newTasksWithoutTargetTask.concat(newTask))
        return newTask
    }
}

export default TasksService
