import express, { Router } from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import db from '../db.js'
import authUser from '../middleware/auth.middleware.js'
const router=Router()

router.post("/register",(req,res)=>{
        const {username,email,password}=req.body
        db.query("SELECT * FROM user WHERE email=? OR username=?",[email,username],async (err,result)=>{
            if(err){
              res.status(401).json({
            message:"error occured",
            error:err,
        })  
            }else{
                if(result.length>0){
                    res.status(402).json({message:"user already registered"})
                }else{
const hashedpassword=await bcrypt.hash(password,10)
db.query("INSERT INTO user(username,email,password) VALUES(?,?,?)",[username,email,hashedpassword],(err,result)=>{
    if(err){
        res.status(401).json({
            error:err
        })
    }else{
        const token=jwt.sign({
            id:result.insertId,
            username:username
        },process.env.JWT_SECRET_KEY)
        res.cookie("token",token)
        res.status(201).json({
            message:"user registered successfully"
        })
        
    }
})
                }
            }
        })
    
})
router.post("/login", (req, res) => {
    const { identifier, password } = req.body
    db.query("SELECT * FROM user WHERE username=? OR email=?", [identifier, identifier], async (err, result) => {
        if (err) {
            return res.json({ message: "error", error: err })
        }
        if (result.length == 0) {
            return res.status(401).json({ message: "user not registered" })
        }

        const user = result[0]
        const isMatch = await bcrypt.compare(password, user.PASSWORD)

        if (!isMatch) {
            return res.json({ message: "incorrect password" })
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        )
        res.cookie("token", token)
        return res.json({ message: "login successful" })
    })  
})      
router.get("/logout",authUser,(req,res)=>{
const token=req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Not logged in" })
    }
if(token){
    db.query("INSERT INTO blacklist(token) VALUES(?)",[token],(err,result)=>{
        if(!err){
            res.clearCookie("token")
            res.json({
                message:"user logged out"
            })
        }else{
            res.json({
                message:"error occured"
            })
        }
    })
}
})
router.get("/getme",authUser,(req,res)=>{
    db.query("SELECT id, username, email FROM user WHERE id=?",[req.user.id],(err,result)=>{
        if(err){
            res.json({
                message:"error"
            })
        }else{
            res.json({
                rows:result
            })
        }
    })
})

export default router