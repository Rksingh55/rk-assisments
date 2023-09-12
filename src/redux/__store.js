import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/Auth'
import appState from './slices/App-State'

export const store = configureStore({
    reducer: {
        auth,
        appState
    },
})