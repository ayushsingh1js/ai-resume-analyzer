import React from 'react'
import { useContext } from 'react'
import { InterviewContext } from './Interviewcontext'

const Roadmap = () => {

  const { report, loading } = useContext(InterviewContext)
console.log(report)
console.log(report?.report)
console.log(report?.preparationplan)
if (loading) return <p>Loading....</p>
  if (!report) return <p>Report not found</p>
  if (!report.preparationplan) return <p>No roadmap available</p>
  return (
    <div className='space-y-6'>

      <h1 className='text-2xl font-bold border-b-2 border-amber-50 p-2 mb-6'>
        RoadMap
      </h1>

      {report.preparationplan.map((q, index) => (

        <div
          key={index}
          className='glass p-5 rounded-2xl'
        >

          <p className='mt-2 text-gray-300 space-y-2'>
            Day {q.day}: {q.focus}
          </p>

          <ul className='list-disc pl-5'>

            {q.tasks.map((task, tindex) => (

              <li key={tindex}>
                {task.task}
              </li>

            ))}

          </ul>

        </div>

      ))}

    </div>
  )
}

export default Roadmap