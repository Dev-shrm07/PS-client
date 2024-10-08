import React, { useState } from "react";
import * as POSTAPI from "../networks/postapi"
import { LoginCred } from "../networks/postapi";
import {User} from "../models/user"
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const Login = ()=>{
    const Navigate = useNavigate()
    const[formData, setFormData] = useState<LoginCred>({
        email:"",
        username:"",
        password:""
    }) 
    const[loading,setLoading] = useState<boolean>(false)
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const onLoggedin= (user:User)=>{
        setLoading(true)
        setFormData({
            username:"",
            email:"",
            password:""
        })
        Navigate("/")
        setLoading(false)
    }
    async function submitData(data: LoginCred){
        try {
            setLoading(true)
            const user = await POSTAPI.Login(data)
            onLoggedin(user)
        } catch (error) {
            console.error(error)
            alert(error)
        }

    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        setLoading(true)
        e.preventDefault();
        let flag :boolean = true
        if(!formData.username?.trim() && !formData.email?.trim()){
            alert("Please enter complete Parameters")
            flag = false
        }
        else if(formData.username?.trim() && formData.email?.trim()){
            setFormData({
                username:formData.username,
                password:formData.password
            })
        }
        else if(!formData.email?.trim()){
            setFormData({
                username:formData.username,
                password:formData.password
            })
        }
        else if(!formData.username?.trim()){
            setFormData({
                email:formData.email,
                password:formData.password
            })
        }
        if(flag){
            submitData(formData)
        }
        
        
    }
    const z = (<div className="login-page">
        <h1 className="login-page-heading">Login</h1>
        <div className="loginpage-container" style={{border:" 0.5px solid #444444"}}>
            <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                <input type="text" name="username" id="1" placeholder="username" className="inp login-inp" value={formData.username} onChange={handleInputChange}/>
                <div className="or"><p style={{color:"#444444"}}>or</p></div>
                <input type="email" name="email" id="2" placeholder="email"className="inp login-inp" value={formData.email} onChange={handleInputChange}/>
                <input type="password" name="password" id="3" placeholder="password" className="inp login-inp" value={formData.password} onChange={handleInputChange}/>
            </form>
            <div className="form-container"></div>
            <div className="sign-up-text"><a href="/signup">new user? register here</a></div>
            <button type="submit" form="login-form" className="btn submit-btn submit-btn-for-login">Login</button>
        </div>
    </div>)
    return(
       <> {loading? <LinearProgress/> : z}</>
    )
}

export default Login