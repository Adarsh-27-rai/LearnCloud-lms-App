import StatCard from "./Statcard";
import CourseCard from "../courses/CourseCard";
import { motion } from "framer-motion";
import AuthContext from "../../../context/authContext";
import { useContext } from "react";

function DashboardPage({ onOpen }) {

  const previousCourse = [
    { id: 1, title: "Math 101",      description: "Fundamentals of algebra, geometry and calculus for beginners.", students: 28, lessons: 14, level: "Beginner",     subject: "Algebra",       palette: 0 },
    { id: 2, title: "Physics 201",   description: "Mechanics, thermodynamics, and wave phenomena explored in depth.", students: 19, lessons: 10, level: "Intermediate", subject: "Mechanics",    palette: 1 },
    { id: 3, title: "Chemistry 301", description: "Organic and inorganic chemistry with hands-on lab sessions.",      students: 22, lessons: 12, level: "Advanced",     subject: "Organic Chem", palette: 2 },
    { id: 4, title: "Biology 101",   description: "Cell biology, genetics, and an overview of ecosystems.",           students: 15, lessons: 9,  level: "Beginner",     subject: "Genetics",     palette: 3 },
  ];

  const { allCourses } = useContext(AuthContext);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <h2 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Georgia', serif" }}>
          Good morning, Mr. Smith 👋
        </h2>
        <p className="text-sm text-gray-400 mt-1.5">Here's your teaching overview for today.</p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Students" value="84" />
        <StatCard label="Active Courses" value="3" />
        <StatCard label="Assignments" value="12" />
        <StatCard label="Avg Score" value="78%" />
        
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between mb-5">
          <h3 className="font-black text-slate-800">My Courses</h3>
          <button
            onClick={onOpen}
            className="bg-linear-to-r from-sky-500 to-teal-400 text-white px-4 py-2 rounded-xl"
          >
            + Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCourses.map((c, i) => ( 
            <CourseCard key={c._id} course={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
