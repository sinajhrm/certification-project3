import React from 'react'

import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className='navbar'>
                <ul>
                    <ActiveClassLink to="/">Home</ActiveClassLink>
                    <ActiveClassLink to="/tasks">Tasks</ActiveClassLink>
                    {/* <ActiveClassLink to="/create">Create</ActiveClassLink> */}
                    <ActiveClassLink to="/contact">Contact</ActiveClassLink>
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
