'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const validEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!name) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
      return;
    }

    if (!validEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }

    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors((prev) => ({ ...prev, email: 'Unknown error occurred during registration' }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Promotional content */}
              <div className="bg-gradient-to-br from-customBlue to-indigo-800 text-white w-1/3 flex flex-col justify-center items-center p-10">
          <div className="max-w-md text-center">
            {/* Logo */}
            <img src="/assets/logo.png" alt="Logo" className="h-16 w-16 mb-10 mx-auto" />
            
            {/* Heading */}
            <h1 className="text-4xl font-extrabold mb-8 leading-tight">
              Join XtraPay Today!
            </h1>
            
            {/* Description */}
            <p className="text-xl leading-relaxed mb-10 opacity-90">
              Get started with an easy registration process and unlock powerful payment management tools for your business.
            </p>
            
            {/* Learn More Button */}
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 text-lg font-semibold mx-auto">
              Learn More
            </button>
          </div>
        </div>


      {/* Right Section: Registration Form */}
      <div className="bg-white w-2/3 flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">Enter your details to get started</p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
                  placeholder="Create a password"
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

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-600">
              By creating an account, you agree to XtraPay's{' '}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Privacy Policy
              </Link>
              .
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-bold">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;