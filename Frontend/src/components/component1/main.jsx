import {useState, useEffect} from 'react'
import { Bell, BookOpen, CheckCircle, Clock, BarChart3, Search } from "lucide-react";
import { motion } from "framer-motion";
import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const Progress = ({ value }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
            className="h-2 bg-slate-900 rounded-full"
            style={{ width: `${value}%` }}
        />
    </div>
);

const main = () => {

    const [course, setCourse] = useState([]);

    const fetchCourse = async () => {
        const cor = await API.get("/course");
        // console.log(cor);
        setCourse(cor.data);
        console.log(course);

    }

    useEffect(() => {
        fetchCourse();
    }, [])
    return (
        <div>
            <main className="h-screen w-[80vw] flex-1 p-6">
                {/* Top Bar */}
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 w-full max-w-md">
                        <Search className="text-gray-500" />
                        <input className='w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Search courses..." />
                    </div>
                    <Bell className="cursor-pointer" />
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[{
                        title: "Enrolled",
                        value: 8,
                        icon: <BookOpen />
                    }, {
                        title: "In Progress",
                        value: 4,
                        icon: <Clock />
                    }, {
                        title: "Completed",
                        value: 4,
                        icon: <CheckCircle />
                    }, {
                        title: "Performance",
                        value: "87%",
                        icon: <BarChart3 />
                    }].map((item, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.05 }}>
                            <div className="p-5 flex items-center gap-4 bg-white rounded-2xl shadow-lg cursor-pointer">
                                <div className="p-3 bg-blue-100 rounded-xl">{item.icon}</div>
                                <div>
                                    <p className="text-sm text-gray-500">{item.title}</p>
                                    <p className="text-2xl font-bold">{item.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Courses */}

                <section className="h-[65%] overflow-y-auto">
                    <h3 className="mx-4 text-2xl font-semibold mb-4">Continue Learning</h3>
                    <div className="flex justify-start items-center flex-wrap gap-15 my-6">
                        {/* {[{
                            name: "JavaScript Mastery",
                            progress: 70,
                            url: "/flat-design.avif"
                        }, {
                            name: "React + Tailwind",
                            progress: 55,
                            url: "/modern-blue.jpg"
                        }, {
                            name: "Backend with Node",
                            progress: 40,
                            url: "/white-paper-geometric-pattern.webp"
                        }, {
                            name: "Backend with Node",
                            progress: 40,
                            url: "/flat-design.avif"
                        }, {
                            name: "Backend with Node",
                            progress: 40,
                            url: "/white-paper-geometric-pattern.webp"
                        }, {
                            name: "Backend with Node",
                            progress: 40,
                            url: "/modern-blue.jpg"
                        }].map((course, i) => ( */}

                        
                        {course.map((item, i) => (
                            <Link to="/studentDashboard/courses" key={i}>
                                <motion.div whileHover={{ y: -6, scale: 1.05 }}>
                                    <div style={{ backgroundImage: `url(/modern-blue.jpg)` }} className={`p-5 bg-cover bg-no-repeat rounded-3xl shadow-lg h-65 w-85 relative cursor-pointer`}>
                                        <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                                        <div className="w-[90%] mt-4 absolute bottom-5 p-2.5 rounded-lg">
                                            <h4 className="text-xl font-bold mb-3">Progress</h4>
                                            <Progress value={35} />
                                            <GrNext className="h-8 w-8 text-md font-ultrabold absolute top-3 right-3 p-1 bg-black/20 rounded-full cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                </section>

                <footer className="mt-5 h-6 border-t-2 border-gray-400 py-2 text-center text-2xs text-gray-500">
                    © {new Date().getFullYear()} LearnSphere · Your future starts here.
                </footer>
            </main>
        </div>
    )
}

export default main
