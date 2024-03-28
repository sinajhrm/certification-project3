/**
 * Local storage helper functions
 */

const LocalStorageService = {
    storeUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    },

    storeTasks: (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },
    getTasks: (tasks) => {
        return JSON.parse(localStorage.getItem('tasks'))
    },

    removeTasks: (tasks) => {
        localStorage.removeItem('tasks')
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('user'))
    },

    removeUser: () => {
        localStorage.removeItem('user')
    }
}

export default LocalStorageService
