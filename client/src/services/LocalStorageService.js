/**
 * Local storage helper functions
 */

const LocalStorageService = {
    storeUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('user'))
    },

    removeUser: () => {
        localStorage.removeItem('user')
    }
}

export default LocalStorageService
