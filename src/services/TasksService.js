// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types.js'
import { readJSONExpress, writeJSONExpress } from './JSONService.js'

const DB_JSON_PATH = '../../data/taskList.json'

const TasksService = {
    /**
     *
     * @returns {Types.JSONDB}
     */
    GetAllTasks: async () => {
        return (await readJSONExpress(DB_JSON_PATH))
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
        const tasks = TasksService.GetAllTasks()
        const newTasksWithoutTargetTask = tasks.filter((task) => task.id !== newTask.id)
        await writeJSONExpress(DB_JSON_PATH, newTasksWithoutTargetTask.concat(newTask))
        return newTask
    }
}

// console.log(await TasksService.GetTaskById('d3817270-8b27-4f20-8943-e4541f590d15'))
// console.log(await TasksService.GetAllTasksConcatSubtasks())

export default TasksService
