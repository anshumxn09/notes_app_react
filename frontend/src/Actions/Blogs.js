import axios from "axios";

export const getAllBlog = () => async (dispatch) => {
    try {
        dispatch({type : "getMyBlogReq"});

        const {data} = await axios.get("/api/get/blogs");

        dispatch({type : "getMyBlogSuccess", payload : data.blogs})
    } catch (error) {
        dispatch({type : "getMyBlogFailure", payload : error.response.data.message})
    }
}