import React from "react";
import { FiMenu, FiPlay, FiDownload, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { VideoBlock, renderBlock } from "./contentBlock";

/**
 * LessonContent
 *
 * Props:
 *  lesson        — LessonSchema document (with content[] array)
 *  courseTitle   — string
 *  allLessons    — flat sorted array of all lessons (for Next button)
 *  onNext        — () => void
 *  isSidebarOpen — boolean
 *  onOpenSidebar — () => void
 */
const LessonContent = ({ lesson, courseTitle, allLessons = [], onNext, isSidebarOpen, onOpenSidebar }) => {
  const sortedContent = [...(lesson?.content ?? [])].sort((a, b) => a.order - b.order);
  const lessonIdx     = allLessons.findIndex((l) => l._id === lesson?._id);
  const hasNext       = lessonIdx >= 0 && lessonIdx < allLessons.length - 1;
  const statusLabel   = lesson?.isCompleted ? "Completed" : "In Progress";

  // First video block sits above the title; everything else renders below
  const videoBlock  = sortedContent.find((b) => b.mode === "video");
  const otherBlocks = sortedContent.filter((b) => b.mode !== "video");

  return (
    <main className="flex-1 flex flex-col h-full bg-white relative min-w-0">

      {/* ── Top bar ── */}
      <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          {!isSidebarOpen && (
            <button onClick={onOpenSidebar} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FiMenu size={20} />
            </button>
          )}
          <h2 className="hidden md:block font-bold text-sm text-gray-400 truncate max-w-xs">
            {courseTitle}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition border
              ${hasNext
                ? "text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100 cursor-pointer"
                : "text-gray-300 border-transparent cursor-not-allowed"
              }`}
          >
            Next Lesson <FiCheckCircle size={16} />
          </button>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto">

          {/* 1 — Video player (or placeholder) */}
          {videoBlock
            ? <VideoBlock block={videoBlock} />
            : (
              <div className="aspect-video bg-slate-900 rounded-3xl shadow-2xl mb-10 flex items-center justify-center relative overflow-hidden group cursor-pointer border-4 border-white shadow-slate-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all group-hover:scale-110 group-hover:bg-white/20 z-10">
                  <FiPlay size={32} className="text-white ml-1" />
                </div>
              </div>
            )
          }

          {/* 2 — Title + meta + action buttons */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 border-b border-gray-100 pb-8 gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{lesson?.title}</h1>
              <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase text-[10px] font-bold">
                  {statusLabel}
                </span>
                {lesson?.duration && (
                  <>
                    <span>•</span>
                    <span>{lesson.duration}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button title="Download Resources" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95">
                <FiDownload size={20} />
              </button>
              <button title="Community Discussion" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95">
                <FiMessageSquare size={20} />
              </button>
            </div>
          </div>

          {/* 3 — Text / code content blocks (or fallback) */}
          <div className="space-y-2">
            {otherBlocks.length > 0
              ? otherBlocks.map(renderBlock)
              : (
                <>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Welcome to <strong>{lesson?.title}</strong>. In this session, we dive deep into the implementation details.
                    Ensure you have your development environment ready before proceeding with the code samples provided below the video.
                  </p>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="text-slate-900 font-bold mb-3">Key Takeaways</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Understanding the "Why" behind this pattern</li>
                      <li>Common pitfalls and how to avoid them</li>
                      <li>Optimizing for production performance</li>
                    </ul>
                  </div>
                </>
              )
            }
          </div>

        </div>
      </div>
    </main>
  );
};

export default LessonContent;