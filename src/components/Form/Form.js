import React, { useState,useEffect } from 'react'
import {Typography,TextField,Paper, Button} from "@material-ui/core"
import useStyles from "./styles"
import {useDispatch} from "react-redux"
import {createPost,updatePost} from "../../actions/posts"
import { useSelector } from 'react-redux'
import {useHistory} from "react-router-dom"

const Form = ({currentId,setCurrentId}) => {
    const history = useHistory()    
    const [errorMessage,setErrorMessage] = useState(false)

    const imageInputRef = React.useRef();
    
    const [postData,setPostData] = useState({title:"",message:"",tags:"",selectedFile:null})
    
    const post = useSelector((state)=>currentId ? state.posts.posts.find(post=>post._id === currentId):null)   
   
    const classes = useStyles()
    
    const dispatch = useDispatch()   
   
    useEffect(()=>{
       if(post) setPostData({title:post.title,message:post.message,tags:post.tags,selectedFile:null})
    },[post])
   
    const handleSubmit = (e)=>{
       e.preventDefault()
       const formData = new FormData()
       formData.append("title",postData.title)
       formData.append("message",postData.message)
       formData.append("tags",postData.tags)
       formData.append("image",postData.selectedFile)

       if(currentId){   
        dispatch(updatePost(currentId,formData,setErrorMessage))
        setCurrentId(null)
       }else{
         dispatch(createPost(formData,setErrorMessage,history))
       }
        clear()
    }
    const clear = ()=>{
        setErrorMessage(false)
        setCurrentId(null)
        imageInputRef.current.value = ""
        setPostData({title:"",message:"",tags:"",selectedFile:null})
    }
    
    if(errorMessage){
        setTimeout(() => {
           setErrorMessage(false)
        }, 3000);
    }

    const user = JSON.parse(localStorage.getItem('profile'))
    if(!user){
        return (
            <Paper className = {classes.paper}>
             <Typography variant = "h6" align = "center">
                 Please Sign In to create your own memories and like others' memories
             </Typography>
            </Paper>
        )
    }

    return (
        <Paper className = {classes.paper} elevation = {6}>
            <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>

               <Typography variant = "h6">{currentId ? "Editing a Memory":"Creating a Memory"}</Typography>
               {errorMessage && <Typography style ={{color:'red'}} variant = "h6" color = "textSecondary">please insert correctly</Typography>}
               <TextField name = "title" label = "Title" variant = "standard" fullWidth value = {postData.title} onChange = {(e)=>setPostData({...postData,title:e.target.value})}/>

               <TextField name = "message" label = "Message" variant = "standard" fullWidth value = {postData.message} onChange = {(e)=>setPostData({...postData,message:e.target.value})}/>

               <TextField name = "tags" label = "Tags" variant = "standard" fullWidth value = {postData.tags} onChange = {(e)=>setPostData({...postData,tags:e.target.value.split(" ")})}/>
               
               <div className = {classes.fileInput}>
                 <input type="file" ref = {imageInputRef} name="image"  onChange = {(e)=>{
                     return setPostData({...postData,selectedFile:e.target.files[0]})
                 }} />
               </div>

               <Button variant = "contained" color = "primary"  fullWidth type = "submit" className = {classes.buttonSubmit}>Submit</Button>
               <Button fullWidth variant = "contained" color = "secondary" size = "small" type = "button" onClick = {clear}>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form
