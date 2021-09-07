import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import {useSelector} from "react-redux"
import {Grid,CircularProgress} from "@material-ui/core"

const Posts = ({setCurrentId}) => {
    const {posts,isLoading} = useSelector((state)=>state.posts)
    const classes = useStyles()

    if(!isLoading && !posts.length) return "No Posts"

    return (
        isLoading? <CircularProgress/>:
        (
            <Grid container spacing = {3} alignItems = "stretch" className = {classes.container}>
               {
                posts.map((post)=>(
                    <Grid item xs = {12} sm = {12} md = {6} lg = {3} key = {post._id}>
                        <Post post = {post} setCurrentId = {setCurrentId}/>
                    </Grid>
                ))
               }
            </Grid>
        )
    )
}

export default Posts
