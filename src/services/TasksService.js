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
        return tasks.find((task) => task.id === taskId)
    },

    /**
     * Ppdates a task to json object if it does not exists (based on its id). Otherwise, creates it.
     * @param {Types.Task} newTask
     * @returns {Types.Task}
     */
    AddUpdateTask: async ({ updatedTask }) => {
        const allTasks = await TasksService.GetAllTasks()
        const existingTaskIndex = allTasks.findIndex(task => task.id === updatedTask.id)
        if (existingTaskIndex !== -1) {
            // Update existing task
            allTasks[existingTaskIndex] = updatedTask
        } else {
            // Add new task
            allTasks.push(updatedTask)
        }
        return await TasksService.Save(allTasks)
    },

    DeleteTask: async ({ taskId }) => {
        const allTasks = await TasksService.GetAllTasks()
        await TasksService.Save(allTasks.filter((taskItem) => taskItem.id !== taskId))
    },

    AddUpdateSubtask: async ({ subtask, taskId }) => {
        // console.log(taskId)
        // console.log(subtask)
        const allTasks = await TasksService.GetAllTasks()
        // Get index of existing task from db
        const taskToUpdateIndex = allTasks.findIndex(task => task.id === taskId)
        if (taskToUpdateIndex !== -1) {
            const existingSubtaskIndex = allTasks[taskToUpdateIndex].subtasks.findIndex(existingSubtask => existingSubtask.id === subtask.id)
            if (existingSubtaskIndex !== -1) {
                // Update existing subtask
                allTasks[taskToUpdateIndex].subtasks[existingSubtaskIndex] = subtask
            } else {
                // Add new subtask
                allTasks[taskToUpdateIndex].subtasks.push(subtask)
            }
        }
        await TasksService.Save(allTasks)
    },

    DeleteSubtask: async ({ subtaskId, taskId }) => {
        const allTasks = await TasksService.GetAllTasks()
        const taskToUpdate = allTasks.find(task => task.id === taskId)
        if (taskToUpdate) {
            taskToUpdate.subtasks = taskToUpdate.subtasks.filter(subtask => subtask.id !== subtaskId)
        }
        await TasksService.Save(allTasks)
    },

    Save: async (obj) => {
        return await writeJSONExpress(obj)
    }
}

// console.log(await TasksService.GetTaskById('d3817270-8b27-4f20-8943-e4541f590d15'))
// console.log(await TasksService.GetAllTasksConcatSubtasks())

export default TasksService
