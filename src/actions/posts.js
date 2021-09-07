import * as api from "../api/Api"



export const getPost = (id)=> async (dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})
        
        const {data} = await api.fetchPost(id)
        dispatch({type:"FETCH_POST",payLoad:data})
 
        dispatch({type:"END_LOADING"})
    } catch (error) {
        console.log(error,"getPost error");
    }
 }

export const getPosts = (page)=> async (dispatch)=>{
   try {
       dispatch({type:"START_LOADING"})
       
       const {data} = await api.fetchPosts(page)
       dispatch({type:"FETCH_ALL",payLoad:data})

       dispatch({type:"END_LOADING"})
   } catch (error) {
       console.log(error,"getPosts error");
   }
}

export const getPostsBySearch = (searchTitle)=> async (dispatch)=>{
    try {
        dispatch({type:"START_LOADING"})

        const {data} = await api.fetchPostsBySearch(searchTitle)
        dispatch({type:"SEARCH",payLoad:data})
        
        dispatch({type:"END_LOADING"})

    } catch (error) {
        console.log(error,"getPostBySearch error");
    }
 }

export const createPost = (newPost,setErrorMessage,history)=> async (dispatch)=>{
    try {
        const {data} = await api.createPost(newPost)
        dispatch({type:"CREATE",payLoad:data})
        history.push(`/posts/detail/${data._id}`)
    } catch (error) {
        setErrorMessage(true)
        console.log(error,"createPost error");
    }
 }

 export const updatePost = (id,updatedPost,setErrorMessage)=> async (dispatch)=>{
    try {
        const {data} = await api.updatePost(id,updatedPost)
        dispatch({type:"UPDATE",payLoad:data})
    } catch (error) {
        setErrorMessage(true)
        console.log(error,"UpdatePost error");
    }
 }

 export const deletePost = (id)=> async (dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch({type:"DELETE",payLoad:id})
    } catch (error) {
        console.log(error,"DeletePost error");
    }
 }

 export const likePost = (id)=> async (dispatch)=>{
    try {
        const {data} = await api.likePost(id)
        dispatch({type:"LIKEPOST",payLoad:data})
    } catch (error) {
        console.log(error,"LikePost error");
    }
 }