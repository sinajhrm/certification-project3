import React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

/**
 * Importing other components
 */
import Home from './components/home/Home'
import About from './components/about/About'
import Navbar from './components/navbar/navbar'

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className='app-content'>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
