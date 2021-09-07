import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Paper,Typography,Divider,CircularProgress} from "@material-ui/core"
import moment from "moment"
import {useParams,useHistory} from "react-router-dom"
import useStyles from "./styles"
import {getPost,getPostsBySearch} from "../../actions/posts"
const PostDetails = () => {
    const classes = useStyles()
    const history = useHistory()
    const {id} = useParams()
    const dispatch = useDispatch()
    const {isLoading,posts,post} = useSelector((state)=>state.posts)
    
    const openPost = (_id) => history.push(`/posts/detail/${_id}`);
    
    const recommendedPosts = posts?.filter(posts=>posts?._id !== post?._id)

    const time = (day)=>{
      // eslint-disable-next-line default-case
      switch (day) {
        case 0:
          return "January"
        case 1:
          return "February"
        case 2:
          return "March"
        case 3:
          return "April"
        case 4:
          return "May"
        case 5:
          return "June"
        case 6:
          return "July"
        case 7:
          return "August"
        case 8:
          return "September"    
        case 9:
          return "October"
        case 10:
          return "November"
        case 11:
          return "December"
      }
    }

    useEffect(()=>{
        dispatch(getPost(id))
     },[id])

    useEffect(()=>{
       if(post){
         dispatch(getPostsBySearch(post?.title))
       }
    },[post])
   
    if(!post)return null
    
    if(isLoading){
       return(
           <Paper className = {classes.loadingPaper}>
             <CircularProgress size = "7em"/>
           </Paper>
       )
    }
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post?.creator}</Typography>
          <Typography variant="body1">{`${moment(post.createdAt).date()} of ${time(moment(post.createdAt).month())}`}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={`https://memory-port.herokuapp.com/images/${post.image}`} alt={post.title} />
        </div>
      </div>

      {!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, image, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={`https://memory-port.herokuapp.com/images/${image}`} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
      </Paper>
    )
}

export default PostDetails
