import axios from "axios"
const url = "http://localhost:3000/users"

export const register = async(data) => {
    const registerRes = await axios.post(`${url}/signup`, data);
    if(registerRes?.data?.token){
        localStorage.setItem("token", registerRes?.data?.token)
    }
    return registerRes.data
}

export const login = async (data) => {
    const loginRes = await axios({
        url : `${url}/login`,
        method: "post",
        headers: data
    })
    if(loginRes?.data?.token){
        localStorage.setItem("token", loginRes?.data?.token)
    }
    return loginRes.data
}

export const logout = async (data) => {
    // const loginRes = await axios({
    //     url : `${url}/logout`,
    //     method: "post",
    //     headers : {
    //         "Authorization" : `Bearer ${localStorage.getItem("token")}`
    //     }
    // })
    // localStorage.setItem("token", null)
    // if(loginRes?.data?.token){
    //     localStorage.setItem("token", loginRes?.data?.token)
    // }
    localStorage.setItem("token", null)
    return { status: true } //loginRes.data
}

export const viewAllCourses = async() => {
    const courses = await axios({
        method: "get",
        url: `${url}/courses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const viewCourse = async(id) => {
    const courses = await axios({
        method: "get",
        url: `${url}/courses/${id}`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const purchaseCourse = async(id) => {
    const courses = await axios({
        method: "post",
        url: `${url}/courses/${id}`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const fetchPurchasedCourse = async() => {
    const courses = await axios({
        method: "get",
        url: `${url}/purchasedCourses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const loginStatus = async() => {
    const status = await axios({
        method: 'get',
        url: `${url}/me`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return status.data;
}