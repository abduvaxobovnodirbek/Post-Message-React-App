import * as api from "../api/Api"

export const signin = (formData,history,setErrorMessage)=> async (dispatch)=>{
    try {
        const {data} = await api.signin(formData)
        dispatch({type:"AUTH", data})
        history.push("/posts")
    } catch (error) {
        setErrorMessage(true)
        console.log(error,"signin Error")
    }
}

export const signup = (formData,history,setErrorMessage)=> async (dispatch)=>{
    try {
        const {data} = await api.signup(formData)
        dispatch({type:"AUTH", data})
        history.push("/posts")
    } catch (error) {
        setErrorMessage(true)
        console.log(error,"signup Error")
    }
}


