// eslint-disable-next-line no-unused-vars
import * as Types from '../utils/types_SQLLike.js'
import { readJSON, writeJSON } from './JSONService.js'

const DB_JSON_PATH = '../../data/taskList_SQLLike.json'

const TasksService = {
    /**
     *
     * @returns {Types.Task[]}
     */
    GetAllTasks: async () => {
        return (await readJSON(DB_JSON_PATH)).tasks
    },
    /**
     *
     * @returns {Types.TaskWithSubtasks[]}
     */
    GetAllTasksConcatSubtasks: async () => {
        const db = await readJSON(DB_JSON_PATH)
        db.tasks.forEach((task, index) => {
            db.tasks[index].subtasks = db.subtasks.filter((subtask) => subtask.taskId === task.id)
        })
        return db.tasks
    },
    /**
     *
     * @param {string} taskId
     * @returns {Types.Task}
     */
    GetTaskById: async (taskId) => {
        const tasks = await TasksService.GetAllTasks()
        console.log(tasks)
        // return tasks.filter((task) => task.id === taskId)[0]
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

// console.log(await TasksService.GetTaskById('d3817270-8b27-4f20-8943-e4541f590d15'))
// console.log(await TasksService.GetAllTasksConcatSubtasks())

export default TasksService
