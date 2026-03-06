import React, { useState } from "react";
import { courseData, flatLessons } from "./lessons/courseData";
import CourseSidebar from "./lessons/lessonSidebar";
import LessonContent from "./lessons/lessonContent";

/**
 * LessonPlayer
 *
 * Root component — owns sidebar open/close state and current lesson state.
 * In a real app, replace useState(lessons[0]) with useParams() + useNavigate().
 */
const LessonPlayer = () => {
  const lessons = flatLessons(courseData);
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [isSidebarOpen, setSidebarOpen]   = useState(true);

  const handleNext = () => {
    const idx  = lessons.findIndex((l) => l._id === currentLesson._id);
    const next = lessons[idx + 1];
    if (next) setCurrentLesson(next);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">

      {/* Sidebar slide wrapper */}
      <div className={`transition-all duration-300 overflow-hidden flex-shrink-0 ${isSidebarOpen ? "w-80" : "w-0"}`}>
        <CourseSidebar
          course={courseData}
          currentLessonId={currentLesson._id}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <LessonContent
        lesson={currentLesson}
        courseTitle={courseData.title}
        allLessons={lessons}
        onNext={handleNext}
        isSidebarOpen={isSidebarOpen}
        onOpenSidebar={() => setSidebarOpen(true)}
      />

    </div>
  );
};

export default LessonPlayer;