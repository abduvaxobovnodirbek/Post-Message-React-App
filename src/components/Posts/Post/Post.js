import React from 'react'
import useStyles from "./styles"
import {Card, CardActions,CardMedia,Button,Typography, CardContent,ButtonBase} from "@material-ui/core"
import {ThumbUpAlt} from "@material-ui/icons"
import {Delete} from "@material-ui/icons"
import {MoreHoriz} from "@material-ui/icons"
import moment from "moment"
import {useDispatch} from "react-redux"
import { deletePost,likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'



const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const openPostDetail = ()=>{
      history.push(`/posts/detail/${post._id}`)
    }

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

    return (
      <Card className={classes.card} elevation = {6} raised>
      <ButtonBase className = {classes.cardAction} onClick={openPostDetail} component = "span"> 
 
      <CardMedia className={classes.media} image={`https://memory-port.herokuapp.com/images/${post.image}`} title={post.title} />
      
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{`${moment(post.createdAt).date()} of ${time(moment(post.createdAt).month())}`}</Typography>
      </div>
      
      {user?.result?._id === post.user.toString() ? 
        (<div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHoriz fontSize="medium" />
          </Button>
      </div>): null }
      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}
      </Typography>
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button disabled = {!user && true} size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAlt fontSize="small" /> Like {post.likes.length} </Button>
        
        {
          user?.result?._id === post.user.toString() ? 
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><Delete fontSize="small" /> Delete</Button>:null
        }
      </CardActions>
      
    </Card>
    )
}

export default Post
