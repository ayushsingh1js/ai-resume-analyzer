import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../services/auth.context'
const Register = () => {
     const { setUser } = useContext(AuthContext)
    const navigate=useNavigate()
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    async function handleSubmit(e){
try{
    e.preventDefault()
const response=await axios.post("http://localhost:3000/api/auth/register",{
    username,email,password
},{withCredentials:true})
 const userresponse=await axios.get("http://localhost:3000/api/auth/getme",{
        withCredentials:true
      })
      setUser(userresponse.data.rows[0])
    console.log(userresponse.data.rows[0])
  navigate("/")
}catch(err){
    console.log(err.response?.data?.message || err.message)
  
}
    }
  return (
    <motion.div className='auth' 
    initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.8}}>
    <h1  className='mainheading'>Register</h1>
    <form onSubmit={handleSubmit}>
        <div className='inputs'>
            <label htmlFor='email'>Email</label>
            <motion.input whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
            }} onChange={(e)=>{
                setemail(e.target.value)
            }}  type="email" value={email} name="email" placeholder='Enter Email'></motion.input>
        </div>
        <div className='inputs'>
            <label htmlFor='username'>Username</label>
            <motion.input onChange={(e)=>{
                setusername(e.target.value)
            }} whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
            }} type="text" name="username" value={username} placeholder='Enter Username'></motion.input>
        </div>
         <div className='inputs'>
            <label htmlFor='password'>Password</label>
            <motion.input onChange={(e)=>{
                setpassword(e.target.value)
            }} whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
            }} type="password" value={password} name="password" placeholder='Enter Password'></motion.input>
        </div>
        <motion.button whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)",
              scale:1.01,
            }} className='submitbutton'>Register</motion.button>
    </form>
    <p>Already have an account <Link to={"/login"}>Login</Link></p>
    </motion.div>
  )
}

export default Register
