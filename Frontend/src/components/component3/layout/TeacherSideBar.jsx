// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LuLayoutDashboard,
//   LuBookOpen,
//   LuCalendarDays,
//   LuClipboardList,
//   LuUsers,
//   LuLogOut,
//   LuChevronLeft
// } from "react-icons/lu";


// // function TeachersSideBar({ active, setActive }) {

// //   const items = [
// //     { id: "dashboard", label: "Dashboard" },
// //     { id: "courses", label: "My Courses" },
// //     { id: "timetable", label: "Timetable" },
// //     { id: "assignments", label: "Assignments" },
// //     { id: "students", label: "Students" },
// //   ];

// //   return (
// //     <aside className="w-64 bg-white shadow-xl p-6">
// //       <h1 className="text-2xl font-black text-sky-600 mb-8">
// //         Teacher Panel
// //       </h1>

// //       <div className="space-y-2">
// //         {items.map(item => (
// //           <button
// //             key={item.id}
// //             onClick={() => setActive(item.id)}
// //             className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition
// //               ${active === item.id 
// //                 ? "bg-sky-100 text-sky-700" 
// //                 : "text-gray-500 hover:bg-sky-50"}`}
// //           >
// //             {item.label}
// //           </button>
// //         ))}
// //       </div>
// //     </aside>
// //   );
// // }

// // // ─── Stat Card ────────────────────────────────────────────────────────────────
// // function StatCard({ label, value, sub, emoji, accent }) {
// //   return (
// //     <motion.div
// //       whileHover={{ y: -3 }}
// //       transition={{ type: "spring", stiffness: 300, damping: 22 }}
// //       className="bg-white rounded-2xl p-5 border border-sky-100/80 shadow-sm flex flex-col gap-1.5"
// //     >
// //       <div className="flex justify-between items-center">
// //         <span className={`text-[10px] font-black tracking-widest uppercase ${accent}`}>{label}</span>
// //         <span className="text-xl">{emoji}</span>
// //       </div>
// //       <span className="text-3xl font-black text-slate-800 leading-none" style={{ fontFamily: "'Georgia', serif" }}>{value}</span>
// //       <span className="text-xs text-gray-400">{sub}</span>
// //     </motion.div>
// //   );
// // }

// // // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function TeachersSideBar({ active, setActive, collapsed, setCollapsed }) {

//   const items = [
//     { id: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
//     { id: "courses", label: "My Courses", icon: LuBookOpen },
//     { id: "timetable", label: "Timetable", icon: LuCalendarDays },
//     { id: "assignments", label: "Assignments", icon: LuClipboardList },
//     { id: "students", label: "Students", icon: LuUsers },
//   ];

//   return (
//     <motion.aside
//       animate={{ width: collapsed ? 70 : 238 }}
//       transition={{ type: "spring", stiffness: 320, damping: 32 }}
//       // className="fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-[#04111f] shadow-2xl overflow-hidden w-64 p-6"
//       className="fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-[#04111f] shadow-2xl overflow-hidden"
//     >
//       {/* Logo */}
//       <div className="flex items-center gap-3 px-4 py-5 min-h-[68px]">
//         <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
//           <span className="text-white font-black text-base" style={{ fontFamily: "'Georgia', serif" }}>E</span>
//         </div>
//         <AnimatePresence>
//           {!collapsed && (
//             <motion.span
//               initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
//               transition={{ duration: 0.15 }}
//               className="text-white font-black text-sm whitespace-nowrap tracking-tight"
//               style={{ fontFamily: "'Georgia', serif" }}
//             >
//               EduPortal
//             </motion.span>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Nav items */}
//       <nav className="flex-1 flex flex-col gap-1 px-2.5">
//         {items.map(({ id, label, icon: Icon }) => {
//           const on = active === id;
//           return (
//             <button
//               key={id}
//               onClick={() => setActive(id)}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all border ${on
//                   ? "bg-sky-500/20 border-sky-500/40 text-sky-300"
//                   : "border-transparent text-sky-200/35 hover:bg-white/5 hover:text-sky-200/70"
//                 }`}
//             >
//               <span className="shrink-0"><Icon /></span>
//               <AnimatePresence>
//                 {!collapsed && (
//                   <motion.span
//                     initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
//                     transition={{ duration: 0.14 }}
//                     className="text-[13px] font-semibold whitespace-nowrap"
//                   >
//                     {label}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </button>
//           );
//         })}
//       </nav>

//       {/* Divider */}
//       <div className="mx-4 my-2 h-px bg-white/5" />

//       {/* Logout */}
//       <div className="px-2.5 pb-5">
//         <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full border border-transparent text-rose-400/50 hover:bg-rose-400/10 hover:border-rose-400/20 hover:text-rose-400 transition-all">
//           <span className="shrink-0"><LuLogOut /></span>
//           <AnimatePresence>
//             {!collapsed && (
//               <motion.span
//                 initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
//                 transition={{ duration: 0.14 }}
//                 className="text-[13px] font-semibold whitespace-nowrap"
//               >
//                 Logout
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </button>
//       </div>

//       {/* Collapse toggle */}
//       <button
//         onClick={() => setCollapsed(!collapsed)}
//         className="absolute bottom-20 -right-3 w-6 h-6 rounded-full bg-[#0a2540] border-2 border-sky-500/50 text-sky-300 flex items-center justify-center shadow-lg shadow-black/30 hover:border-sky-400 transition-colors"
//       >
//         <motion.span animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.25 }}>
//           <LuChevronLeft />
//         </motion.span>
//       </button>
//     </motion.aside>
//   );
// }


// export default TeachersSideBar;

import { motion, AnimatePresence } from "framer-motion";
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuCalendarDays,
  LuClipboardList,
  LuUsers,
  LuLogOut,
  LuChevronLeft
} from "react-icons/lu";

function TeachersSideBar({ active, setActive, collapsed, setCollapsed }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    { id: "courses", label: "My Courses", icon: LuBookOpen },
    { id: "timetable", label: "Timetable", icon: LuCalendarDays },
    { id: "assignments", label: "Assignments", icon: LuClipboardList },
    { id: "students", label: "Students", icon: LuUsers },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 250 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="z-30 flex flex-col bg-[#04111f] shadow-2xl overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 min-h-[68px]">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
          <span
            className="text-white font-black text-base"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            E
          </span>
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="text-white font-black text-sm whitespace-nowrap tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              EduPortal
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-2.5">
        {items.map(({ id, label, icon: Icon }) => {
          const on = active === id;

          return (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              whileHover={{ x: collapsed ? 0 : 4 }}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-3 py-2.5 rounded-xl text-left transition-all border ${
                on
                  ? "bg-sky-500/20 border-sky-500/40 text-sky-300"
                  : "border-transparent text-sky-200/35 hover:bg-white/5 hover:text-sky-200/70"
              }`}
            >
              <span className="shrink-0 text-lg">
                <Icon />
              </span>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.14 }}
                    className="text-[13px] font-semibold whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-2 h-px bg-white/5" />

      {/* Logout */}
      <div className="px-2.5 pb-5">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full border border-transparent text-rose-400/50 hover:bg-rose-400/10 hover:border-rose-400/20 hover:text-rose-400 transition-all">
          <span className="shrink-0 text-lg">
            <LuLogOut />
          </span>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.14 }}
                className="text-[13px] font-semibold whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-6 -right-3 w-7 h-7 rounded-full bg-[#0a2540] border-2 border-sky-500/50 text-sky-300 flex items-center justify-center shadow-lg shadow-black/30 hover:border-sky-400 transition-colors"
      >
        <motion.span
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.25 }}
        >
          <LuChevronLeft />
        </motion.span>
      </button>
    </motion.aside>
  );
}

export default TeachersSideBar;
