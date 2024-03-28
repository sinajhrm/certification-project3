import React from 'react'

import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import './navbar.css'

const Navbar = ({ onLogout, syncReduxLocalStorage }) => {
    const navigate = useNavigate()

    return (
        <>
            <nav className='navbar'>
                <ul>
                    <ActiveClassLink to="/">Home</ActiveClassLink>
                    <ActiveClassLink to="/tasks">Tasks</ActiveClassLink>
                    {/* <ActiveClassLink to="/create">Create</ActiveClassLink> */}
                    <ActiveClassLink to="/contact">Contact</ActiveClassLink>
                    <a onClick={() => { onLogout(); navigate('/') }} style={{ cursor: 'pointer' }} >Logout</a>
                    <a onClick={syncReduxLocalStorage} style={{ cursor: 'pointer' }} >Sync Redux/Local Storage</a>
                </ul>
            </nav>
        </>
    )
}

// Tutorial Soruce: https://www.youtube.com/watch?app=desktop&v=SLfhMt5OUPI
function ActiveClassLink ({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const needActiveClass = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={needActiveClass ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar
