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

export const getBlog = (id) => async (dispatch) => {
    try {
        dispatch({type : "getBlogReq"});

        const {data} = await axios.get(`/api/blog/${id}`);

        dispatch({type : "getBlogSuccess", payload : data.blog})
    } catch (error) {
        dispatch({type : "getBlogFailure", payload : error.response.data.message})
    }
}

export const updateBlog = (id, title, description) => async (dispatch) => {
    try {
        dispatch({type : "updateBlogReq"});

        const {data} = await axios.put(`/api/blog/${id}`, {
            title, description
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        });

        dispatch({type : "updateBlogSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "updateBlogFailure", payload : error.response.data.message})
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({type : "deleteBlogReq"});

        const {data} = await axios.delete(`/api/blog/${id}`);

        dispatch({type : "deleteBlogSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "deleteBlogFailure", payload : error.response.data.message})
    }
}

export const createBlog = (title, description) => async (dispatch) => {
    try {
        dispatch({type : "createBlogReq"});

        const {data} = await axios.post("/api/blog/create", {
            title, description
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        });

        dispatch({type : "createBlogSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "createBlogFailure", payload : error.response.data.message})
    }
}