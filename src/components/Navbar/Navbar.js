import React,{useState,useEffect} from 'react'
import {AppBar,Avatar,Toolbar,Typography,Button} from "@material-ui/core"
import useStyles from "./styles"
import memories from "../../images/memories-Logo.png"
import memoriesText from "../../images/memories-Text.png"

import {Link, useLocation,useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import decode from "jwt-decode"

const Navbar = () => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    
    const logout = ()=>{
      dispatch({type:"LOGOUT"})
      history.push('/auth')
      setUser(null)
   }
    
   useEffect(()=>{
      const token  = user?.token
      if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 2000< new Date().getTime()) logout()
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    
   
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          
          <Link to = "/" className = {classes.brandContainer}>
            <img  src={memoriesText} alt="icon" height="45px" /> 
            <img className={classes.image} src={memories} alt="icon" height="40px" />   
          </Link>
         
         <Toolbar className = {classes.toolbar}>
         {user?.result ?(
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.image}>{user?.result.name.charAt(0)}</Avatar>
            
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            
            <Button variant="contained" className={classes.logout} onClick = {logout} color="secondary" >Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
         </Toolbar>

       </AppBar>
    )
}

export default Navbar
