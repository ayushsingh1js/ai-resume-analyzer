import React from 'react'
import { useContext } from 'react'
import { InterviewContext } from './Interviewcontext.jsx'
const Behavioralquestions = () => {
  const {report,loading}=useContext(InterviewContext)
  return (
    <div>
      <div className='flex flex-col gap-5' >
        <h1 className='text-2xl font-bold border-b-2 border-amber-50 p-2 mb-6'>Behavioral Questions</h1>
    {
report.behavioralquestions.map((q,index)=>(

  <details key={index} className='glass p-4 rounded-2xl w-full'>

        <summary className='cursor-pointer font-semibold text-lg'>
{q.question}
        </summary>

        <div className='mt-4 flex flex-col gap-3'>

          <div>
            <p className='text-orange-400 font-semibold'>
              Intention
            </p>

            <p className='text-gray-300'>
             {q.intention}
            </p>
          </div>

          <div>
            <p className='text-orange-400 font-semibold'>
              Answer
            </p>

            <p className='text-gray-300'>
              {q.answer}
            </p>
          </div>

        </div>

      </details>
))
    }
         </div>
    </div>
  )
}

export default Behavioralquestions
