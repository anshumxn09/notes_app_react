import axios from "axios"


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type : "loginRequest"})

        const {data}  = await axios.post("/api/login", {
            email, password
        }, {
            headers : {
                'Content-Type' : "application/json",
            },
            withCredentials : true
        })
        dispatch({type : "loginSuccess", payload : data.user})
    } catch (error) {
        dispatch({type : "loginFailure", payload  : error.response.data.message})
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type : "loadUserRequest"})

        const {data}  = await axios.get("/api/me");

        dispatch({type : "loadUserSuccess", payload : data.user})
    } catch (error) {
        dispatch({type : "loadUserFailure", payload  : error.response.data.message})
    }
}