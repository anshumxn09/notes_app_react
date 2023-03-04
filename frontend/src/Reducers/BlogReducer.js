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