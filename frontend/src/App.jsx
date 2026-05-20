import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import Welcome from './components/joblist/Welcome'
import Home from './components/Home'
import Layout from './components/Layout/Layout'
import AddJob from './components/joblist/AddJob'
import Joblist from './components/joblist/Joblist'
import Reminder from './components/joblist/Reminder'
import Report from './components/joblist/Report'
import Dashboard from './components/Dashboard/Dashboard'
import AuthProvider from './components/Auth/AuthContext'
import { JobProvider } from './components/Auth/JobContext'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <AuthProvider>
      <JobProvider>
<Routes>
              <Route path="/" element={<Navigate to="/app/addJob" />} />

      <Route path="/app" element={<Welcome />}>
<Route path="addJob" element={<AddJob/>}/>
<Route path='jobs' element={<Joblist/>}/>
<Route path='reminder' element={<Reminder/>}/>
<Route path='report' element={<Report/>}/>
<Route path='dashboard' element={<Dashboard/>}/>
      </Route>
            <Route path='/login' element={<Home/>}></Route>

    </Routes>  
    </JobProvider>
    </AuthProvider>  
      <ToastContainer />

    </>
  )
}

export default App
