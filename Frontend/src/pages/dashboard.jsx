import { Bell, BookOpen, CheckCircle, Clock, BarChart3, Search } from "lucide-react";
import Sidebar from "../components/component1/sidebar";
import Main from "../components/component1/main";


const Progress = ({ value }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full">
    <div
      className="h-2 bg-slate-900 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <Main />
    </div>
  );
}

export default StudentDashboard;
