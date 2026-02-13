import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ==================== DATA ====================
const courseMaterials = {
  1: {
    1: {
      1: [
        { name: "JavaScript Basics - Lecture Notes.pdf", type: "pdf" },
        { name: "Setup Guide.pdf", type: "pdf" }
      ],
      2: [{ name: "Variables and Types - Reference.pdf", type: "pdf" }]
    },
    2: {
      1: [{ name: "Functions Deep Dive.pdf", type: "pdf" }],
      2: [{ name: "Arrays and Objects Handbook.pdf", type: "pdf" }]
    },
    3: {
      1: [
        { name: "Async JavaScript Guide.pdf", type: "pdf" },
        { name: "Promises Tutorial.pdf", type: "pdf" }
      ]
    }
  },
  2: {
    1: {
      1: [
        { name: "React Introduction.pdf", type: "pdf" },
        { name: "JSX Cheatsheet.pdf", type: "pdf" }
      ],
      2: [{ name: "State Management Guide.pdf", type: "pdf" }]
    },
    2: {
      1: [{ name: "Tailwind CSS Documentation.pdf", type: "pdf" }],
      2: [{ name: "Responsive Design Patterns.pdf", type: "pdf" }]
    },
    3: {
      1: [
        { name: "Project Starter Files.pdf", type: "pdf" },
        { name: "Best Practices.pdf", type: "pdf" }
      ]
    }
  },
  3: {
    1: {
      1: [{ name: "Node.js Fundamentals.pdf", type: "pdf" }],
      2: [{ name: "NPM Complete Guide.pdf", type: "pdf" }]
    },
    2: {
      1: [
        { name: "Express Framework Tutorial.pdf", type: "pdf" },
        { name: "Routing Examples.pdf", type: "pdf" }
      ]
    },
    3: {
      1: [
        { name: "MongoDB Integration Guide.pdf", type: "pdf" },
        { name: "Database Schema Design.pdf", type: "pdf" }
      ]
    }
  }
};

const coursesData = [
  {
    id: 1,
    name: "JavaScript Mastery",
    description: "Master JavaScript from basics to advanced concepts",
    progress: 70,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    units: [
      {
        id: 1,
        name: "Fundamentals",
        chapters: [
          {
            id: 1,
            name: "Introduction to JavaScript",
            lessons: [
              { id: 1, name: "What is JavaScript?", duration: "10 min", completed: true },
              { id: 2, name: "Setting up your environment", duration: "15 min", completed: true },
              { id: 3, name: "Your first JavaScript program", duration: "20 min", completed: true }
            ]
          },
          {
            id: 2,
            name: "Variables and Data Types",
            lessons: [
              { id: 1, name: "Understanding Variables", duration: "12 min", completed: true },
              { id: 2, name: "Primitive Data Types", duration: "18 min", completed: false },
              { id: 3, name: "Type Conversion", duration: "15 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Intermediate Concepts",
        chapters: [
          {
            id: 1,
            name: "Functions",
            lessons: [
              { id: 1, name: "Function Declaration", duration: "14 min", completed: false },
              { id: 2, name: "Arrow Functions", duration: "16 min", completed: false },
              { id: 3, name: "Higher Order Functions", duration: "22 min", completed: false }
            ]
          },
          {
            id: 2,
            name: "Arrays and Objects",
            lessons: [
              { id: 1, name: "Array Methods", duration: "20 min", completed: false },
              { id: 2, name: "Object Manipulation", duration: "18 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Advanced Topics",
        chapters: [
          {
            id: 1,
            name: "Async JavaScript",
            lessons: [
              { id: 1, name: "Promises", duration: "25 min", completed: false },
              { id: 2, name: "Async/Await", duration: "20 min", completed: false },
              { id: 3, name: "Error Handling", duration: "15 min", completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "React + Tailwind",
    description: "Build modern web applications with React and Tailwind CSS",
    progress: 55,
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    units: [
      {
        id: 1,
        name: "React Basics",
        chapters: [
          {
            id: 1,
            name: "Getting Started with React",
            lessons: [
              { id: 1, name: "What is React?", duration: "12 min", completed: true },
              { id: 2, name: "JSX Syntax", duration: "15 min", completed: true },
              { id: 3, name: "Components", duration: "18 min", completed: true }
            ]
          },
          {
            id: 2,
            name: "State and Props",
            lessons: [
              { id: 1, name: "Understanding State", duration: "20 min", completed: true },
              { id: 2, name: "Props in React", duration: "16 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Tailwind CSS",
        chapters: [
          {
            id: 1,
            name: "Tailwind Setup",
            lessons: [
              { id: 1, name: "Installing Tailwind", duration: "10 min", completed: false },
              { id: 2, name: "Configuration", duration: "12 min", completed: false }
            ]
          },
          {
            id: 2,
            name: "Utility Classes",
            lessons: [
              { id: 1, name: "Layout Classes", duration: "18 min", completed: false },
              { id: 2, name: "Responsive Design", duration: "22 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Building Projects",
        chapters: [
          {
            id: 1,
            name: "Real World Applications",
            lessons: [
              { id: 1, name: "Todo App", duration: "30 min", completed: false },
              { id: 2, name: "Dashboard UI", duration: "35 min", completed: false },
              { id: 3, name: "E-commerce Site", duration: "45 min", completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Backend with Node.js",
    description: "Learn server-side programming with Node.js and Express",
    progress: 40,
    color: "bg-gradient-to-br from-green-400 to-emerald-600",
    units: [
      {
        id: 1,
        name: "Node.js Fundamentals",
        chapters: [
          {
            id: 1,
            name: "Introduction to Node.js",
            lessons: [
              { id: 1, name: "What is Node.js?", duration: "15 min", completed: true },
              { id: 2, name: "Event Loop", duration: "20 min", completed: true },
              { id: 3, name: "Modules", duration: "18 min", completed: false }
            ]
          },
          {
            id: 2,
            name: "NPM and Packages",
            lessons: [
              { id: 1, name: "Using NPM", duration: "12 min", completed: false },
              { id: 2, name: "Popular Packages", duration: "16 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Express Framework",
        chapters: [
          {
            id: 1,
            name: "Express Basics",
            lessons: [
              { id: 1, name: "Setting up Express", duration: "14 min", completed: false },
              { id: 2, name: "Routing", duration: "18 min", completed: false },
              { id: 3, name: "Middleware", duration: "22 min", completed: false }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Database Integration",
        chapters: [
          {
            id: 1,
            name: "MongoDB with Node",
            lessons: [
              { id: 1, name: "Connecting to MongoDB", duration: "20 min", completed: false },
              { id: 2, name: "CRUD Operations", duration: "25 min", completed: false },
              { id: 3, name: "Mongoose ODM", duration: "30 min", completed: false }
            ]
          }
        ]
      }
    ]
  }
];

// ==================== REUSABLE UI COMPONENTS ====================

const CourseCard = ({ course, onClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    <div className={`${course.color} rounded-2xl shadow-xl p-6 text-white h-64 flex flex-col justify-between`}>
      <div>
        <h3 className="text-2xl font-bold mb-3">{course.name}</h3>
        <p className="text-white/90 text-sm">{course.description}</p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Progress</span>
          <span className="text-sm font-semibold">{course.progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="mt-4 text-sm opacity-90">
          📚 {course.units.length} Units
        </div>
      </div>
    </div>
  </motion.div>
);

const UnitCard = ({ unit, index, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl font-bold text-slate-300">Unit {index + 1}</span>
        <span className="text-3xl">📖</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{unit.name}</h3>
      <p className="text-slate-600 text-sm mb-4">
        {unit.chapters.length} {unit.chapters.length === 1 ? 'Chapter' : 'Chapters'}
      </p>
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Start Learning →
      </button>
    </div>
  </motion.div>
);

const CourseMaterial = ({ material, onOpen }) => (
  <div
    className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
    onClick={() => onOpen(material.name)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <div>
          <p className="font-semibold text-slate-800">{material.name}</p>
          <p className="text-xs text-slate-600 uppercase">{material.type} Document</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen(material.name);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        View
      </button>
    </div>
  </div>
);

const LessonItem = ({ lesson }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
      lesson.completed
        ? 'bg-green-50 border-green-300 hover:bg-green-100'
        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">{lesson.completed ? '✅' : '⭕'}</span>
        <div>
          <h4 className="font-semibold text-slate-800">{lesson.name}</h4>
          <p className="text-sm text-slate-600">{lesson.duration}</p>
        </div>
      </div>
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          lesson.completed
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {lesson.completed ? 'Review' : 'Start'}
      </button>
    </div>
  </motion.div>
);

const ChapterAccordion = ({ chapter, isExpanded, onToggle, materials, onOpenMaterial }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">📑</span>
        <div className="text-left">
          <h3 className="text-xl font-bold text-slate-800">{chapter.name}</h3>
          <p className="text-sm text-slate-600">
            {chapter.lessons.length} {chapter.lessons.length === 1 ? 'Lesson' : 'Lessons'}
            {materials && ` • ${materials.length} Materials`}
          </p>
        </div>
      </div>
      <span className="text-2xl">{isExpanded ? '▼' : '▶'}</span>
    </button>

    {isExpanded && (
      <div className="px-6 pb-6 space-y-3">
        {materials && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              📚 Course Materials
            </h4>
            <div className="space-y-2">
              {materials.map((material, idx) => (
                <CourseMaterial key={idx} material={material} onOpen={onOpenMaterial} />
              ))}
            </div>
          </div>
        )}
        
        <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          🎥 Lessons
        </h4>
        
        {chapter.lessons.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </div>
    )}
  </div>
);

const BackButton = ({ onClick, text = "Back" }) => (
  <button
    onClick={onClick}
    className="mb-6 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-semibold text-slate-700"
  >
    ← {text}
  </button>
);

// ==================== PAGE COMPONENTS ====================

const CoursesListPage = ({ onCourseSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">My Courses</h1>
        <p className="text-slate-600">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={() => onCourseSelect(course)} 
          />
        ))}
      </div>
    </div>
  </div>
);

const UnitsPage = ({ course, onBack, onUnitSelect }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div className="max-w-7xl mx-auto">
      <BackButton onClick={onBack} text="Back to Courses" />

      <div className={`${course.color} rounded-2xl shadow-xl p-8 text-white mb-8`}>
        <h1 className="text-4xl font-bold mb-3">{course.name}</h1>
        <p className="text-white/90 text-lg mb-4">{course.description}</p>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/20 rounded-lg">
            📚 {course.units.length} Units
          </div>
          <div className="px-4 py-2 bg-white/20 rounded-lg">
            📊 {course.progress}% Complete
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Units</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {course.units.map((unit, index) => (
          <UnitCard 
            key={unit.id} 
            unit={unit} 
            index={index} 
            onClick={() => onUnitSelect(unit)} 
          />
        ))}
      </div>
    </div>
  </div>
);

const ChaptersPage = ({ course, unit, onBack }) => {
  const [expandedChapter, setExpandedChapter] = useState(null);
  
  const toggleChapter = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const openMaterial = (materialName) => {
    alert(`Opening: ${materialName}\n\nIn a real application, this would open the actual PDF/document file.`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <BackButton onClick={onBack} text="Back to Units" />

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">{unit.name}</h1>
          <p className="text-slate-600">
            {unit.chapters.length} {unit.chapters.length === 1 ? 'Chapter' : 'Chapters'} to complete
          </p>
        </div>

        <div className="space-y-4">
          {unit.chapters.map((chapter) => (
            <ChapterAccordion
              key={chapter.id}
              chapter={chapter}
              isExpanded={expandedChapter === chapter.id}
              onToggle={() => toggleChapter(chapter.id)}
              materials={courseMaterials?.[course.id]?.[unit.id]?.[chapter.id]}
              onOpenMaterial={openMaterial}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP COMPONENT ====================

const CoursesApp = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedUnit(null);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  const handleBack = () => {
    if (selectedUnit) {
      setSelectedUnit(null);
    } else {
      setSelectedCourse(null);
    }
  };

  // Client-side routing with state
  if (!selectedCourse) {
    return <CoursesListPage onCourseSelect={handleCourseSelect} />;
  }

  if (!selectedUnit) {
    return (
      <UnitsPage
        course={selectedCourse}
        onBack={handleBack}
        onUnitSelect={handleUnitSelect}
      />
    );
  }

  return (
    <ChaptersPage
      course={selectedCourse}
      unit={selectedUnit}
      onBack={handleBack}
    />
  );
};

export default CoursesApp;