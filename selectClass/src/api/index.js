import request from '../utils/request';
import Vue from 'vue';
import axios from 'axios'
new Vue({
    axios  // 加入axios
})
Vue.prototype.axios = axios
export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}
const baseURL = 'http://47.102.205.190:8080/';
//const baseURL = 'http://www.nishishei.xyz/';
export const sendPostRequest = (url,query) => {
    return axios({
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: url,
        data: JSON.stringify(query)
    })
}

export const sendGetRequest = (url) => {
    return axios.get(url)
}
export const sendPutRequest = (url,query) => {
    return axios({
        method: 'Put',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: url,
        data: JSON.stringify(query)
    })
}
export const postLogin = (query) => {      //  登录
    return axios({
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: baseURL + 'xk/teacher/login',
        data: JSON.stringify(query)
    })
}
export const postCourseSelectionInformation = (query) => {      //  发布(修改)选课信息
    return axios({
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: baseURL + 'xk/course/addCourseJ',
        data: JSON.stringify(query)
    })
}
export const deleteCourseInformation = (id) => {        //删除选课信息
    return axios.get(baseURL + 'xk/course/delCourse?id=' + id)
}

export const getCourseInformation = (query) => {      //获取选课课程信息
    return axios({
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: baseURL + 'xk/course/findByTeaher',
        data: JSON.stringify(query)
    })
}

export const getStudentInformation = (url,aid,cid,pageIndex,pageSize) => {      //获取选课学生信息
    return axios.get(baseURL + 'xk/' + url + '?aid=' + aid + '&cid=' + cid + '&pageNum=' + pageIndex + '&pageSize=' + pageSize)
}

export const DownloadExcel = (query) => {      //下载选课信息
    return axios({
        method: 'POST',
        headers:
            {
                'Content-Type': 'application/json',
            },
        url: baseURL + 'xk/download/batch',
        data: JSON.stringify(query)
    })
}