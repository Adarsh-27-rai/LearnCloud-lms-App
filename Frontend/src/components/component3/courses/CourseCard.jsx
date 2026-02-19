import { motion } from "framer-motion";
import { FaTag, FaUsers, FaBook } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";

const PALETTES = [
  { grad: "from-sky-500 to-cyan-400",       ring: "ring-sky-400",     badge: "bg-sky-100 text-sky-700",        bar: "bg-sky-500",     btn: "from-sky-500 to-cyan-400"       },
  { grad: "from-teal-500 to-emerald-400",   ring: "ring-teal-400",    badge: "bg-teal-100 text-teal-700",      bar: "bg-teal-500",    btn: "from-teal-500 to-emerald-400"   },
  { grad: "from-cyan-500 to-sky-400",       ring: "ring-cyan-400",    badge: "bg-cyan-100 text-cyan-700",      bar: "bg-cyan-500",    btn: "from-cyan-500 to-sky-400"       },
  { grad: "from-blue-500 to-sky-400",       ring: "ring-blue-400",    badge: "bg-blue-100 text-blue-700",      bar: "bg-blue-500",    btn: "from-blue-500 to-sky-400"       },
  { grad: "from-indigo-500 to-blue-400",    ring: "ring-indigo-400",  badge: "bg-indigo-100 text-indigo-700",  bar: "bg-indigo-500",  btn: "from-indigo-500 to-blue-400"    },
  { grad: "from-emerald-500 to-teal-400",   ring: "ring-emerald-400", badge: "bg-emerald-100 text-emerald-700",bar: "bg-emerald-500", btn: "from-emerald-500 to-teal-400"   },
];

export default function CourseCard({ course, index }) {
  const pal = PALETTES[course.palette ?? 0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.18 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-sky-100/80 flex flex-col cursor-pointer"
    >
      {/* Coloured header */}
      <div className={`relative h-28 bg-linear-to-br ${pal.grad} p-4 flex flex-col justify-between overflow-hidden`}>
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-8 w-14 h-14 rounded-full bg-white/8" />

        <span className="inline-block self-start text-[10px] font-black tracking-widest uppercase text-white/90 bg-black/20 px-2.5 py-1 rounded-full">
          {course.level ?? "Beginner"}
        </span>
        <h3 className="text-white font-black text-base relative z-10 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
          {course.title}
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-2.5">
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {course.description || "No description provided."}
        </p>
        {course.subject && (
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold self-start px-2.5 py-1 rounded-full`}>
            <FaTag /> {course.subject}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaUsers /> {course.students}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaBook /> {course.lessons} lessons
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-700 transition-colors">
          View <IoArrowForward />
        </button>
      </div>
    </motion.div>
  );
}
