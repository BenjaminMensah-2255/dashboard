'use client'; // Required for client-side rendering in Next.js

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation after password reset
import Link from 'next/link'; // For client-side navigation

const ForgotPasswordPage = () => {
  // State variables for email input and error messages
  const [email, setEmail] = useState(''); // User's email

  const [errors, setErrors] = useState<{ email?: string }>({}); // Error messages for email validation

  const router = useRouter(); // Hook for programmatic navigation

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrors({}); // Clear previous error messages

    // Validate email format
    if (!validEmail(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    try {
      // Simulate sending the forgot password email (To be replace with real API call)
      await sendForgotPasswordEmail(email);
      alert('Password reset link sent to your email!'); // Notify user

      // Navigate to the login page after sending email
      router.push('/');
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrors({ email: 'Unknown error occurred, please try again.' }); // Set error state if sending fails
    }
  };

  const validEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/; // Regular expression for basic email validation
    return re.test(email);
  };

  const sendForgotPasswordEmail = (email: string) => {
    return new Promise<void>((resolve, reject) => {

      // Simulating an API call (to be replaced with actual API logic)
      setTimeout(() => {
        if (email === 'test@example.com') {
          resolve(); // Success case
        } else {
          reject('Email not found'); // Failure case
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Promotional content */}
      <div className="bg-gradient-to-br from-customBlue to-indigo-800 text-white w-1/3 flex flex-col justify-center items-center p-10">

        <img src="/assets/logo.png" alt="Logo" className="h-12 w-12 mb-6" />

        <h1 className="text-4xl font-extrabold mb-4 text-center">Win clients and scale sites fast with XtraPay</h1>

        <p className="mb-6 text-xl">Get started - it's free</p>
        
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>

      {/* Right Section: Forgot Password Form */}
      <div className="bg-white w-2/3 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-6">Forgot Password?</h2>
          <p className="text-gray-600 text-lg mb-6 font-serif">
            Enter the email address you used when you joined and we'll send you instructions to reset your password.
          </p>
          <p className="text-gray-500 text-base mb-6 font-serif">
            For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            {/* Email Input */}
            <div>

              <label htmlFor="email" className="block text-base font-bold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                placeholder="name@example.com"
                required // Ensure email field is required
              />

              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-3 text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 font-semibold"
            >
              Send Reset
            </button>

            {/* Link to login if user remembers password */}
            <div className="text-center mt-4">

              <p className="text-gray-700 text-base">
                Remember password?{' '}
                <Link href="/auth/Login" className="text-indigo-500 hover:underline font-bold">Login</Link>
              </p>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; // Exporting the component for use in other parts of the application
