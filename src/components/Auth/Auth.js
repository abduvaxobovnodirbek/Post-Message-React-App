import React,{useState} from 'react'
import {Paper,Avatar,Button,Grid,Typography,Container} from "@material-ui/core"
import useStyles from "./styles"
import { LockOutlined } from '@material-ui/icons'
import Input from './Input'
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {signup,signin} from "../../actions/auth"

const Auth = () => {
    const initialState = {firstName:"",lastName:"",email:"",password:"",confirmPassword:""}
    const [showPassword,setShowPassword] = useState(false)
    const [isSignup,setIsSignup] = useState(false) 
    const [formData,setFormData] = useState(initialState)
    const [errorMessage,setErrorMessage] = useState(false)

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e)=>{
       e.preventDefault()

       if(isSignup){
          dispatch(signup(formData,history,setErrorMessage))
       }else{
           dispatch(signin(formData,history,setErrorMessage))
       }
    }

    const handleChange = (e)=>{
       setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleShowPassword = ()=>{
       setShowPassword(prev=>!prev)
    }

    const switchMode = ()=>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }
    if(errorMessage){
      setTimeout(()=>{
        setErrorMessage(false)
      },3000)
    }
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined/>
          </Avatar>
          <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          {errorMessage && <Typography component="h1" style = {{color:"red"}} variant="h5">invalid password or email</Typography>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignup && (
              <>
                <Input
                  name="firstName" 
                  label="First Name" 
                  handleChange={handleChange} autoFocus half />

                <Input 
                  name="lastName" 
                  label="Last Name" 
                  handleChange={handleChange} half />
              </>
              )}
              <Input 
               name="email" 
               label="Email Address" 
               handleChange={handleChange} type="email" />

              <Input 
               name="password" 
               label="Password" 
               handleChange={handleChange} 
               type={showPassword ? 'text' : 'password'} 
               handleShowPassword={handleShowPassword} />

              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }

            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item >
                <Button onClick={switchMode} style = {{backgroundColor:"#f5f5f5"}}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    )
}

export default Auth
