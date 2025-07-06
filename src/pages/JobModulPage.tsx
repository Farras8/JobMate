import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, GraduationCap, Sparkles, Target, CheckCircle, Trophy, Play, Clock } from 'lucide-react';
import FloatingChatbot from '../components/FloatingChatbot';

const JobModulPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-36 h-36 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            </div>

            <Navbar />

            <main className="flex-grow px-4 py-16 relative z-10">
                {/* Header Section */}
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <GraduationCap size={14} className="text-emerald-600" />
                        <span>Pembelajaran Interaktif</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent leading-tight mb-6">
                        Modul Pembelajaran Karir
                    </h1>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Sparkles size={14} className="text-green-600" />
                        <span>Materi Terkurasi!</span>
                    </div>

                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Tingkatkan skill dan pengetahuan karir Anda dengan modul pembelajaran yang dirancang khusus oleh para ahli. 
                        Dari soft skills hingga technical skills, semua tersedia dalam format yang mudah dipahami.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Dashboard Header */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200/50">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Dashboard</h2>
                                <p className="text-gray-600">Track your progress and continue your career development journey</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-emerald-600">67%</div>
                                <div className="text-sm text-gray-500">Overall Progress</div>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="bg-gray-200 rounded-full h-3 mb-4">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full w-2/3"></div>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">24</div>
                                <div className="text-sm text-gray-500">Modules Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">8</div>
                                <div className="text-sm text-gray-500">Certificates Earned</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">36h</div>
                                <div className="text-sm text-gray-500">Learning Time</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">15</div>
                                <div className="text-sm text-gray-500">Skills Gained</div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Paths */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        {/* Continue Learning */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Continue Learning</h3>
                                <button className="text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Course Card 1 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <GraduationCap size={32} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-800 mb-1">Advanced Communication Skills</h4>
                                            <p className="text-gray-600 text-sm mb-2">Master the art of professional communication</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">75%</span>
                                            </div>
                                        </div>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-colors duration-300">
                                            Continue
                                        </button>
                                    </div>
                                </div>

                                {/* Course Card 2 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <Target size={32} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-800 mb-1">Project Management Fundamentals</h4>
                                            <p className="text-gray-600 text-sm mb-2">Learn essential project management skills</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">50%</span>
                                            </div>
                                        </div>
                                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl transition-colors duration-300">
                                            Continue
                                        </button>
                                    </div>
                                </div>

                                {/* Course Card 3 */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <Trophy size={32} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-800 mb-1">Leadership Excellence</h4>
                                            <p className="text-gray-600 text-sm mb-2">Develop your leadership potential</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-emerald-500 h-2 rounded-full w-1/4"></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">25%</span>
                                            </div>
                                        </div>
                                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition-colors duration-300">
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Learning Categories */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore Categories</h3>
                            <div className="space-y-4">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <BookOpen size={24} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Soft Skills</h4>
                                            <p className="text-sm text-gray-500">18 modules</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Target size={24} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Technical Skills</h4>
                                            <p className="text-sm text-gray-500">24 modules</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Trophy size={24} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Leadership</h4>
                                            <p className="text-sm text-gray-500">12 modules</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            <Play size={24} className="text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Interview Prep</h4>
                                            <p className="text-sm text-gray-500">15 modules</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Courses */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">Digital Marketing</h4>
                                <p className="text-gray-600 text-center mb-4">Master digital marketing strategies for modern businesses</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>⭐ 4.8</span>
                                    <span>6 hours</span>
                                    <span>2,341 students</span>
                                </div>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                                    Start Learning
                                </button>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Clock size={32} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">Time Management</h4>
                                <p className="text-gray-600 text-center mb-4">Boost productivity with effective time management techniques</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>⭐ 4.9</span>
                                    <span>4 hours</span>
                                    <span>1,987 students</span>
                                </div>
                                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                                    Start Learning
                                </button>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Target size={32} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">Data Analysis</h4>
                                <p className="text-gray-600 text-center mb-4">Learn data analysis fundamentals and visualization techniques</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>⭐ 4.7</span>
                                    <span>8 hours</span>
                                    <span>1,654 students</span>
                                </div>
                                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FloatingChatbot />
            <Footer />
        </div>
    );
};

export default JobModulPage;
