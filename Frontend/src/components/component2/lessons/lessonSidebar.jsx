import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft, FiX, FiPlay, FiCode,
  FiFileText, FiImage, FiCheckCircle,
} from "react-icons/fi";

const TYPE_ICON = { video: FiPlay, code: FiCode, text: FiFileText, images: FiImage };

/**
 * CourseSidebar
 *
 * Props:
 *  course          — CourseSchema document
 *  currentLessonId — active lesson _id string
 *  onClose         — () => void
 */
const LessonSidebar = ({ course, currentLessonId, onClose }) => {
  const courseId    = course?._id ?? course?.id;
  const sortedUnits = [...(course?.units ?? [])].sort((a, b) => a.order - b.order);

  return (
    <aside className="bg-gray-950 border-r border-gray-800 transition-all duration-300 flex flex-col w-80 min-w-[320px] h-full">

      {/* Header */}
      <div className="h-16 px-5 border-b border-gray-800 bg-black flex justify-between items-center">
        <Link
          to={`/course/${courseId}`}
          className="text-white hover:text-blue-400 transition flex items-center gap-2"
        >
          <FiArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-tight">Overview</span>
        </Link>
        <button onClick={onClose} className="text-white hover:text-blue-400 transition">
          <FiX size={20} />
        </button>
      </div>

      {/* Scrollable lesson list */}
      <div className="flex-1 overflow-y-auto p-4">
        {sortedUnits.map((unit, idx) => {
          const sortedChapters = [...(unit.chapters ?? [])].sort((a, b) => a.order - b.order);
          return (
            <div key={unit._id ?? unit.order} className="mb-8">
              <h4 className="text-[10px] font-bold text-blue-500 uppercase mb-3 tracking-widest px-2">
                Unit {String(idx + 1).padStart(2, "0")}
              </h4>

              {sortedChapters.map((chapter) => {
                const sortedLessons = [...(chapter.lessons ?? [])].sort((a, b) => a.order - b.order);
                return (
                  <div key={chapter._id ?? chapter.order} className="mb-4">
                    <p className="text-sm font-bold text-gray-200 mb-2 px-2 opacity-60">
                      {chapter.title}
                    </p>
                    <div className="space-y-1">
                      {sortedLessons.map((lesson) => {
                        const lid      = lesson._id ?? lesson.id;
                        const isActive = String(lid) === String(currentLessonId);
                        const Icon     = TYPE_ICON[lesson.type] ?? FiPlay;
                        return (
                          <Link
                            key={lid}
                            to={`/course/${courseId}/lesson/${lid}`}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition group
                              ${isActive
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-white hover:bg-white/10 hover:text-green-400"
                              }`}
                          >
                            <Icon size={12} className={isActive ? "text-white" : "text-green-400"} />
                            <span className="truncate font-medium flex-1">{lesson.title}</span>
                            {lesson.isCompleted && !isActive && (
                              <FiCheckCircle size={13} className="shrink-0 text-green-400" />
                            )}
                            {/* {lesson.duration && (
                              <span className={`text-[10px] shrink-0 ${isActive ? "text-blue-200" : "text-gray-500"}`}>
                                {lesson.duration}
                              </span>
                            )} */}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default LessonSidebar;