import { configureStore } from "@reduxjs/toolkit";
import { getAllBlogs, createBlog, getSingleBlog } from "./Reducers/BlogReducer";
import { userReducer , updateReducer} from "./Reducers/UserReducer";

const store = configureStore({
    reducer : {
        userReducer, updateReducer, getAllBlogs, createBlog, getSingleBlog
    }
})

export default store;