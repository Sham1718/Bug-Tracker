
import './App.css'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Navbar from'./components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'
import ProjectDetails from './pages/ProjectDetails'
import CreateProject from './pages/CreateProject'
import Projects from './pages/Projects'
import CreateIssue from './pages/CreateIssue'
import IssueDetails from './pages/IssueDetails'


function App() {
 

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<ProtectedRoute>
          <DashBoard/>
        </ProtectedRoute>}/>
        <Route path='/projectDetails' element={
          <ProtectedRoute>
            <ProjectDetails/>
          </ProtectedRoute>
        }
         />
         <Route path='/createProject' element={
          <ProtectedRoute>
            <CreateProject/>
          </ProtectedRoute>
        }
         />
         <Route path='/projects' element={
          <ProtectedRoute>
            <Projects/>
          </ProtectedRoute>
        }
         />
         <Route path='/projects/:projectId' element={
          <ProtectedRoute>
            <ProjectDetails/>
          </ProtectedRoute>
        }
         />
         <Route path='/projects/:projectId/createIssue' element={
          <ProtectedRoute>
            <CreateIssue/>
          </ProtectedRoute>
        }
         />
         <Route path='/projects/:projectId/:issueId' element={
          <ProtectedRoute>
            <IssueDetails/>
          </ProtectedRoute>
        }
         />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
