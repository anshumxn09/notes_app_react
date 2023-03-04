import { configureStore } from "@reduxjs/toolkit";
import { getAllBlogs } from "./Reducers/BlogReducer";
import { userReducer , updateReducer} from "./Reducers/UserReducer";

const store = configureStore({
    reducer : {
        userReducer, updateReducer, getAllBlogs
    }
})

export default store;