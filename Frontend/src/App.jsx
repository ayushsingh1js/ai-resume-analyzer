import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../routes/auth/pages/Login'
import Register from '../routes/auth/pages/Register'
import Homepage from '../routes/auth/pages/Homepage'
import ProtectedRoute from '../routes/auth/components/Protected'
import Resumeupload from '../routes/interview/pages/Resumeupload'
import Interview from '../routes/interview/pages/Interview'
import TechnicalQuestions from '../routes/interview/pages/TechnicalQuestions.jsx'
import Behavioralquestions from '../routes/interview/pages/Behavioralquestions.jsx'
import Roadmap from '../routes/interview/pages/Roadmap.jsx'
import Interviewcontext from '../routes/interview/pages/Interviewcontext.jsx'
import Dashboard from '../routes/interview/pages/Dashboard.jsx'
const App = () => {
  return (
    <div className='hero'>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
        <Route path="/resumeupload" element={<Resumeupload/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/interview/:id" element={<Interviewcontext><Interview/></Interviewcontext>} >
        <Route path="technicalQuestions" element={<TechnicalQuestions/>} />
        <Route path="behavioralQuestions" element={<Behavioralquestions/>} />
        <Route path="Roadmap" element={<Roadmap/>} />

        </Route>
      </Routes>
    </div>
  )
}

export default App
