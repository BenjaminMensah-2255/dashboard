'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const validEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }

    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    try {
      console.log('Logging in:', { email, password, rememberMe });
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors((prev) => ({ ...prev, email: 'Unknown error occurred during login' }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section: Promotional content */}
      <div className="bg-gradient-to-br from-customBlue to-customBlue text-white lg:w-1/3 flex flex-col justify-center items-center p-8 lg:p-10">
        <div className="max-w-md text-center">
          {/* Logo 
          <img src="/assets/logo.png" alt="Logo" className="h-16 w-16 mb-6 lg:mb-10 mx-auto" />
          */}
          {/* Heading */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 leading-tight">
            Welcome back to XtraPay!
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 opacity-90">
            Sign in to manage your payments and finances with ease and security.
          </p>
          
          {/* Learn More Button */}
          <button className="bg-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 text-base lg:text-lg font-semibold mx-auto">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="bg-white lg:w-2/3 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Sign in to XtraPay</h2>
          <p className="text-gray-600 mb-6 lg:mb-8">Enter your details to access your account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </div>
              <Link href="/forgotpassword" className="text-sm text-customBlue font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-3 rounded-lg hover:bg-faint transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Sign in
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-customBlue font-bold">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}