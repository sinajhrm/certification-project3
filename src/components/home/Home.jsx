import React from 'react'
import './home.css'

const Home = () => {
    return (
        <>
            <div className='home-container'>
                <h1>
                Welcome
                </h1>
                <h2>
                    This is a Task Manager app!
                </h2>
                <h3>It has the following simple but practical features:</h3>
                <hr/>
                <ul>
                    <li>You can add a task containing several subtasks.</li>
                    <li>Each subtask could be marked as Done/Completed.</li>
                    <li>Each subtask could be given a high, medium, or low priority.</li>
                    <li>When all subtasks of a tasks are completed, the task itself will be mark as complete.</li>
                    <li>The total progress of each task could be seen in Tasks tab.</li>
                    <li>Deleting a task will remove all associated subtasks.</li>
                </ul>
            </div>
        </>
    )
}

export default Home
