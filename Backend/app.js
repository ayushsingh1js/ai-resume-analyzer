import express from 'express'
import authroute from './Routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import interviewRouter from './Routes/interview.routes.js'
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173",  
  credentials: true              }))
app.use("/api/auth",authroute)
app.use("/api/interview",interviewRouter)
export default app;