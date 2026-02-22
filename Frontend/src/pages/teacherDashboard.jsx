import { useState, useEffect, useContext } from "react";
import TeachersSideBar from "../components/component3/layout/TeacherSideBar";
import DashboardPage from "../components/component3/dashboard/Dashboard";
import MyCoursesPage from "../components/component3/courses/MyCoursesPage";
import AddCourseModal from "../components/component3/courses/AddCourseModal";
import API from "../api/axios";
import AuthContext from "../context/authContext";

const INIT_COURSES = [
  { id: 1, title: "Math 101", description: "Fundamentals of algebra, geometry and calculus for beginners.", students: 28, lessons: 14, level: "Beginner", subject: "Algebra", palette: 0 },
  { id: 2, title: "Physics 201", description: "Mechanics, thermodynamics, and wave phenomena explored in depth.", students: 19, lessons: 10, level: "Intermediate", subject: "Mechanics", palette: 1 },
  { id: 3, title: "Chemistry 301", description: "Organic and inorganic chemistry with hands-on lab sessions.", students: 22, lessons: 12, level: "Advanced", subject: "Organic Chem", palette: 2 },
  { id: 4, title: "Biology 101", description: "Cell biology, genetics, and an overview of ecosystems.", students: 15, lessons: 9, level: "Beginner", subject: "Genetics", palette: 3 },
];

// ------------------------------------------------------------------------------------------------------------

export default function TeacherDashboard() {
  const [active, setActive] = useState("dashboard");
  const [modal, setModal] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  async function fetchCourse() {
    const courses = await API.get("/course/createdCourses");
    setAllCourses(courses.data);
    console.log(courses.data);
  }

  useEffect(() => {
    try {
      fetchCourse();
    } catch (err) {
      console.log("No able to fetch task or no tak available");
    }
  }, []);


  return (
    <AuthContext.Provider value={{allCourses}}>
      <div className="min-h-screen bg-sky-50 flex">

        <TeachersSideBar active={active} setActive={setActive} />

        <main className="flex-1 h-screen overflow-scroll">
          <div className="sticky top-0 z-20 flex justify-between items-center px-8 h-16 bg-white border-b border-sky-100/80 shadow-sm">
            <h1 className="text-base font-black text-slate-800" style={{ fontFamily: "'Georgia', serif" }}>
              {/* {NAV_ITEMS.find(n => n.id === active)?.label ?? "Dashboard"} */}
              DashBoard
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-sky-500 to-teal-400 flex items-center justify-center text-white text-xs font-black shadow-md shadow-sky-300">
                MS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-700 leading-tight">Mr. Smith</p>
                <p className="text-xs text-gray-400">Mathematics Dept.</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {active === "dashboard" && (
              <DashboardPage onOpen={() => setModal(true)} />
            )}

            {active === "courses" && (
              <MyCoursesPage onOpen={() => setModal(true)} />
            )}

            {active !== "dashboard" && active !== "courses" && (
              <div className="bg-white rounded-2xl p-10 text-gray-400">
                Coming Soon...
              </div>
            )}
          </div>
        </main>

        <AddCourseModal
          isOpen={modal}
          onClose={() => setModal(false)}
        />
      </div>
    </AuthContext.Provider>
  );
}
