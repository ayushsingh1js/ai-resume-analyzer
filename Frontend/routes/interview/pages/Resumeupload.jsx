import React from 'react'
import { SquareMousePointer, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { LineSpinner } from 'ldrs/react'
import 'ldrs/react/LineSpinner.css'

const Resumeupload = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData(e.target)
      const response = await axios.post("http://localhost:3000/api/interview/", formData, {
        withCredentials: true
      })
      console.log(response.data)
      navigate(`/interview/${response.data.reportId}/technicalQuestions`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div className='h-screen flex justify-center items-center flex-col'>
      <h1 className='text-4xl mb-4 text-amber-50 font-bold'>
        Create Your Custom <span className='text-orange-600'>Interview Plan</span>
      </h1>
      <p className='text-gray-400 opacity-55'>Let our AI analyse the job requirements and your unique profile to</p>
      <p className='text-gray-400 opacity-55 mb-5'>build a winning stratergy</p>

      <form onSubmit={handleSubmit} className='text-white glass p-8 gap-6 max-w-6xl w-full rounded-2xl flex flex-col h-[70%]'>

        <div className='flex gap-6 flex-1'>
          <div className='w-1/2 gap-3 flex flex-col overflow-hidden'>
            <div className='flex gap-2 items-center'>
              <SquareMousePointer size={18} />
              <p className='font-semibold'>Target Job Description</p>
            </div>
            <textarea
              className='glass-input rounded-xl resize-none placeholder-gray-400 outline-0 flex-1 min-h-full px-2 py-3 mt-2'
              name="jobdescription" required
              placeholder="e.g. Full Stack Developer at a startup..."
            />
          </div>

          <div className='flex flex-col w-1/2 gap-3'>
            <div className='flex gap-2 items-center'>
              <User size={18} />
              <p className='font-semibold'>Your Profile</p>
            </div>
            <div>
              <label className='text-sm opacity-70' htmlFor='resume'>Upload Resume(PDF)</label>
              <input
                className='glass-input w-full rounded-xl outline-0 px-3 py-2 mt-1'
                type='file' required
                name="resume"
                accept=".pdf"
              />
            </div>
            <div className='flex flex-col flex-1 gap-1'>
              <label className='text-sm opacity-70' htmlFor='selfdescription'>Quick Self Description</label>
              <textarea
                className='glass-input rounded-xl flex-1 px-3 py-2 resize-none outline-0'
                name="selfdescription" required
                placeholder="e.g. I am a 2nd year CS student with React experience..."
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={!loading ? {
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.15)",
            scale: 1.01,
          } : {}}
          disabled={loading}
          type="submit"
          className='submitbutton mt-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {loading ? (
            <>
              <LineSpinner size="20" stroke="2" speed="1" color="white" />
              Generating your plan...
            </>
          ) : (
            'Generate My Interview Strategy'
          )}
        </motion.button>

      </form>
    </motion.div>
  )
}

export default Resumeupload