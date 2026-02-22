import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/component1/sidebar";
import Main from "../components/component1/main";
import AllCourses from "../components/component1/allCourses"; 

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* 1. Sidebar stays fixed on the left */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<Main />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/my-courses" element={<div className="p-8"><h1>Enrolled Courses (Coming Soon)</h1></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;