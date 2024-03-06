import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../feature/tasksSlice'

export const store = configureStore({
    reducer: {
        task: taskReducer
    }
})
