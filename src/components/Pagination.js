import React, { useEffect } from 'react'
import {Pagination,PaginationItem} from "@material-ui/lab"
import useStyles from "./styles"
import { Link } from 'react-router-dom'
import {getPosts} from "../actions/posts"
import {useDispatch,useSelector} from "react-redux"

const Paginate = ({page}) => {
    const {numberOfPage}  = useSelector((state)=>state.posts)
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(()=>{
      if(page) dispatch(getPosts(page))
    },[page])

    return (
        <Pagination
          classes = {{ul:classes.ul}}
          count = {numberOfPage}
          page = {Number(page)}
          variant = "outlined"
          color = "primary"
          renderItem = {(item)=>(
              <PaginationItem {...item} component = {Link} to = {`/posts?page=${item.page}`} />
          )}
        />
                
    )
}

export default Paginate
