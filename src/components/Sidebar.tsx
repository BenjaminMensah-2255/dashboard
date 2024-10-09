'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
   FaExchangeAlt, FaUsers, FaCog, FaTools,
  FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaHome, FaWallet,
  FaMobileAlt, FaMoneyBillWave
} from 'react-icons/fa';

import {ChevronDown} from 'lucide-react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { href: '/dashboard', icon: <FaHome />, label: 'Overview' },
    { href: '/wallets', icon: <FaWallet />, label: 'Wallets' },
    { href: '/scan-to-pay', icon: <FaMobileAlt />, label: 'Scan to Pay' },
    { href: '/services', icon: <FaTools />, label: 'Services' },
    { href: '/payouts', icon: <FaMoneyBillWave />, label: 'Payouts' },
    { href: '/transactions', icon: <FaExchangeAlt />, label: 'Transactions' },
    { href: '/customers', icon: <FaUsers />, label: 'Customers' },
    { href: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <>
      <div className="lg:hidden p-4 bg-[#0C1540] text-white flex justify-between items-center font-serif">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded">
            <Image src="/assets/logo2.png" alt="XtraPay Logo" width={120} height={40} />
          </div>
        </div>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`
          lg:flex flex-col h-screen 
          ${isContentVisible ? 'w-64' : 'w-20'}
          bg-[#0C1540] text-white fixed lg:relative top-0 left-0
          transition-all duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-gray-700
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          {isContentVisible && (
            <div className="bg-white p-1 rounded">
              <Image src="/assets/logo2.png" alt="XtraPay Logo" width={120} height={40} />
            </div>
          )}
          <button onClick={toggleContent} className="text-white focus:outline-none">
            {isContentVisible ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="flex-1 p-4 font-serif">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={closeSidebar}>
                  <span className="flex items-center text-white hover:bg-[#1A2A5E] p-2 rounded cursor-pointer">
                    <span className="mr-3">{item.icon}</span>
                    {isContentVisible && item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isContentVisible && (
          <div className="flex items-center justify-center p-6 border-t border-gray-700">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <img src="/assets/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
              <ChevronDown className="w-5 h-5 text-gray-600 ml-2" />
            </div>
            <div className="ml-3">
              <p className="font-bold">Ebenezer</p>
              <Link href="/profile" onClick={closeSidebar}>
                <span className="text-sm text-gray-300 hover:underline cursor-pointer">View Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}