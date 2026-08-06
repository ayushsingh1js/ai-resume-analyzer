import jwt from 'jsonwebtoken'
import db from '../db.js'
function authUser(req,res,next){
    const token=req.cookies.token
    if(!token){
        res.json({
            message:"user not logged in"
        })
    }else{
        db.query("SELECT * FROM blacklist WHERE token=?",[token],(err,result)=>{
if(result.length>0){
    res.status(401).json({
        message:"Token expired, please login again"
    })
}else{
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=decoded
        next()
    }catch(err){
        res.json({
            
                message:"error occured"
            
        })
    }
}
        })
        

    }
}
export default authUser