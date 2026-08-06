import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {  useContext } from 'react'
import { AuthContext } from '../../../services/auth.context'
const Dashboard = () => {
  const { setUser } = useContext(AuthContext) 
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:3000/api/interview/reports", { withCredentials: true })
        setReports(res.data.report || [])
      } catch (err) {
        setError("Failed to fetch reports")
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
    setUser(null)
    navigate("/login")
  }

  const scoreColor = (score) => {
    if (score >= 75) return 'text-green-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (loading) return <p className='text-amber-50 text-center mt-20 text-xl'>Loading....</p>
  if (error) return <p className='text-red-400 text-center mt-20 text-xl'>{error}</p>

  
  return (
  <div className='min-h-screen p-10 text-amber-50 flex flex-col w-full' style={{ width: '100vw', minHeight: '100vh', padding: '2.5rem' }}>

    {/* Header */}
    <div className='flex justify-between items-center mb-2 w-full'>
      <h1 className='text-3xl font-bold'>My Interview Reports</h1>
      <button
        onClick={() => navigate("/resumeupload")}
        className='bg-orange-600 text-white px-5 py-3 rounded-2xl text-base font-semibold'
      >
        Analyse New Resume →
      </button>
    </div>

    <div className='border-b-2 border-amber-50 w-full mb-8' />
    
    {reports.length === 0 && (
      <p className='text-center opacity-40 text-xl mt-32'>
        No reports yet. Upload a resume to get started!
      </p>
    )}

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
      {reports.map(r => (
        <div
          key={r.sno}
          onClick={() => navigate(`/interview/${r.sno}/technicalQuestions`)}
          className='glass p-6 rounded-2xl cursor-pointer hover:border-white/30 transition-all'
        >
          <p className='text-xl font-bold text-amber-50 mb-1'>{r.jobDesciption}</p>
          <p className='text-base opacity-60 mb-4'>{r.selfDescription}</p>
          <div className='flex justify-between items-center border-t border-white/10 pt-3'>
            <div>
              <p className='text-xs opacity-60 tracking-widest'>MATCH SCORE</p>
              <p className={`text-xl font-bold ${scoreColor(r.matchScore)}`}>
                {r.matchScore}%
              </p>
            </div>
            <span className='opacity-40 text-xl'>→</span>
          </div>
        </div>
      ))}
    </div>

    <div className='flex-1' />

    <div className='border-t border-white/10 pt-4 mt-8 flex justify-end w-full'>
      <button
        onClick={handleLogout}
        className='text-red-400/70 hover:text-red-400 text-base transition-all'
      >
        Logout
      </button>
    </div>

  </div>
)
}

export default Dashboard