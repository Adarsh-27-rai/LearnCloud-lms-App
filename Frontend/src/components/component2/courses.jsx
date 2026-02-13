import React, { useState } from "react";
import { 
  Play, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  Download, 
  MessageSquare,
  ArrowLeft,
  Clock,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// --- MOCK DATA (Strictly 3 Units) ---
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

const CourseStructure = () => {
  const [expandedChapters, setExpandedChapters] = useState(["c1"]);

  const toggleChapter = (id) => {
    setExpandedChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/studentDashboard" className="flex items-center gap-2 text-gray-500 hover:text-slate-900 transition">
            <ArrowLeft className="w-4 h-4" /> <span className="text-sm font-semibold">Back to Dashboard</span>
          </Link>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 mt-4">
        {/* Intro Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseData.title}</h1>
          <p className="text-slate-300 text-lg leading-relaxed">{courseData.description}</p>
        </div>

        {/* Units / Lessons */}
        <div className="space-y-8">
          {courseData.units.map((unit, index) => (
            <div key={unit.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 border-b p-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Unit 0{index + 1}</span>
                <h3 className="text-xl font-bold">{unit.title}</h3>
              </div>

              <div className="p-4 md:p-6 space-y-4">
                {unit.chapters.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button onClick={() => toggleChapter(chapter.id)} className="w-full flex items-center justify-between p-4 bg-white">
                      <span className="font-bold">{chapter.title}</span>
                      {expandedChapters.includes(chapter.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>

                    <AnimatePresence>
                      {expandedChapters.includes(chapter.id) && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/30">
                          <div className="p-2 space-y-2">
                            {chapter.lessons.map((lesson) => (
                              /* THE ROUTE LINK */
                              <Link 
                                key={lesson.id} 
                                to={`/studentDashboard/courses/lesson`}
                                className="w-full flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg hover:border-blue-400 hover:shadow-md transition-all group"
                              >
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${lesson.completed ? 'bg-green-100 text-green-600 border-green-200' : 'bg-white text-gray-400'}`}>
                                  {lesson.completed ? <CheckCircle2 size={16} /> : <Play size={14} />}
                                </div>
                                <span className="flex-1 font-semibold text-gray-700 group-hover:text-blue-600">{lesson.title}</span>
                                <span className="text-xs text-gray-400">{lesson.duration}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseStructure;