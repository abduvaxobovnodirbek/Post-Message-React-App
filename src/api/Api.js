import axios from "axios"

const API = axios.create({baseURL:"https://memory-port.herokuapp.com"})


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization  = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


//for posts
export const fetchPosts = (page)=> API.get(`/posts?page=${page}`)

export const fetchPost = (id)=> API.get(`/posts/detail/${id}`)

export const fetchPostsBySearch = (searchTitle)=> API.get(`/posts/search?searchQuery=${searchTitle}`)

export const createPost = (newPost)=> API.post(`/posts`,newPost)

export const updatePost = (id,updatedPost)=> API.patch(`/posts/${id}`,updatedPost)

export const deletePost = (id)=> API.delete(`/posts/${id}`)

export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)


//for users
export const signin = (formData)=> API.post(`/user/signin`,formData)

export const signup = (formData)=> API.post(`/user/signup`,formData)
