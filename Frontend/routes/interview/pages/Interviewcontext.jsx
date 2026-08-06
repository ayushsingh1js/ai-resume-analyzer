import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { LineSpinner } from 'ldrs/react'
import 'ldrs/react/LineSpinner.css'
export const InterviewContext=createContext()
const Interviewcontext = ({children}) => {
    const [report,setreport]=useState(null)
    const [loading,setloading]=useState(false)
    const { id } = useParams()
    useEffect(() => {
    const fetchReport = async () => {
        try {
            setloading(true)
            const res = await axios.get(`http://localhost:3000/api/interview/report/${id}`, { withCredentials: true })
            setreport(res.data)
        } catch(err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
   if (id) {
      fetchReport()
    }
}, [id])
  return (
    
      <InterviewContext.Provider value={{report,setreport,loading,setloading}}>
         {loading ? (
      <div className='min-h-screen w-screen flex items-center justify-center'>
        <LineSpinner size="40" stroke="3" speed="1" color="white" />
      </div>
    ) : (
      children
    )}
      </InterviewContext.Provider>
    
  )
}

export default Interviewcontext
