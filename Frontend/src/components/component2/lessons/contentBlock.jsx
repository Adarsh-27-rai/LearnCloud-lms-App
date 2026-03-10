import React, { useState } from "react";
import { FiPlay } from "react-icons/fi";

// ─── VIDEO BLOCK ──────────────────────────────────────────────────────────────
export function VideoBlock({ block }) {
  return (
    <div className="aspect-video bg-slate-900 rounded-3xl shadow-2xl mb-10 flex items-center justify-center relative overflow-hidden group cursor-pointer border-4 border-white shadow-slate-200">
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all group-hover:scale-110 group-hover:bg-white/20 z-10">
        <FiPlay size={32} className="text-white ml-1" />
      </div> */}
      <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ/modestbranding=1&rel=0"
          title="YouTube video"
          allowFullScreen
        ></iframe>
    </div>
  );
}

// ─── TEXT BLOCK ───────────────────────────────────────────────────────────────
export function TextBlock({ block }) {
  const lines     = (block.contentDescription ?? "").split("\n").filter(Boolean);
  const isBullets = lines.length > 1 && lines.every((l) => l.startsWith("•") || l.startsWith("-"));

  return (
    <div className="mb-6">
      {block.title && (
        <h3 className="text-slate-900 font-bold text-lg mb-3">{block.title}</h3>
      )}
      {isBullets ? (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <ul className="space-y-2">
            {lines.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                <span className="text-base leading-relaxed">{line.replace(/^[•\-]\s*/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 text-lg leading-relaxed">{block.contentDescription}</p>
      )}
    </div>
  );
}

// ─── CODE BLOCK ───────────────────────────────────────────────────────────────
export function CodeBlock({ block }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mb-6">
      {block.title && (
        <h3 className="text-slate-900 font-bold text-lg mb-3">{block.title}</h3>
      )}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        {/* macOS chrome bar */}
        <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/90" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <span className="w-3 h-3 rounded-full bg-green-400/90" />
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(block.contentDescription ?? "");
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="text-[11px] font-semibold text-slate-400 hover:text-white transition px-2 py-1 rounded-md hover:bg-white/10"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <pre className="bg-slate-900 text-[13px] text-green-300 font-mono overflow-x-auto p-5 leading-relaxed m-0 whitespace-pre">
          {block.contentDescription}
        </pre>
      </div>
    </div>
  );
}

// ─── RENDERER ─────────────────────────────────────────────────────────────────
export function renderBlock(block) {
  switch (block.mode) {
    case "video": return <VideoBlock key={block._id} block={block} />;
    case "code": return <CodeBlock  key={block._id} block={block} />;
    default: return <TextBlock  key={block._id} block={block} />;
  }
}