import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import DashBoard from './pages/dashboard'
import TeacherDashBoard from './pages/teacherDashboard'
import Navbar from './components/navbar'
import ProtectedRoute from './components/protectedRoute'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthContext from "./context/authContext"
import API from './api/axios'
import CoursesApp from './components/component2/courses'
import LessonPlayer from './components/component2/lesson'

function App() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token");
        setLoading(false)
        return;
      }
      const res = await API.get("/auth/me");
      const userRole = res.data;
      console.log("hello", userRole)
      setRole(userRole)
    } catch (error) {
      console.log("error has occured", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRole();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Home /> */}
      <AuthContext.Provider value={{ fetchRole, role, setRole, loading }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<><Navbar /><Signup /></>} />
          <Route path='/login' element={<><Navbar /> <Login /></>} />
          {/* <Route path='/dashboard' element={role == "Student" ? <ProtectedRoute><DashBoard /></ProtectedRoute> : <ProtectedRoute><TeacherDashBoard /></ProtectedRoute>} /> */}

          <Route path='/studentDashboard/*' element={<ProtectedRoute role={role} allowedRole="Student"><DashBoard /></ProtectedRoute>} />
          <Route path='/teacherDashboard' element={<ProtectedRoute role={role} allowedRole="Teacher"><TeacherDashBoard /></ProtectedRoute>} />
          <Route path='/studentDashboard/courses' element={<ProtectedRoute role={role} allowedRole="Student"><CoursesApp /></ProtectedRoute>} />
          <Route path='/studentDashboard/courses/lesson' element={<ProtectedRoute role={role} allowedRole="Student"><LessonPlayer /></ProtectedRoute>} />

        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
