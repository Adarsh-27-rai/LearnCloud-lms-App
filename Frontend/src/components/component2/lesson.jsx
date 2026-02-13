import React, { useState } from "react";
import { Menu, X, ArrowLeft, Download, MessageSquare, Play, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const courseData = {
  title: "Advanced React Patterns & Performance",
  description: "Master the art of building scalable React applications with advanced patterns, performance optimization techniques, and modern state management.",
  progress: 45,
  units: [
    {
      id: "u1",
      title: "Unit 1: Architecture & Foundation",
      description: "Establishing the ground rules for a scalable codebase.",
      chapters: [
        {
          id: "c1",
          title: "Chapter 1: Project Structure",
          lessons: [
            { id: "l1", title: "Folder Structure Best Practices", type: "video", duration: "10:20", completed: true },
            { id: "l2", title: "Configuring Vite & TypeScript", type: "text", duration: "15 min", completed: true }
          ]
        },
        {
          id: "c2",
          title: "Chapter 2: Component Patterns",
          lessons: [
            { id: "l3", title: "Compound Components", type: "code", duration: "25 min", completed: false },
            { id: "l4", title: "Render Props vs Hooks", type: "video", duration: "12:15", completed: false }
          ]
        }
      ]
    },
    {
      id: "u2",
      title: "Unit 2: State & Performance",
      description: "Deep dive into React's rendering engine.",
      chapters: [
        {
          id: "c3",
          title: "Chapter 1: Re-rendering Myths",
          lessons: [
            { id: "l5", title: "When does React render?", type: "video", duration: "18:00", completed: false },
            { id: "l6", title: "Memoization Strategies", type: "code", duration: "20 min", completed: false }
          ]
        }
      ]
    },
    {
      id: "u3",
      title: "Unit 3: Real World Application",
      description: "Building a full-featured dashboard.",
      chapters: [
        {
          id: "c4",
          title: "Chapter 1: API Integration",
          lessons: [
            { id: "l7", title: "Data Fetching with React Query", type: "video", duration: "22:30", completed: false }
          ]
        }
      ]
    }
  ]
};

const LessonPlayer = () => {
  const { lessonId } = useParams(); // Gets the lesson ID from the URL
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Helper to find the current lesson details based on the URL
  const allLessons = courseData.units.flatMap(u => u.chapters.flatMap(c => c.lessons));
  const currentLesson = allLessons.find(l => l.id === lessonId) || allLessons[0];

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      {/* 1. LESSON SIDEBAR */}
      <aside className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? "w-80" : "w-0 overflow-hidden"}`}>
        <div className="p-5 border-b bg-white flex justify-between items-center min-w-[320px]">
          <Link to={`/course/${courseData.id}`} className="text-gray-500 hover:text-black transition flex items-center gap-2">
            <ArrowLeft size={16} /> <span className="text-xs font-bold uppercase tracking-tight">Overview</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-black">
            <X size={20}/>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-w-[320px]">
          {courseData.units.map((unit, idx) => (
            <div key={unit.id} className="mb-8">
              <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-3 tracking-widest px-2">Unit 0{idx+1}</h4>
              {unit.chapters.map(chapter => (
                <div key={chapter.id} className="mb-4">
                  <p className="text-xs font-bold text-gray-900 mb-2 px-2 italic opacity-60">{chapter.title}</p>
                  <div className="space-y-1">
                    {chapter.lessons.map(lesson => (
                      <Link 
                        key={lesson.id} 
                        to={`/course/${courseData.id}/lesson/${lesson.id}`}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition group
                          ${lessonId === lesson.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}
                        `}
                      >
                        <Play size={12} className={lessonId === lesson.id ? "text-white" : "text-gray-400"} />
                        <span className="truncate font-medium">{lesson.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* 2. CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full bg-white relative min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Menu size={20} />
              </button>
            )}
            <h2 className="hidden md:block font-bold text-sm text-gray-400 truncate max-w-xs">{courseData.title}</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100">
                Next Lesson <CheckCircle size={16}/>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <div className="aspect-video bg-slate-900 rounded-3xl shadow-2xl mb-10 flex items-center justify-center relative overflow-hidden group cursor-pointer border-4 border-white shadow-slate-200">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all group-hover:scale-110 group-hover:bg-white/20">
                 <Play size={32} className="text-white fill-white ml-1" />
              </div>
            </div>

            {/* Lesson Info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 border-b border-gray-100 pb-8 gap-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{currentLesson?.title}</h1>
                <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase text-[10px] font-bold">In Progress</span>
                  <span>•</span>
                  <span>{currentLesson?.duration} mins</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button title="Download Resources" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95"><Download size={20}/></button>
                <button title="Community Discussion" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95"><MessageSquare size={20}/></button>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Welcome to <strong>{currentLesson?.title}</strong>. In this session, we dive deep into the implementation details. 
                Ensure you have your development environment ready before proceeding with the code samples provided below the video.
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-slate-900 font-bold mb-2">Key Takeaways</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Understanding the "Why" behind this pattern</li>
                  <li>Common pitfalls and how to avoid them</li>
                  <li>Optimizing for production performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;