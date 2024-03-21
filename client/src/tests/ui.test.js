/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Source: https://github.com/testing-library/react-testing-library/issues/683#issuecomment-646855625
import { configure } from '@testing-library/dom'

import Login from '../components/login/Login'

configure({ testIdAttribute: 'id' })

describe('Login Component Tests',
    () => {
        it('should call login/create function after login button clicked.', async () => {
            const onLogin = jest.fn()
            const onCreate = jest.fn()
            const user = userEvent.setup()
            const { debug } = render(
                <Login onLogin={onLogin} onCreate={onCreate} />
            )
            // debug()
            const txtUsername = screen.getByPlaceholderText('username')
            const txtPassword = screen.getByPlaceholderText('password')
            const loginBtn = screen.getByText('login')
            const createBtn = screen.getByText('create')

            await user.type(txtUsername, 'some_username')
            expect(txtUsername).toHaveDisplayValue('some_username')

            await user.type(txtPassword, 'some_password')
            expect(txtPassword).toHaveDisplayValue('some_password')

            await user.click(loginBtn)
            await user.click(createBtn)

            debug()
            expect(onLogin).toHaveBeenCalledTimes(1)
            expect(onLogin.mock.calls[0][0]).toStrictEqual({ username: 'some_username', password: 'some_password' })
            expect(onCreate.mock.calls[0][0]).toStrictEqual({ username: 'some_username', password: 'some_password' })
        })
    })
