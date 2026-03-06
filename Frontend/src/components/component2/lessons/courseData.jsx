// ─── COURSE DATA (mirrors Mongoose schema) ────────────────────────────────────
export const courseData = {
  _id: "course_1",
  title: "Advanced React Patterns & Performance",
  description: "Master the art of building scalable React applications with advanced patterns, performance optimization techniques, and modern state management.",
  units: [
    {
      _id: "u1", order: 1, title: "Architecture & Foundation",
      description: "Establishing the ground rules for a scalable codebase.",
      chapters: [
        {
          _id: "c1", order: 1, title: "Chapter 1: Project Structure",
          lessons: [
            {
              _id: "l1", order: 1, title: "Folder Structure Best Practices",
              type: "video", isCompleted: true, duration: "10:20",
              content: [
                {
                  _id: "b1", order: 1, mode: "video",
                  title: null, videoURL: null,
                  contentDescription: "A walkthrough of the recommended folder structure for large-scale React apps.",
                },
                {
                  _id: "b2", order: 2, mode: "text",
                  title: "Why Structure Matters",
                  contentDescription: "A well-defined folder structure reduces onboarding time, prevents circular dependencies, and makes code reviews significantly smoother. Teams that invest in structure early save hundreds of hours down the line. The guiding principle is simple: keep things that change together, together.",
                },
                {
                  _id: "b3", order: 3, mode: "code",
                  title: "Recommended Project Layout",
                  contentDescription: `src/
├── assets/          # fonts, images, icons
├── components/
│   ├── ui/          # Button, Input, Modal …
│   └── features/    # domain-specific blocks
├── hooks/           # useAuth, useDebounce …
├── pages/           # one file per route
├── services/        # axios instances, API calls
├── store/           # Zustand / Redux slices
└── utils/           # pure helper functions`,
                },
                {
                  _id: "b4", order: 4, mode: "text",
                  title: "Key Takeaways",
                  contentDescription: "• Co-locate tests next to the file they test.\n• Keep ui/ components truly generic — no business logic.\n• One default export per file keeps imports predictable.\n• Optimizing for production performance starts with structure.",
                },
              ],
            },
            {
              _id: "l2", order: 2, title: "Configuring Vite & TypeScript",
              type: "text", isCompleted: true, duration: "15 min",
              content: [
                {
                  _id: "b5", order: 1, mode: "text",
                  title: null,
                  contentDescription: "Vite offers near-instant cold starts and lightning-fast HMR. Pairing it with TypeScript gives you type safety and excellent IDE support from day one — without the overhead of webpack or Create React App.",
                },
                {
                  _id: "b6", order: 2, mode: "code",
                  title: "vite.config.ts",
                  contentDescription: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: { port: 3000, open: true }
})`,
                },
                {
                  _id: "b7", order: 3, mode: "code",
                  title: "tsconfig.json",
                  contentDescription: `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}`,
                },
              ],
            },
          ],
        },
        {
          _id: "c2", order: 2, title: "Chapter 2: Component Patterns",
          lessons: [
            {
              _id: "l3", order: 1, title: "Compound Components",
              type: "code", isCompleted: false, duration: "25 min",
              content: [
                {
                  _id: "b8", order: 1, mode: "video",
                  title: null, videoURL: null,
                  contentDescription: "We build a fully accessible Tabs component using the compound pattern — no prop drilling required.",
                },
                {
                  _id: "b9", order: 2, mode: "text",
                  title: "What is the Compound Pattern?",
                  contentDescription: "Compound components share implicit state through React Context instead of threading dozens of props down the tree. The parent owns the state; children consume it via context. This makes the API feel natural, keeps each piece independently composable, and dramatically reduces surface area.",
                },
                {
                  _id: "b10", order: 3, mode: "code",
                  title: "Tabs.tsx",
                  contentDescription: `import { createContext, useContext, useState } from 'react'

const TabsCtx = createContext(null)

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue)
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      {children}
    </TabsCtx.Provider>
  )
}

export function TabTrigger({ value, children }) {
  const { active, setActive } = useContext(TabsCtx)
  return (
    <button
      onClick={() => setActive(value)}
      style={{ fontWeight: active === value ? 700 : 400 }}
    >
      {children}
    </button>
  )
}

export function TabPanel({ value, children }) {
  const { active } = useContext(TabsCtx)
  return active === value ? <div>{children}</div> : null
}`,
                },
              ],
            },
            {
              _id: "l4", order: 2, title: "Render Props vs Hooks",
              type: "video", isCompleted: false, duration: "12:15",
              content: [],
            },
          ],
        },
      ],
    },
    {
      _id: "u2", order: 2, title: "State & Performance",
      description: "Deep dive into React's rendering engine.",
      chapters: [{
        _id: "c3", order: 1, title: "Chapter 1: Re-rendering Myths",
        lessons: [
          { _id: "l5", order: 1, title: "When does React render?", type: "video", isCompleted: false, duration: "18:00", content: [] },
          { _id: "l6", order: 2, title: "Memoization Strategies", type: "code", isCompleted: false, duration: "20 min", content: [] },
        ],
      }],
    },
    {
      _id: "u3", order: 3, title: "Real World Application",
      description: "Building a full-featured dashboard.",
      chapters: [{
        _id: "c4", order: 1, title: "Chapter 1: API Integration",
        lessons: [
          { _id: "l7", order: 1, title: "Data Fetching with React Query", type: "video", isCompleted: false, duration: "22:30", content: [] },
        ],
      }],
    },
  ],
};

// ─── HELPER ───────────────────────────────────────────────────────────────────
export const flatLessons = (course) =>
  course.units
    .flatMap((u) => [...u.chapters].sort((a, b) => a.order - b.order))
    .flatMap((c) => [...c.lessons].sort((a, b) => a.order - b.order));