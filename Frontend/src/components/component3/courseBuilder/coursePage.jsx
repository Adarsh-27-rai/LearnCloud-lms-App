import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseAPI from "../../../api/axios";      // your axios API layer
import CoursePreview from "./CoursePreview";
import CourseEditor  from "./CourseEditor";

// ════════════════════════════════════════════════════════════════
// CoursePage
// Decides whether to show CoursePreview or CourseEditor.
// All API calls live here — the two sub-components are API-free.
// ════════════════════════════════════════════════════════════════
export default function CoursePage() {
  const { id }       = useParams();
  const navigate     = useNavigate();

  const [course,  setCourse]  = useState(null);
  const [mode,    setMode]    = useState("preview");   // "preview" | "edit"
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── FETCH on mount ───────────────────────────────────────────
  useEffect(() => {
    courseAPI.getOne(id)
      .then(res => setCourse(res.data))
      .catch(err => setError(err.response?.data?.message || "Failed to load course"))
      .finally(() => setLoading(false));
  }, [id]);

  // ── SAVE ─────────────────────────────────────────────────────
  const handleSave = async (updatedCourse) => {
    const res = await courseAPI.update(id, updatedCourse);
    setCourse(res.data);   // keep parent state in sync with server response
  };

  // ── Loading / error states ───────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-stone-400 text-sm animate-pulse">Loading course…</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-red-400 text-sm">{error}</div>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────
  if (mode === "edit") {
    return (
      <CourseEditor
        course={course}
        onSave={handleSave}
        onPreview={() => setMode("preview")}
        onBack={() => navigate("/courses")}
      />
    );
  }

  return (
    <CoursePreview
      course={course}
      onEdit={() => setMode("edit")}
      onBack={() => navigate("/courses")}
    />
  );
}