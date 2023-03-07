import { createReducer } from "@reduxjs/toolkit";


export const userReducer = createReducer({}, {

    registerRequest : (state) => {
        state.loading = true;
    },
    registerSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    registerFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null
        state.isAuthenticated = false;
    },

    loginRequest : (state) => {
        state.loading = true;
    },
    loginSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    loginFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null
        state.isAuthenticated = false;
    },

    logoutRequest : (state) => {
        state.loading = true;
    },
    logoutSuccess : (state, actions) => {
        state.loading = false;
        state.user = null;
        state.error = actions.payload
        state.isAuthenticated = false;
    },
    logoutFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null
        state.isAuthenticated = false;
    },

    deleteUserRequest : (state) => {
        state.loading = true;
    },
    deleteUserSuccess : (state, actions) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = actions.payload;
    },
    deleteUserFailure : (state, action) => {
        state.loading = false;
    },

    loadUserRequest : (state) => {
        state.loading = true;
    },
    loadUserSuccess : (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
        state.isAuthenticated = true;
    },
    loadUserFailure : (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },

    clearError : (state) => {
        state.error = null;
    }
})

export const updateReducer = createReducer({}, {

    updateBlogReq : (state) => {
        state.loading = true;
    },
    updateBlogSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    updateBlogFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },

    deleteBlogReq : (state) => {
        state.loading = true;
    },
    deleteBlogSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    deleteBlogFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },

    updatePassRequest : (state) => {
        state.loading = true;
    },
    updatePassSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    updatePassFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateProRequest : (state) => {
        state.loading = true;
    },
    updateProSuccess : (state,action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    updateProFailure : (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },

    clearError : (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
})