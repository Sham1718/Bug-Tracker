import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";
import IssueList from './pages/IssueList';
import ProjectSetting from './pages/ProjectSetting'
import { Navigate } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>

  
       <Route
  path="/"
  element={
    localStorage.getItem("token")
      ? <Navigate to="/dashboard" replace />
      : <Login />
  }
/>
        <Route path="/register" element={<Register />} />

     
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/createProject"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId/createIssue"
          element={
            <ProtectedRoute>
              <CreateIssue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/issues"
          element={
            <ProtectedRoute>
              <IssueList/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:projectId/:issueId"
          element={
            <ProtectedRoute>
              <IssueDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/settings"
          element={
            <ProtectedRoute>
              <ProjectSetting/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
