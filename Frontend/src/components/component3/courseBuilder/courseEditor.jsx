import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════
// Constants
// ════════════════════════════════════════════════════════════════
const BLOCK_TYPES = [
  { type: "text",  label: "Text",  icon: "¶",   color: "#3b82f6" },
  { type: "code",  label: "Code",  icon: "</>", color: "#10b981" },
  { type: "image", label: "Image", icon: "⊞",   color: "#ec4899" },
  { type: "video", label: "Video", icon: "▶",   color: "#f59e0b" },
];

// ════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════
const uid = () => Math.random().toString(36).slice(2, 9);
const snap = (arr, i, v) => arr.map((x, j) => j === i ? { ...x, ...v } : x);
const deepClone = (x) => JSON.parse(JSON.stringify(x));

const makeUnit    = () => ({ _id: uid(), _new: true, id: "", title: "", description: "", chapters: [] });
const makeChapter = () => ({ _id: uid(), _new: true, id: "", title: "", lessons: [] });
const makeLesson  = () => ({ _id: uid(), _new: true, title: "", duration: "", type: "text", blocks: [] });
const makeBlock   = (type) => ({ _lid: uid(), type, value: "", caption: "", filename: "" });

const iCls = "w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all";

// ════════════════════════════════════════════════════════════════
// Tag
// ════════════════════════════════════════════════════════════════
function Tag({ children, color }) {
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
      style={{ background: color + "18", color }}>
      {children}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════
// Block Editor
// ════════════════════════════════════════════════════════════════
function BlockEditor({ block, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const meta = BLOCK_TYPES.find(b => b.type === block.type);
  return (
    <div className="group rounded-xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: meta.color + "44" }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: meta.color + "0d" }}>
        <Tag color={meta.color}>{meta.icon} {meta.label}</Tag>
        <div className="flex items-center gap-0.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onMoveUp} disabled={isFirst} className="w-5 h-5 rounded bg-white/80 text-stone-400 hover:text-stone-700 disabled:opacity-20 flex items-center justify-center text-[11px] border border-stone-100">↑</button>
          <button onClick={onMoveDown} disabled={isLast} className="w-5 h-5 rounded bg-white/80 text-stone-400 hover:text-stone-700 disabled:opacity-20 flex items-center justify-center text-[11px] border border-stone-100">↓</button>
          <button onClick={onRemove} className="w-5 h-5 rounded bg-white/80 text-red-300 hover:text-red-500 flex items-center justify-center text-sm border border-red-100">×</button>
        </div>
      </div>
      <div className="bg-white">
        {block.type === "text" && (
          <textarea
            className="w-full text-stone-700 text-sm px-4 py-3 outline-none resize-none min-h-[100px] placeholder-stone-300 leading-relaxed"
            style={{ fontFamily: "'Lora',Georgia,serif" }}
            placeholder="Write content…"
            value={block.value}
            onChange={e => onChange({ value: e.target.value })}
          />
        )}
        {block.type === "code" && (<>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a2e]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
              <div className="w-2 h-2 rounded-full bg-green-400/70" />
            </div>
            <input
              className="flex-1 bg-transparent text-slate-500 text-[11px] font-mono outline-none placeholder-slate-700 ml-1"
              placeholder="filename.js"
              value={block.filename || ""}
              onChange={e => onChange({ filename: e.target.value })}
            />
          </div>
          <textarea
            className="w-full bg-[#0d0d1a] text-emerald-300 font-mono text-sm px-4 py-3 outline-none resize-none min-h-[120px] leading-relaxed placeholder-slate-700"
            placeholder="// code here…"
            value={block.value}
            onChange={e => onChange({ value: e.target.value })}
          />
        </>)}
        {(block.type === "image" || block.type === "video") && (
          <div className="p-3 space-y-2">
            <input
              className={iCls}
              placeholder={block.type === "image" ? "Image URL  https://…" : "Video URL  https://…"}
              value={block.value}
              onChange={e => onChange({ value: e.target.value })}
            />
            <input
              className={iCls}
              placeholder="Caption (optional)"
              value={block.caption || ""}
              onChange={e => onChange({ caption: e.target.value })}
            />
            {block.type === "image" && block.value && (
              <img src={block.value} alt="" className="w-full max-h-40 object-cover rounded-lg border border-stone-100" onError={e => e.target.style.display = "none"} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Lesson Content Editor
// ════════════════════════════════════════════════════════════════
function LessonEditor({ lesson, onChange }) {
  const blocks = lesson?.blocks || [];

  const addBlock    = (type) => onChange({ blocks: [...blocks, makeBlock(type)] });
  const updateBlock = (bi, v) => onChange({ blocks: snap(blocks, bi, v) });
  const removeBlock = (bi) => onChange({ blocks: blocks.filter((_, j) => j !== bi) });
  const moveBlock   = (bi, d) => {
    const b = [...blocks], to = bi + d;
    if (to < 0 || to >= b.length) return;
    [b[bi], b[to]] = [b[to], b[bi]];
    onChange({ blocks: b });
  };

  return (
    <div>
      {/* Lesson meta fields */}
      <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-stone-100">
        <input
          className={iCls + " col-span-2"}
          placeholder="Lesson title *"
          value={lesson.title}
          onChange={e => onChange({ title: e.target.value })}
        />
        <input
          className={iCls}
          placeholder="Duration  e.g. 8 min"
          value={lesson.duration || ""}
          onChange={e => onChange({ duration: e.target.value })}
        />
      </div>

      {/* Blocks */}
      <div className="space-y-4">
        {blocks.length === 0 && (
          <div className="border-2 border-dashed border-stone-100 rounded-2xl py-12 text-center">
            <p className="text-stone-300 text-xs">No blocks yet — add one below.</p>
          </div>
        )}
        <AnimatePresence mode="popLayout">
          {blocks.map((block, bi) => (
            <motion.div key={block._lid || bi} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }}>
              <BlockEditor
                block={block}
                onChange={v => updateBlock(bi, v)}
                onRemove={() => removeBlock(bi)}
                onMoveUp={() => moveBlock(bi, -1)}
                onMoveDown={() => moveBlock(bi, 1)}
                isFirst={bi === 0}
                isLast={bi === blocks.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add block toolbar */}
      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-stone-100 mt-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 mr-1 shrink-0">Add block</span>
        {BLOCK_TYPES.map(bt => (
          <button
            key={bt.type}
            onClick={() => addBlock(bt.type)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all hover:scale-105 active:scale-95"
            style={{ borderColor: bt.color + "33", color: bt.color, background: bt.color + "0d" }}
          >
            {bt.icon} {bt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Editor Sidebar Tree
// ════════════════════════════════════════════════════════════════
function EditorSidebar({ course, activeLesson, onSelectLesson, onCourseChange }) {
  const [openUnits, setOpenUnits] = useState(() => ({ [course.units[0]?._id]: true }));
  const [openChapters, setOpenChapters] = useState(() => ({ [course.units[0]?.chapters[0]?._id]: true }));

  const editUnit    = (uid, v) => onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, ...v } : u) });
  const deleteUnit  = (uid) => { onCourseChange({ units: course.units.filter(u => u._id !== uid) }); if (activeLesson?.unitId === uid) onSelectLesson(null); };
  const addUnit     = () => { const u = makeUnit(); onCourseChange({ units: [...course.units, u] }); setOpenUnits(s => ({ ...s, [u._id]: true })); };

  const editChapter   = (uid, cid, v) => onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, chapters: u.chapters.map(c => c._id === cid ? { ...c, ...v } : c) } : u) });
  const deleteChapter = (uid, cid) => { onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, chapters: u.chapters.filter(c => c._id !== cid) } : u) }); if (activeLesson?.chapterId === cid) onSelectLesson(null); };
  const addChapter    = (uid) => { const ch = makeChapter(); onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, chapters: [...u.chapters, ch] } : u) }); setOpenChapters(s => ({ ...s, [ch._id]: true })); };

  const addLesson    = (uid, cid) => {
    const l = makeLesson();
    onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, chapters: u.chapters.map(c => c._id === cid ? { ...c, lessons: [...c.lessons, l] } : c) } : u) });
    const ch = course.units.find(u => u._id === uid)?.chapters.find(c => c._id === cid);
    onSelectLesson({ unitId: uid, chapterId: cid, lessonIdx: ch?.lessons?.length ?? 0 });
  };
  const deleteLesson = (uid, cid, li) => {
    onCourseChange({ units: course.units.map(u => u._id === uid ? { ...u, chapters: u.chapters.map(c => c._id === cid ? { ...c, lessons: c.lessons.filter((_, j) => j !== li) } : c) } : u) });
    if (activeLesson?.unitId === uid && activeLesson?.chapterId === cid && activeLesson?.lessonIdx === li) onSelectLesson(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-2">
        <AnimatePresence>
          {course.units.map((unit, ui) => (
            <motion.div key={unit._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}>

              {/* Unit header */}
              <div className={`flex items-center gap-1 px-4 py-2.5 group hover:bg-stone-50 transition-colors ${openUnits[unit._id] ? "bg-stone-50/60" : ""}`}>
                <button onClick={() => setOpenUnits(s => ({ ...s, [unit._id]: !s[unit._id] }))} className="flex items-center gap-2 flex-1 min-w-0 text-left">
                  <span className="text-[10px] text-stone-300 w-3 shrink-0 inline-block transition-transform duration-150" style={{ transform: openUnits[unit._id] ? "rotate(90deg)" : "none" }}>▸</span>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest shrink-0">U{ui + 1}</span>
                  <span className="text-xs font-bold text-stone-700 truncate">{unit.title || <em className="text-stone-300 font-normal">Untitled</em>}</span>
                </button>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button title="Add chapter" onClick={() => addChapter(unit._id)} className="w-5 h-5 rounded text-stone-400 hover:text-violet-600 hover:bg-violet-50 flex items-center justify-center text-xs transition-all">+</button>
                  <button title="Delete unit" onClick={() => deleteUnit(unit._id)} className="w-5 h-5 rounded text-stone-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-sm transition-all">×</button>
                </div>
              </div>

              {/* Unit inline edit fields */}
              {openUnits[unit._id] && (
                <div className="px-4 pb-2 space-y-1.5 bg-amber-50/30">
                  <input className={iCls + " text-[12px]"} placeholder="Unit title *" value={unit.title} onChange={e => editUnit(unit._id, { title: e.target.value })} />
                  <textarea className={iCls + " text-[12px] resize-none min-h-[40px]"} placeholder="Description (optional)" value={unit.description || ""} onChange={e => editUnit(unit._id, { description: e.target.value })} />
                </div>
              )}

              <AnimatePresence>
                {openUnits[unit._id] && unit.chapters.map((ch, ci) => (
                  <motion.div key={ch._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}>

                    {/* Chapter header */}
                    <div className="flex items-center gap-1 pl-9 pr-4 py-2 group/ch hover:bg-stone-50 transition-colors">
                      <button onClick={() => setOpenChapters(s => ({ ...s, [ch._id]: !s[ch._id] }))} className="flex items-center gap-1.5 flex-1 min-w-0 text-left">
                        <span className="text-[10px] text-stone-200 w-3 shrink-0 inline-block transition-transform duration-150" style={{ transform: openChapters[ch._id] ? "rotate(90deg)" : "none" }}>▸</span>
                        <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest shrink-0">C{ci + 1}</span>
                        <span className="text-xs text-stone-500 font-semibold truncate">{ch.title || <em className="text-stone-300 font-normal">Untitled</em>}</span>
                      </button>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover/ch:opacity-100 transition-opacity shrink-0">
                        <button title="Add lesson" onClick={() => addLesson(unit._id, ch._id)} className="w-5 h-5 rounded text-stone-400 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center text-xs transition-all">+</button>
                        <button title="Delete chapter" onClick={() => deleteChapter(unit._id, ch._id)} className="w-5 h-5 rounded text-stone-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center text-sm transition-all">×</button>
                      </div>
                    </div>

                    {/* Chapter inline edit */}
                    {openChapters[ch._id] && (
                      <div className="pl-12 pr-4 pb-1.5">
                        <input className={iCls + " text-[12px]"} placeholder="Chapter title *" value={ch.title} onChange={e => editChapter(unit._id, ch._id, { title: e.target.value })} />
                      </div>
                    )}

                    <AnimatePresence>
                      {openChapters[ch._id] && ch.lessons.map((lesson, li) => {
                        const isActive = activeLesson?.unitId === unit._id && activeLesson?.chapterId === ch._id && activeLesson?.lessonIdx === li;
                        const blockSummary = BLOCK_TYPES.map(bt => ({ ...bt, cnt: (lesson.blocks || []).filter(b => b.type === bt.type).length })).filter(bt => bt.cnt > 0);

                        return (
                          <motion.div key={lesson._id || li} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}>
                            <div
                              onClick={() => onSelectLesson({ unitId: unit._id, chapterId: ch._id, lessonIdx: li })}
                              className={`flex items-center gap-2 pl-16 pr-4 py-2.5 cursor-pointer transition-all border-r-2 group/l ${isActive ? "bg-amber-50 border-amber-400" : "hover:bg-stone-50/80 border-transparent"}`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className={`text-xs truncate ${isActive ? "font-bold text-amber-700" : "text-stone-500 font-medium"}`}>
                                  {lesson.title || <em className="text-stone-300 font-normal">Untitled Lesson</em>}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  {blockSummary.map(bt => (
                                    <span key={bt.type} className="text-[9px] font-bold px-1.5 py-px rounded" style={{ background: bt.color + "15", color: bt.color }}>{bt.icon}{bt.cnt}</span>
                                  ))}
                                  {lesson.duration && <span className="text-[9px] text-stone-300">{lesson.duration}</span>}
                                </div>
                              </div>
                              <button
                                onClick={e => { e.stopPropagation(); deleteLesson(unit._id, ch._id, li); }}
                                className="opacity-0 group-hover/l:opacity-100 text-red-300 hover:text-red-500 text-base leading-none shrink-0"
                              >×</button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {openChapters[ch._id] && (
                      <button onClick={() => addLesson(unit._id, ch._id)} className="w-full text-left pl-16 pr-4 py-1.5 text-[11px] text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors">
                        + Add lesson
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {openUnits[unit._id] && (
                <button onClick={() => addChapter(unit._id)} className="w-full text-left pl-10 pr-4 py-1.5 text-[11px] text-stone-400 hover:text-violet-600 hover:bg-violet-50 transition-colors mb-1">
                  + Add chapter
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <button onClick={addUnit} className="w-full text-left px-4 py-3 text-xs font-bold text-stone-400 hover:text-amber-600 hover:bg-amber-50 transition-colors border-t border-stone-100 mt-1">
          + Add unit
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// CourseEditor — default export
//
// Props:
//   course    — the course object from your API
//   onSave    — async (updatedCourse) => void   called on Save
//   onPreview — callback to switch to preview mode (optional)
//   onBack    — callback to go back to course list (optional)
// ════════════════════════════════════════════════════════════════
export default function CourseEditor({ course: initialCourse, onSave, onPreview, onBack }) {
  const [course, setCourse]     = useState(() => deepClone(initialCourse));
  const [activeLesson, setActiveLesson] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  const handleCourseChange = (v) => setCourse(c => ({ ...c, ...v }));

  const activeLessonObj = activeLesson
    ? course.units.find(u => u._id === activeLesson.unitId)
        ?.chapters.find(c => c._id === activeLesson.chapterId)
        ?.lessons[activeLesson.lessonIdx]
    : null;

  const handleLessonChange = (v) => {
    if (!activeLesson) return;
    setCourse(c => ({
      ...c, units: c.units.map(u => u._id !== activeLesson.unitId ? u : {
        ...u, chapters: u.chapters.map(ch => ch._id !== activeLesson.chapterId ? ch : {
          ...ch, lessons: snap(ch.lessons, activeLesson.lessonIdx, v)
        })
      })
    }));
  };

  // ── API call lives here ──────────────────────────────────────
  // Replace the setTimeout with: await courseAPI.update(course._id, course)
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.(course);         // ← parent calls courseAPI.update()
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Save failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:4px}`}</style>

      <div className="min-h-screen bg-stone-50 flex flex-col">

        {/* ── Top bar ── */}
        <header className="bg-white border-b border-stone-100 px-6 py-3 flex items-center gap-4 shrink-0 z-10 sticky top-0">
          {onBack && (
            <>
              <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-stone-700 transition-colors text-sm font-semibold group">
                <span className="group-hover:-translate-x-0.5 transition-transform">←</span> My Courses
              </button>
              <span className="text-stone-200">|</span>
            </>
          )}
          <span className="text-sm font-bold text-stone-700 truncate flex-1">{course.title}</span>

          {/* Edit badge */}
          <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-500 text-xs font-bold border border-amber-100">✏️ Editing</span>

          {onPreview && (
            <button
              onClick={onPreview}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
            >
              👁 Preview
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${saved ? "bg-emerald-400 text-white" : saving ? "bg-stone-200 text-stone-400" : "bg-amber-400 text-stone-900 hover:bg-amber-300 shadow-sm"}`}
          >
            {saved ? "✓ Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </header>

        {/* ── Hero banner (editable fields) ── */}
        <div className={`relative bg-gradient-to-br ${course.backgroundColor} px-8 pt-6 pb-6 shrink-0 overflow-hidden`}>
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute top-5 right-8 w-12 h-12 rounded-full bg-white/10" />
          <div className="max-w-4xl space-y-2">
            <div className="flex gap-3">
              <input
                className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-lg px-3 py-1.5 text-white placeholder-white/50 text-2xl font-black outline-none focus:bg-white/30 transition-all"
                style={{ fontFamily: "Georgia,serif" }}
                placeholder="Course title *"
                value={course.title}
                onChange={e => handleCourseChange({ title: e.target.value })}
              />
              <input
                className="w-36 bg-white/20 backdrop-blur border border-white/30 rounded-lg px-3 py-1.5 text-white/80 placeholder-white/40 text-xs font-bold outline-none focus:bg-white/30 transition-all"
                placeholder="Tag e.g. Engineering"
                value={course.subjectTag || ""}
                onChange={e => handleCourseChange({ subjectTag: e.target.value })}
              />
            </div>
            <textarea
              className="w-full bg-white/20 backdrop-blur border border-white/30 rounded-lg px-3 py-1.5 text-white/80 placeholder-white/40 text-sm outline-none focus:bg-white/30 transition-all resize-none"
              placeholder="Course description…"
              rows={2}
              value={course.description || ""}
              onChange={e => handleCourseChange({ description: e.target.value })}
            />
            <div className="flex gap-3 items-center">
              <span className="text-white/60 text-xs font-semibold">Gradient:</span>
              {[
                "from-sky-500 to-cyan-400",
                "from-violet-500 to-purple-400",
                "from-rose-500 to-pink-400",
                "from-emerald-500 to-teal-400",
                "from-orange-500 to-amber-400",
                "from-slate-600 to-slate-500",
              ].map(g => (
                <button
                  key={g}
                  onClick={() => handleCourseChange({ backgroundColor: g })}
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 transition-all ${course.backgroundColor === g ? "border-white scale-110" : "border-white/30 hover:scale-105"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>

          {/* Sidebar */}
          <aside className="w-72 shrink-0 bg-white border-r border-stone-100 overflow-hidden flex flex-col">
            <EditorSidebar
              course={course}
              activeLesson={activeLesson}
              onSelectLesson={setActiveLesson}
              onCourseChange={handleCourseChange}
            />
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeLesson?.unitId}-${activeLesson?.chapterId}-${activeLesson?.lessonIdx}`}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: .18 }} className="h-full"
              >
                {!activeLesson ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center px-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.backgroundColor} mb-5 flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-2xl">✏️</span>
                    </div>
                    <h2 className="text-xl font-black text-stone-700 mb-2" style={{ fontFamily: "Georgia,serif" }}>Select a lesson to edit</h2>
                    <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
                      Choose a lesson from the sidebar, or use the + buttons to add new content.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-5 flex-wrap">
                      <span>{course.units.find(u => u._id === activeLesson.unitId)?.title}</span>
                      <span className="text-stone-200">›</span>
                      <span>{course.units.find(u => u._id === activeLesson.unitId)?.chapters.find(c => c._id === activeLesson.chapterId)?.title}</span>
                    </div>

                    {activeLessonObj && (
                      <LessonEditor lesson={activeLessonObj} onChange={handleLessonChange} />
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}