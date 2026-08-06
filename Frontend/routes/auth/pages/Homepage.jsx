import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2,duration:0.5}} className='flex flex-col gap-2 justify-center items-center text-center px-10 py-20 text-white'>
     
      <p className="text-orange-600 font-semibold tracking-widest text-m">ANALYZE. PREPARE. GET HIRED.</p>
      <div>
        <h1 className='text-6xl font-bold mt-5'>Ace Your Next Interview</h1>
<h1 className='text-6xl font-bold mt-5'>With AI-Powered Insights!</h1>
      </div>
      <p className='mt-3 text-lg opacity-80 max-w-xl'>Upload your resume, get personalized interview questions,
skill gap analysis, and a day-wise preparation plan.</p>
<Link to="/dashboard"><motion.button whileHover={{boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)"
              }} className='mt-5 px-2 py-4 rounded-2xl text-lg text-white font-semibold bg-orange-600'> Analyze My Resume →</motion.button></Link>
    </motion.div>
  )
}

export default Homepage
