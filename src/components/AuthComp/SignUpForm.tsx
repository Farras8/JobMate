// src/components/AuthComp/SignUpForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { User, Mail, Lock, Phone, MapPin, AtSign, Eye, EyeOff, ArrowRight, Shield, Sparkles, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }

        if (username.length < 3 || /\s/.test(username)) {
            setError("Username minimal harus 3 karakter dan tidak boleh mengandung spasi.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userPersonalInfoRef = doc(userDocRef, "user_personal", "info");

            await setDoc(userPersonalInfoRef, {
                username: username,
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                city: city,
                address: "",
                photoUrl: "",
                github: "",
                instagram: "",
                linkedin: "",
                portfolioSite: "",
                status: "",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            
            setLoading(false);

            Swal.fire({
                title: 'Pendaftaran Berhasil!',
                text: 'Akun Anda telah berhasil dibuat. Apa yang ingin Anda lakukan selanjutnya?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Lengkapi Profil Sekarang',
                cancelButtonText: 'Nanti Saja, ke Dashboard',
                confirmButtonColor: '#1e3a8a',
                cancelButtonColor: '#6B7280',
                reverseButtons: true,
                allowOutsideClick: false,
                customClass: { 
                  popup: 'rounded-2xl',
                  confirmButton: 'rounded-xl',
                  cancelButton: 'rounded-xl'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/profile/edit');
                } else {
                    navigate('/');
                }
            });
            
        } catch (err: any) {
            console.error("Sign up error:", err.code, err.message);
            if (err.code === 'auth/email-already-in-use') {
                setError("Email sudah terdaftar. Silakan gunakan email lain atau login.");
            } else if (err.code === 'auth/weak-password') {
                setError("Kata sandi terlalu lemah. Gunakan minimal 6 karakter.");
            } else {
                setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="group relative bg-white backdrop-blur-sm border border-gray-100/50 rounded-3xl overflow-hidden p-6 md:p-8 lg:p-10 w-full max-w-lg mx-auto shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 my-4 md:my-8">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <UserPlus size={20} className="text-blue-600" />
            </div>
            
            <div className="absolute top-8 left-4 w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                <Sparkles size={14} className="text-purple-600" />
            </div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                        Buat Akun Baru
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Mulai perjalanan karir Anda bersama JobMate!
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-full mx-auto mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200/50 text-red-700 px-4 py-3 rounded-2xl relative mb-4 shadow-sm" role="alert">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-red-600 text-xs font-bold">!</span>
                            </div>
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="fullname" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                <User size={12} className="text-blue-600" />
                            </div>
                            <span>Nama Lengkap</span>
                        </label>
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ketik Nama Lengkap"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-blue-200 group-hover/input:bg-blue-50/30"
                                autoComplete="name"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <User size={14} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Username Field */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                                <AtSign size={12} className="text-purple-600" />
                            </div>
                            <span>Username</span>
                        </label>
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Min. 3 karakter, tanpa spasi"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-purple-300 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-purple-200 group-hover/input:bg-purple-50/30"
                                autoComplete="username"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <AtSign size={14} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                <Mail size={12} className="text-green-600" />
                            </div>
                            <span>Alamat Email</span>
                        </label>
                        <div className="relative group/input">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ketik Alamat Email"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-green-300 focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-green-200 group-hover/input:bg-green-50/30"
                                autoComplete="email"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <Mail size={14} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Phone and City Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="phone" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                    <Phone size={12} className="text-orange-600" />
                                </div>
                                <span>Nomor Telepon</span>
                            </label>
                            <div className="relative group/input">
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Nomor aktif"
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-orange-200 group-hover/input:bg-orange-50/30"
                                    autoComplete="tel"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                    <Phone size={14} className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="city" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                                <div className="w-6 h-6 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                                    <MapPin size={12} className="text-teal-600" />
                                </div>
                                <span>Kota</span>
                            </label>
                            <div className="relative group/input">
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Contoh: Jakarta"
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-teal-300 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-teal-200 group-hover/input:bg-teal-50/30"
                                    autoComplete="address-level2"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                    <MapPin size={14} className="text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                                <Lock size={12} className="text-red-600" />
                            </div>
                            <span>Password</span>
                        </label>
                        <div className="relative group/input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 6 karakter"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-red-300 focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-red-200 group-hover/input:bg-red-50/30"
                                minLength={6}
                                autoComplete="new-password"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <Lock size={14} className="text-gray-500" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? (
                                    <EyeOff size={16} className="text-gray-600" />
                                ) : (
                                    <Eye size={16} className="text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                            <div className="w-6 h-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                                <Lock size={12} className="text-pink-600" />
                            </div>
                            <span>Konfirmasi Password</span>
                        </label>
                        <div className="relative group/input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ulangi password"
                                required
                                disabled={loading}
                                className="w-full px-4 py-3 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-pink-200 group-hover/input:bg-pink-50/30"
                                minLength={6}
                                autoComplete="new-password"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <Lock size={14} className="text-gray-500" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                                aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={16} className="text-gray-600" />
                                ) : (
                                    <Eye size={16} className="text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group/btn w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105 mt-6"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Mendaftarkan...</span>
                            </>
                        ) : (
                            <>
                                <span>Daftar Sekarang</span>
                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 font-medium">atau</span>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-4 mb-2">
                        Sudah Punya Akun?
                    </p>
                    <Link 
                        to="/login" 
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-blue-50 group/link"
                    >
                        <span>Masuk</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
    );
};

export default SignUpForm;