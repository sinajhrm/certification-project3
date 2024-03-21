// This component is derived from phonebook example

import React, { useState } from 'react'
// import './Login.css'

const LoginForm = ({ onLogin, onCreate }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Grab relevant values
        const user = {
            username,
            password
        }
        // distinguish between which button is clicked, 'login' or 'create'?
        // const clickType = e.nativeEvent.submitter.value
        // console.log('click type: ', clickType)
        console.log('username: ', username)
        console.log('password: ', password)
        console.log('Obj user: ', user)
        // if (clickType === 'login') {
        //     onLogin(user)
        // } else {
        //     onCreate(user)
        // }
    }

    return (
        <form className='login-container' onSubmit={handleSubmit}>
            <div><input placeholder="username" name="username" required onChange={(e) => setUsername(e.target.value)} /></div>
            <div><input placeholder="password" name="password" type="password" required onChange={(e) => setPassword(e.target.value)} /></div>
            <div>
                <button type="submit" value="login" onClick={() => {
                    onLogin({
                        username,
                        password
                    })
                }}>login</button>
                <button type="submit" value="create" onClick={() => {
                    onCreate({
                        username,
                        password
                    })
                }} >create</button>
            </div>
        </form>

    )
}

export default LoginForm
