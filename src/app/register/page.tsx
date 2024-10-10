'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Image from 'next/image';

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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Promotional content */}
      <div className="bg-gradient-to-br from-customBlue to-customBlue text-white w-full md:w-1/3 flex flex-col justify-center items-center p-6 md:p-10">
        <div className="max-w-md text-center">
          {/* Logo 
          <Image 
            src="/assets/logo.png" 
            alt="Logo" 
            width={64}
            height={64}
            className="mb-6 md:mb-10 mx-auto" 
          />
          */}
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 leading-tight">
            Join XtraPay Today!
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed mb-6 md:mb-10 opacity-90">
            Get started with an easy registration process and unlock powerful payment management tools for your business.
          </p>
          
          {/* Learn More Button */}
          <button className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 text-base md:text-lg font-semibold mx-auto">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section: Registration Form */}
      <div className="bg-white w-full md:w-2/3 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600 mb-6 md:mb-8">Enter your details to get started</p>

          <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
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
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
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
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
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
                  className="w-full pl-10 pr-12 py-2 md:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
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
              By creating an account, you agree to XtraPay&apos;s{' '}
              <Link href="/terms" className="text-customBlue hover:text-indigo-500 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-customBlue hover:text-indigo-500 font-medium">
                Privacy Policy
              </Link>
              .
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 md:py-3 rounded-lg hover:bg-faint transition-all duration-300 font-semibold text-base md:text-lg shadow-md hover:shadow-lg"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-customBlue font-bold">
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