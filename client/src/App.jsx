import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

/**
 * Importing other components
 */
import Home from './components/homePage/Home'
import LoginForm from './components/login/Login'
import About from './components/about/About'
import Navbar from './components/navbar/Navbar'
import TasksPage from './components/tasksPage/TasksPage'
import TaskDetail from './components/taskDetail/TaskDetail'
import TasksService from './services/TasksService.js'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from './feature/tasksSlice.js'
import ContactMe from './components/contactMe/ContactMe.jsx'
import UsersService from './services/UsersService.js'
import LocalStorageService from './services/LocalStorageService.js'

const App = () => {
    const [isDataBeingLoaded, setIsDataBeingLoaded] = useState(true)
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.task.value)

    const fetchDataAndUpdateRedux = async () => {
        const fetchedTasks = await TasksService.GetAllTasks(LocalStorageService.getUser().id, true)
        LocalStorageService.storeTasks(fetchedTasks)
        fetchedTasks.forEach((fetchedTask) => {
            dispatch(addTask(fetchedTask))
        })
    }

    const updateReduxFromLocalStorage = () => {
        const lsTasks = LocalStorageService.getTasks()
        lsTasks.forEach((fetchedTask) => {
            dispatch(addTask(fetchedTask))
        })
    }

    useEffect(() => {
        const loggedInUser = LocalStorageService.getUser()
        // console.log(['logged-in user:', loggedInUser])
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }, [])

    useEffect(() => {
        if (user) {
            fetchDataAndUpdateRedux()
            setIsDataBeingLoaded(false)
        }
    }, [user])

    const handleLogin = (user) => {
        UsersService
            .login(user)
            .then((response) => {
                // console.log(['user service response: ', response])
                setUser(response)
                LocalStorageService.storeUser(response)
                return response
            })
            .catch((error) => console.log(error))
    }

    const handleCreate = (user) => {
        UsersService
            .create(user)
            .then((response) => {
                // console.log(['user service response: ', response])
                setUser(response)
                LocalStorageService.storeUser(response)
                return response
            })
            .catch((error) => console.log(error))
    }
    /**
     * Handles logout, sets user to null
     */
    const handleLogout = () => {
        // LocalStorageService.removeUser()
        localStorage.clear()
        setUser(null)
    }
    if (isDataBeingLoaded && user) return (<><h1>Loading ...</h1></>)
    if (!LocalStorageService.getUser()) {
        return (<LoginForm onLogin={handleLogin} onCreate={handleCreate} />)
    } else {
        return (
            <Router>
                <Navbar onLogout={handleLogout} syncReduxLocalStorage={updateReduxFromLocalStorage} />
                <div className='app-content'>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Home />} />

                        <Route path="/tasks/:taskId" element={<TaskDetail task={tasks} />} />

                        <Route path="/tasks" element={<TasksPage />} />

                        {/* <Route path="/create" element={<CreateTask />} /> */}

                        <Route path="/about" element={<About />} />

                        <Route path="/contact" element={<ContactMe />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App
