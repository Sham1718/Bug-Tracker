
import './App.css'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Navbar from'./components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'


function App() {
 

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
