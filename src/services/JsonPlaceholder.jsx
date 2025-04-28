import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
})

//#region Posts
export const listPosts = async () => {
    return axiosInstance.get('/posts')
}

export const getPost = async (id) => {
    return axiosInstance.get(`/posts/${id}`)
}

export const createPost = async (data) => {
    return axiosInstance.post('/posts', data)
}

export const editPost = async (id, data) => {
    return axiosInstance.put(`/posts/${id}`, data)
}

export const deletePost = async (id) => {
    return axiosInstance.delete(`/posts/${id}`)
}
//#endregion

//#region Users
export const getUser = async (id) => {
    return axiosInstance.get(`/users/${id}`)
}
//#endregion