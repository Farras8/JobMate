import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Handshake, Building2, Sparkles, Zap, Target, CheckCircle, Users, Globe, Award, TrendingUp } from 'lucide-react';
import FloatingChatbot from '../components/FloatingChatbot';

const KerjasamaPage: React.FC = () => {
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
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200/50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Handshake size={14} className="text-orange-600" />
                        <span>Partnership Program</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-900 to-amber-900 bg-clip-text text-transparent leading-tight mb-6">
                        Program Kerjasama
                    </h1>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Sparkles size={14} className="text-green-600" />
                        <span>Mutual Benefits!</span>
                    </div>

                    <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                        Bergabunglah dengan program kerjasama kami untuk menciptakan ekosistem karir yang lebih baik. 
                        Kami mengundang universitas, perusahaan, dan institusi pendidikan untuk bermitra dalam mengembangkan talenta terbaik.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-gray-200/50">
                            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                                <Handshake size={48} className="text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Grow Together</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                Join our partnership program and create a better career ecosystem together. 
                                We invite universities, companies, and educational institutions to collaborate.
                            </p>
                            <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Start Partnership
                            </button>
                        </div>
                    </div>

                    {/* Partnership Types */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center group">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Building2 size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Corporate</h3>
                            <p className="text-gray-600 mb-4">Talent acquisition and recruitment partnership</p>
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                150+ Partners
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center group">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Award size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Academic</h3>
                            <p className="text-gray-600 mb-4">Universities and educational institutions</p>
                            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                25+ Universities
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center group">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Globe size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Technology</h3>
                            <p className="text-gray-600 mb-4">API integration and platform partnership</p>
                            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                Tech Solutions
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center group">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                                <Users size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                            <p className="text-gray-600 mb-4">Events and workshop collaboration</p>
                            <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                Growing Network
                            </div>
                        </div>
                    </div>

                    {/* Partnership Form & Benefits */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Contact Form */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-200/50">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Let's Partner Up</h3>
                                <p className="text-gray-600">Fill out this form and our partnership team will get back to you within 24 hours.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            id="first-name"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            id="last-name"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">Company/Institution</label>
                                    <input
                                        id="company-name"
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Tech Solutions Inc."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="john@techsolutions.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="partnership-type" className="block text-sm font-medium text-gray-700 mb-2">Partnership Interest</label>
                                    <select id="partnership-type" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                                        <option>Corporate Partnership</option>
                                        <option>Academic Partnership</option>
                                        <option>Technology Partnership</option>
                                        <option>Community Partnership</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Tell us about your partnership goals..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Submit Partnership Request
                                </button>
                            </form>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Partnership Benefits</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Target size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">Access to Quality Talent</h4>
                                            <p className="text-gray-600">Connect with pre-screened candidates that match your specific requirements and company culture.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <TrendingUp size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">Brand Visibility</h4>
                                            <p className="text-gray-600">Increase your brand exposure among job seekers and potential candidates in your industry.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">Custom Solutions</h4>
                                            <p className="text-gray-600">Tailored recruitment solutions designed to meet your specific business needs and objectives.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Award size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">Dedicated Support</h4>
                                            <p className="text-gray-600">Get personalized support from our partnership team to ensure successful collaboration.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Success Metrics */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
                                <h4 className="text-xl font-bold text-gray-800 mb-6">Partnership Success</h4>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-600 mb-1">10K+</div>
                                        <div className="text-sm text-gray-500">Successful Placements</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
                                        <div className="text-sm text-gray-500">Partner Satisfaction</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-emerald-600 mb-1">175+</div>
                                        <div className="text-sm text-gray-500">Active Partners</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                                        <div className="text-sm text-gray-500">Industries Served</div>
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

export default KerjasamaPage;
