/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Source: https://github.com/testing-library/react-testing-library/issues/683#issuecomment-646855625
import { configure } from '@testing-library/dom'

import Login from '../components/login/Login'

configure({ testIdAttribute: 'id' })

describe('Login Componenet Tests',
    () => {
        const onLogin = jest.fn()

        it('should call login function after login button clicked.', async () => {
            const user = userEvent.setup()
            const { debug } = render(
                <Login onLogin={onLogin} />
            )
            // debug()
            const txtUsername = screen.getByPlaceholderText('username')
            const txtPassword = screen.getByPlaceholderText('password')
            const loginBtn = screen.getByText('login')

            await user.type(txtUsername, 'some_username')
            expect(txtUsername).toHaveDisplayValue('some_username')

            await user.type(txtPassword, 'some_password')
            expect(txtPassword).toHaveDisplayValue('some_password')

            await user.click(loginBtn)

            debug()
            expect(onLogin).toHaveBeenCalledTimes(1)
        })
    })
