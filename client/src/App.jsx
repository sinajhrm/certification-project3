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
import About from './components/about/About'
import Navbar from './components/navbar/Navbar'
import TasksPage from './components/tasksPage/TasksPage'
import TaskDetail from './components/taskDetail/TaskDetail'
import TasksService from './services/TasksService.js'
import { useSelector, useDispatch } from 'react-redux'
import { addTask } from './feature/tasksSlice.js'
import ContactMe from './components/contactMe/ContactMe.jsx'

const App = () => {
    const [isDataBeingLoaded, setIsDataBeingLoaded] = useState(true)

    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.task.value)

    const fetchDataAndUpdateRedux = async () => {
        const fetchedTasks = await TasksService.GetAllTasks()
        fetchedTasks.forEach((fetchedTask) => {
            // console.log(fetchedTask)
            dispatch(addTask(fetchedTask))
        })
    }

    useEffect(() => {
        fetchDataAndUpdateRedux()
        setIsDataBeingLoaded(false)
    }, [])

    if (isDataBeingLoaded) return (<><h1>Loading ...</h1></>)
    return (
        <Router>
            <Navbar />
            <div className='app-content'>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />

                    <Route path="/tasks/:taskId" element={<TaskDetail task={tasks}/>}/>

                    <Route path="/tasks" element={<TasksPage />} />

                    {/* <Route path="/create" element={<CreateTask />} /> */}

                    <Route path="/about" element={<About />} />

                    <Route path="/contact" element={<ContactMe />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
