import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from '../services/auth.context.jsx'
import Interviewcontext from '../routes/interview/pages/Interviewcontext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    
      <BrowserRouter> 
      
        <App/>
      
      
    </BrowserRouter>
   
  
  </AuthProvider>
)
