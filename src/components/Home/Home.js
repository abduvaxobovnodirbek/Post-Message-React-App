import React,{useState} from 'react'
import {useDispatch} from "react-redux"
import {Container,Grid,Grow,Paper,TextField,AppBar,Button} from "@material-ui/core"
import {getPostsBySearch} from "../../actions/posts"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import Paginate from '../Pagination'
import {useHistory,useLocation} from "react-router-dom"
import useStyles from "./styles"

const Home = () => {
  const classes = useStyles()
  const useQuery = ()=>{
    return new URLSearchParams(useLocation().search)
  }

  const [searchTitle,setSearchTitle] = useState("")

  const [currentId,setCurrentId] = useState(null)
  const dispatch = useDispatch()
  
  const history = useHistory()
  const query = useQuery()

  const page = query.get("page") || 1
  const searchQuery = query.get("searchQuery")


  const searchPost  = ()=>{
     if(searchTitle.trim()){
        dispatch(getPostsBySearch(searchTitle))
        history.push(`/posts/search?searchQuery=${searchTitle}`)
     }else{
       history.push("/")
     }
  }
    return (
        <Grow in>
        <Container maxWidth = "xl">
          <Grid container justifyContent="space-between" className = {classes.gridContainer} alignItems="stretch" spacing={3}>
          
          <Grid item xs={12} sm={6} md = {9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={6} md= {3}>
            <AppBar className = {classes.appBarSearch} position = "static" color = "inherit">
              <TextField name = "searchTitle" variant = "standard" label = "Search by Title" fullWidth value = {searchTitle} onChange = {(e)=>setSearchTitle(e.target.value)}/>
              <Button onClick = {searchPost} variant = "contained" color = "primary" size = "small" style = {{marginTop:"10px"}}>
                Search Post
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation = {6} className = {classes.pagination}>
              <Paginate page = {page}/>
            </Paper>
          </Grid>

          </Grid>
        </Container>
        </Grow>
    )
}

export default Home
