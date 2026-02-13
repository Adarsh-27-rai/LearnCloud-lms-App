import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import API from '../api/axios'

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);

  async function signup() {
    try {
      const res = await API.post("/auth/signup", { name, email, password, role });
      console.log(res.data)
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Create Account</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            <div className="space-y-5">
              <h2 className="text-xl text-gray-400 text-center">
                Join As
              </h2>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setRole("Student")}
                  className={`w-full py-3 rounded-2xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 ${role == "Student" && "bg-indigo-100"}`}
                >
                  🎓 Student
                </button>

                <button
                  onClick={() => setRole("Teacher")}
                  className={`w-full py-3 rounded-2xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 ${role == "Teacher" && "bg-indigo-100"}`}
                >
                  👨‍🏫 Teacher
                </button>
              </div>
            </div>
            <input type="text" placeholder="Full Name" className="w-full rounded-xl border px-4 py-2.5" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" className="w-full rounded-xl border px-4 py-2.5" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full rounded-xl border px-4 py-2.5" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="w-full px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700" onClick={signup}>
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
