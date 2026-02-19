import { motion } from "framer-motion";
import CourseCard from "./CourseCard";

export default function MyCoursesPage({ onOpen }) {

    const courses = [
    { id: 1, title: "Math 101",      description: "Fundamentals of algebra, geometry and calculus for beginners.", students: 28, lessons: 14, level: "Beginner",     subject: "Algebra",       palette: 0 },
    { id: 2, title: "Physics 201",   description: "Mechanics, thermodynamics, and wave phenomena explored in depth.", students: 19, lessons: 10, level: "Intermediate", subject: "Mechanics",    palette: 1 },
    { id: 3, title: "Chemistry 301", description: "Organic and inorganic chemistry with hands-on lab sessions.",      students: 22, lessons: 12, level: "Advanced",     subject: "Organic Chem", palette: 2 },
    { id: 4, title: "Biology 101",   description: "Cell biology, genetics, and an overview of ecosystems.",           students: 15, lessons: 9,  level: "Beginner",     subject: "Genetics",     palette: 3 },
  ];

  return (
    <>
      <div className="flex justify-between mb-7">
        <div>
          <h2 className="text-2xl font-black text-slate-800">
            My Courses
          </h2>
          <p className="text-sm text-gray-400">
            {courses.length} courses this semester
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          onClick={onOpen}
          className="px-5 py-2.5 rounded-xl bg-linear-to-r from-sky-500 to-teal-400 text-white font-bold"
        >
          + Add New Course
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, index) => (
          <CourseCard 
            key={course.id}
            course={course}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
