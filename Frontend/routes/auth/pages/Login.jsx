import React from 'react'
import {motion} from 'framer-motion'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState,useContext } from 'react'
import { AuthContext } from '../../../services/auth.context'
const Login = () => {
  const { user, setUser,loading,setloading } = useContext(AuthContext)
    const [identifier,setidentifier]=useState("")
        const [password,setpassword]=useState("")
    const navigate=useNavigate()
    
   async function handleSubmit(e){
        e.preventDefault()
        setloading(true)
        try{const response=await axios.post("http://localhost:3000/api/auth/login",{
            identifier,password
        },{withCredentials:true})
        
        
      const userresponse=await axios.get("http://localhost:3000/api/auth/getme",{
        withCredentials:true
      })
      setUser(userresponse.data.rows[0])
    console.log(userresponse.data.rows[0])
  navigate("/")}
     
catch(err){
console.log(err.response.data.message)
}finally{
  setloading(false)
}
    }
  return (
    <motion.div className='auth' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.8}}>
    <h1 className='mainheading'>Login</h1>
    <form onSubmit={handleSubmit}>
        <div className='inputs'>
            <label htmlFor='email'>Email Or Username</label>
            <motion.input onChange={(e)=>{
                setidentifier(e.target.value)
            }} whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
            }} type="email" name="identifier" value={identifier} placeholder='Enter Email Or Username'></motion.input>
        </div>
         <div className='inputs'>
            <label htmlFor='password'>Password</label>
            <motion.input whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
            }} type="password" onChange={(e) => setpassword(e.target.value)} value={password} name="password" placeholder='Enter Password'></motion.input>
        </div>
        <motion.button  whileHover={{
              boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)",
              scale:1.01,
            }} className='submitbutton'>Login</motion.button>
    </form>
    <p>Does'nt have an account <Link to={"/register"}>Register</Link></p>
    </motion.div>
  )
}

export default Login
