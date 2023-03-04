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

export const register = (firstName, lastName, email, password, avatar="") => async (dispatch) => {
    try {
        dispatch({type : "registerRequest"})

        const {data} = await axios.post("/api/register", {
            firstName, lastName, email, password, avatar
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })

        dispatch({type : "registerSuccess", payload : data.user})

    } catch (error) {
        dispatch({type : "registerFailure", payload : error.response.data.message})
    }
}

export const updateProfile = (firstName, lastName, avatar="") => async (dispatch) => {
    try {
        dispatch({type : "updateProRequest"})

        const {data} = await axios.put("/api/me", {
            firstName, lastName, avatar
        }, {
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })

        dispatch({type : "updateProSuccess", payload : data.message})

    } catch (error) {
        dispatch({type : "updateProFailure", payload : error.response.data.message})
    }
}

export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({type : "deleteProfileRequest"})

        const {data} = await axios.delete("/api/me")

        dispatch({type : "deleteProfileSuccess", payload : data.message})

    } catch (error) {
        dispatch({type : "deleteProfileFailure", payload : error.response.data.message})
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({type : "logoutRequest"})

        const {data} = await axios.get("/api/logout")

        dispatch({type : "logoutSuccess", payload : data.message})

    } catch (error) {
        dispatch({type : "logoutFailure", payload : error.response.data.message})
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

export const updatePassword = (oldpass, newpass) => async (dispatch) => {
    try {
        dispatch({type : "updatePassRequest"})

        const {data}  = await axios.put("/api/password/update", {
            oldpass, newpass
        }, {
            headers : {
                'Content-Type' :"application/json"
            },
            withCredentials : true
        });

        dispatch({type : "updatePassSuccess", payload : data.message})
    } catch (error) {
        dispatch({type : "updatePassFailure", payload  : error.response.data.message})
    }
}