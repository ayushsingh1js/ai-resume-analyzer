import React, { useContext } from 'react'
import { Link ,Outlet} from 'react-router-dom'
import { InterviewContext } from './Interviewcontext'
import { motion } from 'framer-motion'
const Interview = () => {
  const {report,loading}=useContext(InterviewContext)
  if (loading) {
    return <p>Loading....</p>
  }

  if (!report) {
    return <p>Report not found</p>
  }
    const ScoreCircle = ({ percentage }) => {

  let borderColor = 'border-red-500'

  if (percentage >= 40 && percentage < 75) {
    borderColor = 'border-yellow-400';
  
  } else if (percentage >= 75) {
    borderColor = 'border-green-500';
    
  }

  return (
    <div
      className={`w-36 h-36 rounded-full border-8 mt-2 ${borderColor}
      flex items-center justify-center text-3xl font-bold text-white`}
    >
      {percentage}%
      
    </div>
  )
}
const Levelofskill = ({ skilllevel, data }) => {

  let background = ""
const level = skilllevel.trim().toLowerCase()
  if (level === "low") {
    background = "bg-red-500/20 border-red-400/30"
  } 
  else if (level === "medium") {
    background = "bg-yellow-500/20 border-yellow-400/30"
  } 
  else  {
    background = "bg-green-500/20 border-green-400/30"
  }

  return (
    <div
      className={`${background} text-white px-4 py-2 rounded w-fit backdrop-blur-lg shadow-lg`}
    >
      {data}
    </div>
  )
}
  return (
    <div className='min-h-screen w-screen flex text-amber-50 items-stretch'>
      <div className='left-navbar min-h-screen w-[15%] flex flex-col px-4 border-r gap-4 pt-5  border-white/10'>
        <p className='text-white opacity-55'>SECTIONS</p>
        <Link to="technicalQuestions" > Technical Questions</Link>
        <Link to="behavioralQuestions"> Behavioral Questions</Link>
        <Link to="Roadmap" > Roadmap</Link>
        <Link to="/Dashboard" >Dashboard</Link>
      </div>
      <div className='w-[60%] p-6'>
        <Outlet />
      </div>


      <div className='w-[25%] border-l border-white/10 p-4 text-amber-50 '>
        <div className='flex flex-col  items-center gap-2 mt-2 '>
            <h1 className='self-start opacity-80'>MATCH SCORE:</h1>
<ScoreCircle percentage={report.report.matchScore} />
        </div>
        <div className='mt-5 border-t-2'>
        <h1 className='text-lg opacity-80 mb-2 p-2 font-semibold'>SKILL GAPS:</h1>
       <div className='flex flex-wrap gap-2'>
  {report.skillgap.map((q, index) => (
    <Levelofskill
      key={index}
      skilllevel={q.severity}
      data={q.skill}
    />
  ))}
</div>
        <div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Interview
