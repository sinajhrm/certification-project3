// This component is derived from phonebook example

import React from 'react'
import './Login.css'

const LoginForm = ({ onLogin, onCreate }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Grab relevant values
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        // distinguish between which button is clicked, 'login' or 'create'?
        const clickType = e.nativeEvent.submitter.value
        console.log('click type: ', clickType)
        if (clickType === 'login') {
            onLogin(user)
        } else {
            onCreate(user)
        }
    }

    return (
        <form className='login-container' onSubmit={handleSubmit}>
            <div><input placeholder="username" name="username" required /></div>
            <div><input placeholder="password" name="password" type="password" required /></div>
            <div>
                <button type="submit" value="login">login</button>
                <button type="submit" value="create">create</button>
            </div>
        </form>

    )
}

export default LoginForm
