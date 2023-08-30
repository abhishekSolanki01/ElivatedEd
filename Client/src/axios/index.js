import axios from "axios"
const url = `/users` //"http://localhost:3000/users"
const admin_url = `/admin` //"http://localhost:3000/admin"

export const register = async(data, isAdmin = false) => {
    let URL = isAdmin ? admin_url : url;
    const registerRes = await axios.post(`${URL}/signup`, data);
    if(registerRes?.data?.token){
        localStorage.setItem("token", registerRes?.data?.token)
    }
    if(registerRes.status === 200){
        localStorage.setItem("isAdmin", isAdmin)
    }
    return registerRes.data
}

export const login = async (data, isAdmin=false) => {
    let URL = isAdmin ? admin_url : url;
    const loginRes = await axios({
        url : `${URL}/login`,
        method: "post",
        headers: data
    })
    if(loginRes?.data?.token){
        localStorage.setItem("token", loginRes?.data?.token)
    }
    if(loginRes.status === 200){
        localStorage.setItem("isAdmin", isAdmin)
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
    let isAdmin = localStorage.getItem('isAdmin');
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const courses = await axios({
        method: "get",
        url: `${URL}/courses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const viewCourse = async(id) => {
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const courses = await axios({
        method: "get",
        url: `${URL}/courses/${id}`,
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
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const status = await axios({
        method: 'get',
        url: `${URL}/me`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return status.data;
}

// admin routes

export const editCourse = async(param, body) =>{
    const editCourseRes = await axios({
        method: 'put',
        url: `${admin_url}/courses/${param}`,
        data : body,
        headers: { 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return editCourseRes.data
}