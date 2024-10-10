'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validEmail(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    try {
      await sendForgotPasswordEmail(email);
      alert('Password reset link sent to your email!');
      router.push('/');
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrors({ email: 'Unknown error occurred, please try again.' });
    }
  };

  const validEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendForgotPasswordEmail = (email: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com') {
          resolve();
        } else {
          reject('Email not found');
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Promotional content */}
      <div className="bg-gradient-to-br from-customBlue to-customBlue text-white w-full md:w-1/3 flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-center">Win clients and scale sites fast with XtraPay</h1>
        <p className="mb-4 md:mb-6 text-lg md:text-xl"> </p>
        <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-blue-700 text-lg md:text-base font-bold">
          Get Started
        </button>
      </div>

      {/* Right Section: Forgot Password Form */}
      <div className="bg-white w-full md:w-2/3 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">Forgot Password?</h2>

          <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6 font-serif">
            Enter the email address you used when you joined and we&apos;ll send you instructions to reset your password.
          </p>
          
          <p className="text-gray-500 text-sm md:text-base mb-4 md:mb-6 font-serif">
            For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4 md:space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-bold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full px-3 py-2 md:px-4 md:py-3 text-base md:text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="name@example.com"
                required
              />
              {errors.email && <span className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 md:py-3 text-base md:text-lg rounded-lg shadow-lg hover:bg-faint transition-all duration-300 font-semibold"
            >
              Send Reset
            </button>

            {/* Link to login if user remembers password */}
            <div className="text-center mt-4">
              <p className="text-gray-700 text-sm md:text-base">
                Remember password?{' '}
                <Link href="/login" className="text-customBlue hover:underline font-bold">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;