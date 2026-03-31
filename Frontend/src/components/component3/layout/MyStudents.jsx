import { useState, useMemo } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const COURSES = [
  { id: "c1", name: "React Fundamentals", color: "#1e4070" },
  { id: "c2", name: "Node.js Backend",    color: "#2a5494" },
  { id: "c3", name: "Data Structures",    color: "#3a6fba" },
  { id: "c4", name: "UI/UX Design",       color: "#6094d0" },
];

const STUDENTS = [
  { id: "s1",  name: "Aanya Sharma",  avatar: "AS", courseId: "c1" },
  { id: "s2",  name: "Rahul Mehta",   avatar: "RM", courseId: "c1" },
  { id: "s3",  name: "Priya Nair",    avatar: "PN", courseId: "c1" },
  { id: "s4",  name: "Arjun Singh",   avatar: "AS", courseId: "c2" },
  { id: "s5",  name: "Neha Gupta",    avatar: "NG", courseId: "c2" },
  { id: "s6",  name: "Vikram Patel",  avatar: "VP", courseId: "c2" },
  { id: "s7",  name: "Isha Joshi",    avatar: "IJ", courseId: "c3" },
  { id: "s8",  name: "Dev Kapoor",    avatar: "DK", courseId: "c3" },
  { id: "s9",  name: "Simran Kaur",   avatar: "SK", courseId: "c4" },
  { id: "s10", name: "Rohan Das",     avatar: "RD", courseId: "c4" },
  { id: "s11", name: "Kavya Reddy",   avatar: "KR", courseId: "c1" },
  { id: "s12", name: "Manish Tiwari", avatar: "MT", courseId: "c3" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const AVATAR_SHADES = ["#0f2040", "#163058", "#1e4070", "#2a5494", "#3a6fba"];
function avatarBg(name) {
  return AVATAR_SHADES[name.charCodeAt(0) % AVATAR_SHADES.length];
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl p-4">
      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-800">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-medium text-blue-400">{label}</p>
        <p className="text-xl font-medium text-slate-900 leading-tight">{value}</p>
        {sub && <p className="text-[10px] text-blue-300 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function CoursePill({ course, active, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all"
      style={
        active
          ? { background: course ? course.color : "#0f2040", borderColor: course ? course.color : "#0f2040", color: "#fff" }
          : { background: "#fff", borderColor: "#b8cfe8", color: "#5a7a9e" }
      }
    >
      {course && (
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: course.color }} />
      )}
      {course ? course.name : "All Courses"}
      <span className="text-[10px] opacity-60">{count}</span>
    </button>
  );
}

function StudentCard({ student, course }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium shrink-0"
        style={{ background: avatarBg(student.name) }}
      >
        {student.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{student.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: course?.color ?? "#1e4070" }}
          />
          <span className="text-xs text-blue-400 truncate">{course?.name ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MyStudents() {
  const [search, setSearch]               = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [sortBy, setSortBy]               = useState("name");

  const courseMap = useMemo(
    () => Object.fromEntries(COURSES.map((c) => [c.id, c])),
    []
  );

  const courseCounts = useMemo(
    () => Object.fromEntries(COURSES.map((c) => [c.id, STUDENTS.filter((s) => s.courseId === c.id).length])),
    []
  );

  const filtered = useMemo(() => {
    let list = STUDENTS.slice();
    if (selectedCourse !== "all") list = list.filter((s) => s.courseId === selectedCourse);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    if (sortBy === "course") list = [...list].sort((a, b) => a.courseId.localeCompare(b.courseId));
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, selectedCourse, sortBy]);

  // Stat cards data
  const statCards = [
    { label: "Total Enrolled", value: STUDENTS.length, sub: "across all courses",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    ...COURSES.slice(0, 3).map((c) => ({
      label: c.name,
      value: courseCounts[c.id],
      sub: "students",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    })),
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-blue-50/60 px-6 py-7 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 text-2xl font-medium tracking-tight">My Students</h1>
        <p className="text-blue-400 text-sm mt-0.5">
          Track enrollment and engagement across your courses.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s, i) => (
          <StatCard key={i} icon={s.icon} label={s.label} value={s.value} sub={s.sub} />
        ))}
      </div>

      {/* Course Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <CoursePill
          course={null}
          active={selectedCourse === "all"}
          count={STUDENTS.length}
          onClick={() => setSelectedCourse("all")}
        />
        {COURSES.map((c) => (
          <CoursePill
            key={c.id}
            course={c}
            active={selectedCourse === c.id}
            count={courseCounts[c.id]}
            onClick={() => setSelectedCourse(c.id)}
          />
        ))}
      </div>

      {/* Search + Sort */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students…"
            className="w-full pl-8 pr-3 py-2 bg-white border border-blue-200 rounded-xl text-sm text-slate-800 placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-white border border-blue-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-blue-400 transition-all cursor-pointer"
          >
            <option value="name">Sort: Name</option>
            <option value="course">Sort: Course</option>
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none"
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>

        <span className="ml-auto text-blue-300 text-xs font-medium">
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              course={courseMap[student.courseId]}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-blue-200">
          <svg width="36" height="36" className="mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p className="text-sm font-medium text-blue-300">No students found</p>
          <p className="text-xs mt-1 text-blue-200">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}