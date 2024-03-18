/**
 *
 * @typedef {Task[]} JSONDB
 *
 * @typedef {object} Subtask
 * @property {string} id
 * @property {string} title
 * @property {Date} due_date
 * @property {string} status
 * @property {string} priority
 *
 * @typedef {object} Task
 * @property {string} id
 * @property {string} title
 * @property {Subtask[]} subtasks
 *
 * @typedef {object} TaskDetailParams
 * @property {Task} task
 *
 * @typedef {object} TaskComponentParams
 * @property {Task} task
 * @property {boolean} editMode
 * @property {Function} onSubtaskSubmit
 *
 * @typedef {object} SubtaskComponentParams
 * @property {string} taskId
 * @property {Subtask} subtask
 * @property {boolean} editMode
//  * @property {Function} onSubtaskSubmit
 *
 * @typedef {object} TasksPageParams
 * @property {Task[]} tasks
 *
 */
export const Types = {}
