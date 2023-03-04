import { createReducer } from "@reduxjs/toolkit";


export const getAllBlogs = createReducer({}, {
    getMyBlogReq : (state) => {
        state.loading = true;
    },
    getMyBlogSuccess : (state, action) => {
        state.loading = false;
        state.blog = action.payload
    },
    getMyBlogFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
})


export const getSingleBlog = createReducer({}, {
    getBlogReq : (state) => {
        state.loading = true;
    },
    getBlogSuccess : (state, action) => {
        state.loading = false;
        state.blog = action.payload
    },
    getBlogFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
})


export const createBlog = createReducer({}, {
    createBlogReq : (state) => {
        state.loading = true;
    },
    createBlogSuccess : (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    createBlogFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },

    clearError : (state) => {
        state.error = null;
    },
    clearMessage : (state) => {
        state.message = null;
    },
})