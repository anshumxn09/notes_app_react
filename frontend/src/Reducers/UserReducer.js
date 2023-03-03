import { createReducer } from "@reduxjs/toolkit";


export const userReducer = createReducer({}, {
    loginRequest : (state) => {
        state.loading = true;
    },
    loginSuccess : (state, actions) => {
        state.loading = true;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    loginFailure : (state, action) => {
        state.loading = true;
        state.error = action.payload;
        state.user = null
        state.isAuthenticated = false;
    },

    loadUserRequest : (state) => {
        state.loading = true;
    },
    loadUserSuccess : (state, actions) => {
        state.loading = true;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure : (state, action) => {
        state.loading = true;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
    },

    clearError : (state) => {
        state.error = null;
    }
})