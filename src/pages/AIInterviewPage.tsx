import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Video, MessageSquare, Sparkles, Target, CheckCircle, Brain, Users, ArrowRight, Clock, Star } from 'lucide-react';
import FloatingChatbot from '../components/FloatingChatbot';

const AIInterviewPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedInterviewType, setSelectedInterviewType] = useState<string>('');
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        experienceLevel: 'Fresh Graduate'
    });

    const handleInterviewTypeSelect = (type: string) => {
        setSelectedInterviewType(type);
        // Scroll to form section
        document.getElementById('quick-setup')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStartInterview = () => {
        if (!selectedInterviewType) {
            alert('⚠️ Pilih jenis interview terlebih dahulu!');
            return;
        }
        
        if (!formData.position.trim()) {
            alert('⚠️ Masukkan posisi target terlebih dahulu!');
            return;
        }

        // Navigate to interview session with data
        navigate('/interview-session', {
            state: {
                interviewType: selectedInterviewType,
                position: formData.position,
                company: formData.company || 'Tech Company',
                experienceLevel: formData.experienceLevel
            }
        });
    };
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
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200/50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Brain size={14} className="text-indigo-600" />
                        <span>AI Interview Assistant</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight mb-6">
                        Latihan Interview dengan AI
                    </h1>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Sparkles size={14} className="text-green-600" />
                        <span>Simulasi Real-time!</span>
                    </div>

                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Persiapkan diri untuk interview kerja dengan simulasi AI yang realistis. Dapatkan feedback langsung dan tingkatkan kemampuan interview Anda dengan berbagai skenario pertanyaan.
                    </p>
                </div>

                {/* Step-by-Step Process */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Proses Interview dalam 4 Langkah</h2>
                        <p className="text-gray-600">Ikuti langkah mudah untuk memulai latihan interview Anda</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                            <div className="mt-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Target size={24} className="text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Pilih Jenis</h3>
                                <p className="text-sm text-gray-600">Tentukan tipe interview yang ingin Anda latih</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                            <div className="mt-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare size={24} className="text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Setup Profile</h3>
                                <p className="text-sm text-gray-600">Masukkan posisi dan level pengalaman Anda</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                            <div className="mt-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Video size={24} className="text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Mulai Interview</h3>
                                <p className="text-sm text-gray-600">Berinteraksi dengan AI interviewer</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                            <div className="mt-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={24} className="text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Review</h3>
                                <p className="text-sm text-gray-600">Dapatkan feedback dan evaluasi mendetail</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Start Section */}
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left - Interview Type Selection */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Brain size={20} className="text-white" />
                                </div>
                                Pilih Jenis Interview
                            </h3>
                            <p className="text-gray-600">Pilih tipe interview sesuai dengan kebutuhan persiapan Anda</p>
                        </div>

                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => handleInterviewTypeSelect('HR Interview')}
                                className={`group p-6 border-2 ${selectedInterviewType === 'HR Interview' ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50' : 'border-gray-200 hover:border-indigo-300'} rounded-2xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 w-full text-left`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                        <Users size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-800 mb-1">HR Interview</h4>
                                        <p className="text-sm text-gray-600">Fokus pada behavioral questions, soft skills, dan culture fit</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">15-20 menit</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-indigo-600 font-medium">Beginner Friendly</span>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-300" />
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleInterviewTypeSelect('Technical Interview')}
                                className={`group p-6 border-2 ${selectedInterviewType === 'Technical Interview' ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50' : 'border-gray-200 hover:border-purple-300'} rounded-2xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 w-full text-left`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Brain size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-800 mb-1">Technical Interview</h4>
                                        <p className="text-sm text-gray-600">Pertanyaan teknis sesuai domain dan posisi yang dilamar</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">30-45 menit</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-purple-600 font-medium">Advanced</span>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleInterviewTypeSelect('Case Study')}
                                className={`group p-6 border-2 ${selectedInterviewType === 'Case Study' ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-rose-50' : 'border-gray-200 hover:border-pink-300'} rounded-2xl cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 w-full text-left`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                        <MessageSquare size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-800 mb-1">Case Study</h4>
                                        <p className="text-sm text-gray-600">Simulasi pemecahan masalah bisnis dan analytical thinking</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">25-35 menit</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-pink-600 font-medium">Intermediate</span>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="text-gray-400 group-hover:text-pink-500 transition-colors duration-300" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right - Quick Setup */}
                    <div id="quick-setup" className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <Target size={20} className="text-white" />
                                </div>
                                Quick Setup
                            </h3>
                            <p className="text-gray-600">Siapkan profil interview Anda dalam beberapa langkah mudah</p>
                            {selectedInterviewType && (
                                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    ✓ {selectedInterviewType} Selected
                                </div>
                            )}
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleStartInterview(); }}>
                            <div>
                                <label htmlFor="position-target" className="block text-sm font-semibold text-gray-700 mb-3">Posisi Target</label>
                                <input
                                    id="position-target"
                                    name="position"
                                    type="text"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Senior Frontend Developer"
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700 mb-3">Perusahaan (Opsional)</label>
                                <input
                                    id="company-name"
                                    name="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Google, Tokopedia, Gojek"
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                                />
                            </div>

                            <div>
                                <label htmlFor="experience-level" className="block text-sm font-semibold text-gray-700 mb-3">Level Pengalaman</label>
                                <select 
                                    id="experience-level" 
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50/50"
                                >
                                    <option value="Fresh Graduate">Fresh Graduate</option>
                                    <option value="Junior (1-3 tahun)">Junior (1-3 tahun)</option>
                                    <option value="Mid-level (3-5 tahun)">Mid-level (3-5 tahun)</option>
                                    <option value="Senior (5+ tahun)">Senior (5+ tahun)</option>
                                </select>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                >
                                    <Video size={20} />
                                    <span>Mulai Interview Sekarang</span>
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-3">Interview akan berlangsung sekitar 15-30 menit</p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Features Cards */}
                <div className="max-w-7xl mx-auto mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Pilih AI Interview?</h2>
                        <p className="text-gray-600">Fitur canggih yang membantu Anda mempersiapkan interview dengan optimal</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Feedback</h3>
                            <p className="text-gray-600 mb-4">Dapatkan evaluasi instan untuk setiap jawaban yang Anda berikan dengan scoring dan improvement tips</p>
                            <div className="flex justify-center">
                                <div className="flex items-center gap-1">
                                    {[1,2,3,4,5].map((star) => (
                                        <Star key={star} size={16} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Brain size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">AI Interviewer Cerdas</h3>
                            <p className="text-gray-600 mb-4">Berinteraksi dengan AI yang dilatih dari ribuan interview nyata dan dapat beradaptasi dengan jawaban Anda</p>
                            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                AI Powered
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Highly Personalized</h3>
                            <p className="text-gray-600 mb-4">Pertanyaan disesuaikan dengan posisi, industri, dan level pengalaman untuk pengalaman yang relevan</p>
                            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                Custom Made
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Stories & Tips */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Success Stories */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Success Stories</h3>
                                <p className="text-gray-600">Lihat bagaimana AI Interview membantu kandidat lain sukses</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-green-50/80 rounded-xl border border-green-200/50">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">R</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-800 text-sm">Riska - UI/UX Designer</h4>
                                                <div className="flex items-center gap-1">
                                                    {[1,2,3,4,5].map((star) => (
                                                        <Star key={star} size={12} className="text-yellow-400 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600">"Berhasil diterima di Tokopedia setelah latihan 5x dengan AI Interview. Feedback yang diberikan sangat detail!"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200/50">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-800 text-sm">Ahmad - Software Engineer</h4>
                                                <div className="flex items-center gap-1">
                                                    {[1,2,3,4,5].map((star) => (
                                                        <Star key={star} size={12} className="text-yellow-400 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600">"AI Interview membantu saya mempersiapkan technical interview dengan sangat baik. Terima kasih!"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Tips */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Sparkles size={20} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">Pro Tips</h3>
                                </div>
                                <p className="text-gray-600">Strategi terbukti untuk meningkatkan performa interview Anda</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Persiapan Matang</h4>
                                        <p className="text-gray-600 text-sm">Riset perusahaan, posisi, dan siapkan jawaban untuk pertanyaan umum seperti "Tell me about yourself"</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Metode STAR</h4>
                                        <p className="text-gray-600 text-sm">Gunakan struktur Situation, Task, Action, Result untuk menjawab pertanyaan behavioral</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Body Language</h4>
                                        <p className="text-gray-600 text-sm">Jaga kontak mata, postur tubuh tegap, dan gunakan gesture yang natural saat berbicara</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Practice Makes Perfect</h4>
                                        <p className="text-gray-600 text-sm">Latihan rutin dengan AI Interview untuk membangun kepercayaan diri dan kemampuan komunikasi</p>
                                    </div>
                                </div>
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

export default AIInterviewPage;
