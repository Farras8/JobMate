// src/components/AuthComp/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Sparkles } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Email dan password tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigasi ditangani oleh onAuthStateChanged di App.tsx
    } catch (err: any) {
      console.error("Firebase login error:", err.code, err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Email atau password salah.');
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: resetEmail } = await Swal.fire({
      title: 'Lupa Kata Sandi?',
      input: 'email',
      inputLabel: 'Masukkan alamat email Anda yang terdaftar',
      inputPlaceholder: 'anda@contoh.com',
      showCancelButton: true,
      confirmButtonText: 'Kirim Link Reset',
      cancelButtonText: 'Batal',
      customClass: { 
        popup: 'rounded-2xl',
        confirmButton: 'bg-blue-900 hover:bg-blue-800 rounded-xl',
        cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Anda perlu memasukkan alamat email!';
        }
      }
    });

    if (resetEmail) {
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        Swal.fire({
          title: 'Terkirim!',
          text: 'Link untuk me-reset kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk (dan folder spam).',
          icon: 'success',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'bg-green-600 hover:bg-green-700 rounded-xl'
          }
        });
      } catch (err: any) {
        console.error("Forgot password error:", err);
        Swal.fire({
          title: 'Gagal!',
          text: err.message || 'Gagal mengirim email reset. Pastikan email yang Anda masukkan benar.',
          icon: 'error',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'bg-red-600 hover:bg-red-700 rounded-xl'
          }
        });
      }
    }
  };

  return (
    <div className="group relative bg-white backdrop-blur-sm border border-gray-100/50 rounded-3xl overflow-hidden p-8 md:p-12 w-full max-w-md shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <Shield size={20} className="text-blue-600" />
      </div>
      
      <div className="absolute top-8 left-4 w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity duration-300">
        <Sparkles size={14} className="text-purple-600" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
            Selamat Datang Kembali!
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Sign in untuk mengakses akunmu
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-full mx-auto mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200/50 text-red-700 px-4 py-3 rounded-2xl relative mb-6 shadow-sm" role="alert">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-xs font-bold">!</span>
              </div>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Mail size={12} className="text-blue-600" />
              </div>
              <span>Alamat Email</span>
            </label>
            <div className="relative group/input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ketik email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 pl-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-blue-200 group-hover/input:bg-blue-50/30"
                disabled={isLoading}
                autoComplete="email"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <Mail size={14} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <Lock size={12} className="text-gray-600" />
                </div>
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-blue-50"
              >
                Lupa Sandi?
              </button>
            </div>
            <div className="relative group/input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Ketik password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 ease-in-out text-sm md:text-base group-hover/input:border-blue-200 group-hover/input:bg-blue-50/30"
                disabled={isLoading}
                autoComplete="current-password"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="group/btn w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">atau</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-6 mb-2">
            Baru di JobMate?
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-blue-50 group/link"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default LoginForm;