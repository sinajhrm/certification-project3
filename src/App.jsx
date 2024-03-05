import React from 'react'

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
import Navbar from './components/navbar/navbar'
import TasksPage from './components/tasksPage/TasksPage'
import TaskDetail from './components/taskDetail/TaskDetail'
// import TasksService from './services/TasksService.js'

const App = () => {
    const hardcodedTask = {
        id: 'd3817270-8b27-4f20-8943-e4541f590d15',
        title: 'Work Tasks',
        subtasks: [
            {
                title: 'Finish Project Proposal',
                priority: 'high',
                status: 'in progress',
                due_date: '2024-03-15'
            },
            {
                title: 'Prepare Presentation',
                priority: 'medium',
                status: 'todo',
                due_date: '2024-03-20'
            }
        ]
    }

    return (
        <Router>
            <Navbar />
            <div className='app-content'>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />

                    {/* <Route path="/tasks/:taskId" loader={async ({ params }) => { return await TasksService.GetTaskById(params.taskId) }} element={<TaskDetail />} /> */}
                    <Route path="/tasks/:taskId" element={<TaskDetail task={hardcodedTask}/>} />
                    <Route path="/tasks" element={<TasksPage />} />

                    <Route path="/create" element={<Home />} />

                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
