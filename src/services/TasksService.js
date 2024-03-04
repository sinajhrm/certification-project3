// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types.js'
import { readJSON, writeJSON } from './JSONService.js'

const DB_JSON_PATH = '../../data/taskList.json'

const TasksService = {
    /**
     *
     * @returns {Types.Task[]}
     */
    GetAllTasks: async () => {
        return await readJSON(DB_JSON_PATH).tasks
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
        const db = await readJSON(DB_JSON_PATH)
        const newTasksWithoutTargetTask = db.tasks.filter((task) => task.id !== newTask.id)
        db.tasks = newTasksWithoutTargetTask.concat(newTask)
        await writeJSON(DB_JSON_PATH, db)
        return newTask
    }
}

console.log(await TasksService.GetTaskById('123'))

export default TasksService
