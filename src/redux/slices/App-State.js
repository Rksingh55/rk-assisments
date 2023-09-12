import { createSlice } from '@reduxjs/toolkit'
import { __MAIN_CATEGORIES } from '../../DB';
import { randomIntFromInterval } from '../../Helper_function';

const appStateData = {
    isLoading: false,
    message: null,
    alert: null,
    isMenuCollapsed: false,
    isMenuToggled: false,
    tagOneTopic: __MAIN_CATEGORIES[randomIntFromInterval(0, 2)].title,
    tagTwoTopic: __MAIN_CATEGORIES[randomIntFromInterval(3, 5)].title,
    tagThreeTopic: __MAIN_CATEGORIES[randomIntFromInterval(6, 8)].title,
    tagFourTopic: __MAIN_CATEGORIES[randomIntFromInterval(9, 11)].title
}


export const appState = createSlice({
    name: 'app-state',
    initialState: appStateData,
    reducers: {
        appLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        appMessage: (state, { payload }) => {
            state.message = payload;
        },
        appAlert: (state, { payload }) => {
            state.alert = payload;
        },
        appMenuCollapsed: (state, { payload }) => {
            state.isMenuCollapsed = payload;
        },
        appMenuToggled: (state, { payload }) => {
            state.isMenuToggled = payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { appLoading, appMessage, appAlert, appMenuCollapsed, appMenuToggled } = appState.actions

export default appState.reducer;