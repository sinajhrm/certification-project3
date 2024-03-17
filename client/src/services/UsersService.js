import axios from 'axios'
const baseURL = '/api/login'

const UsersService = {

    login: (user) => {
        const request = axios.post(`${import.meta.env.VITE_BACKEND_URL}${baseURL}`, user)
        return request.then(response => response.data)
    }
}

export default UsersService
