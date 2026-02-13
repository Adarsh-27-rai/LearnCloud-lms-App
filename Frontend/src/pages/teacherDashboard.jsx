import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axios";

function TeacherDashBoard() {
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  async function addCourse() {
    await API.post("/course", { title: courseName, description: courseDescription})
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6">

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Logout
        </button>
      </nav>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl text-gray-700">
          Welcome, <span className="font-semibold">Mr. Smith</span>
        </h2>
        <p className="text-gray-500 mt-1">
          Here’s an overview of your classes and students.
        </p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Students Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start"
        >
          <h3 className="text-lg font-semibold text-gray-800">Students</h3>
          <p className="text-gray-500 mt-1">Manage your students</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            View Students
          </button>
        </motion.div>

        {/* Classes Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start"
        >
          <h3 className="text-lg font-semibold text-gray-800">Classes</h3>
          <p className="text-gray-500 mt-1">Manage your classes</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            View Classes
          </button>
        </motion.div>

        {/* Assignments Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start"
        >
          <h3 className="text-lg font-semibold text-gray-800">Assignments</h3>
          <p className="text-gray-500 mt-1">Track and grade assignments</p>
          <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            View Assignments
          </button>
        </motion.div>
      </div>

      {/* New Section: Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Add Course */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Course</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              value={courseName}
              onChange={(e) => {setCourseName(e.target.value)}}
              placeholder="Course Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => {setCourseDescription(e.target.value)}}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={addCourse}
            >
              Add Course
            </button>
          </form>
        </motion.div>

        {/* Monitor Courses */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monitor Courses</h3>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {/* Replace with dynamic courses from API */}
            <li className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition">
              <span>Math 101</span>
              <button className="text-indigo-600 hover:underline">View</button>
            </li>
            <li className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition">
              <span>Physics 201</span>
              <button className="text-indigo-600 hover:underline">View</button>
            </li>
            <li className="border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition">
              <span>Chemistry 301</span>
              <button className="text-indigo-600 hover:underline">View</button>
            </li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}

export default TeacherDashBoard;
