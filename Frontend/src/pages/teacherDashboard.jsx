import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TeachersSideBar from "../components/component3/layout/TeacherSideBar";
import DashboardPage from "../components/component3/dashboard/Dashboard";
import MyCoursesPage from "../components/component3/courses/MyCoursesPage";
import AddCourseModal from "../components/component3/courses/AddCourseModal";
import API from "../api/axios";
import AuthContext from "../context/authContext";
import TeachersNavBar from "../components/component3/layout/TeachersNavBar";
import TeacherCourseBuilderApp from "../components/component3/courseBuilder/coursebuilder";

export default function TeacherDashboard() {
  const [modal, setModal] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  // const [collapsed, setCollapsed] = useState(false); // If you still need to control sidebar width

  async function fetchCourse() {
    try {
      const courses = await API.get("/course/createdCourses");
      setAllCourses(courses.data);
    } catch (err) {
      console.error("Not able to fetch courses", err);
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <AuthContext.Provider value={{ allCourses, fetchCourse }}>
      <div className="min-h-screen bg-sky-50 flex">
        <TeachersSideBar/>

        <main className="flex-1 h-screen overflow-scroll">
            <Routes>
              {/* index route displays for /teacherDashboard */}
              <Route index element={
                <>
                  <TeachersNavBar />
                  <DashboardPage onOpen={() => setModal(true)} /> 
                </>
              } />
              
              {/* path matches the 'to' prop in your sidebar NavLinks */}
              <Route path="/my-courses" element={
                <>
                  <TeachersNavBar />
                  <MyCoursesPage onOpen={() => setModal(true)} /> 
                </>
              } />
                
              {/* Generic fallback for routes like 'timetable' or 'students' */}
              <Route path="/timetable" element={
                <div className="bg-white rounded-2xl p-10 text-gray-400">
                  Coming Soon...
                </div>
              } />

              <Route path="/assignments" element={
                <div className="bg-white rounded-2xl p-10 text-gray-400">
                  Coming Soon...
                </div>
              } />

              <Route path="/my-students" element={
                <div className="bg-white rounded-2xl p-10 text-gray-400">
                  Coming Soon...
                </div>
              } />

              <Route path="/my-courses/coursePage/:courseId" element={<TeacherCourseBuilderApp />} />
            </Routes>
        </main>

        <AddCourseModal
          isOpen={modal}
          onClose={() => setModal(false)}
        />
      </div>
    </AuthContext.Provider>
  );
}