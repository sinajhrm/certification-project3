/**
 *
 * @typedef {object} JSONDB
 * @property {Task[]} tasks
 * @property {Subtask[]} subtasks
 *
 * @typedef {object} Subtask
 * @property {string} id
 * @property {string} taskId
 * @property {string} title
 * @property {Date} due_date
 * @property {string} status
 * @property {string} priority
 *
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title
 *
 * @typedef {object} TaskWithSubtasks
 * @property {string} id
 * @property {string} title
 * @property {Subtask[]} subtasks
 *
 */
export const Types = {}
