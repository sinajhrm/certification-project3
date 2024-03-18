import axios from 'axios'
const baseLoginURL = '/api/login'
const baseUsersURL = '/api/users'

const UsersService = {

    login: (user) => {
        const request = axios.post(`${import.meta.env.VITE_BACKEND_URL}${baseLoginURL}`, user)
        return request.then(response => response.data)
    },
    create: (user) => {
        const request = axios.post(`${import.meta.env.VITE_BACKEND_URL}${baseUsersURL}`, user)
        return request.then(response => response.data)
    }

}

export default UsersService
