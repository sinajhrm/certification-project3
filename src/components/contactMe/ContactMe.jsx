// For creating this paged I got help from ChatGPT

import './ContactMe.css'
import React, { useState } from 'react'

const ContactMe = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length === 0) {
            // The logic for sending the user's feedback as email or post them to a server should be here
            console.log('Form submitted successfully')
            setSubmitted(true)
        } else {
            setErrors(errors)
        }
    }

    const validateForm = () => {
        const errors = {}
        if (!email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid'
        }
        if (!message) {
            errors.message = 'Message is required'
        }
        if (Object.keys(errors).length !== 0) { setErrors(errors) } else setErrors({})
        return errors
    }

    return (
        <div className='contactme-container' >
            <h2>Contact Me</h2>
            <form onSubmit={handleSubmit} className='form-container'>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        onKeyUp={validateForm}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        onKeyUp={validateForm}
                    />
                    {errors.message && (
                        <span className="error">{errors.message}</span>
                    )}
                </div>
                <button type="submit">Submit</button>
            </form>
            {submitted && <div className="success-message">Form submitted successfully!</div>}
        </div>
    )
}

export default ContactMe
