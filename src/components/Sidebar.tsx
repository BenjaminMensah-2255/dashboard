'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FaSearch, FaBell, FaUserCircle, FaExchangeAlt, FaUsers, FaCog, FaTools, 
  FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaHome, FaWallet, 
  FaMobileAlt, FaMoneyBillWave 
} from 'react-icons/fa';

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
      <div className="lg:hidden p-4 bg-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <span className="ml-2 font-bold text-lg">XtraPay</span>
        </div>
        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`
          lg:flex flex-col h-screen 
          ${isContentVisible ? 'w-64' : 'w-20'} 
          bg-gray-100 fixed lg:relative top-0 left-0 
          transition-all duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r-4 border-black-500
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {isContentVisible && (
            <>
              <span className="ml-2 font-bold text-xl">XtraPay</span>
            </>
          )}
          <button onClick={toggleContent} className="text-gray-700 focus:outline-none">
            {isContentVisible ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={closeSidebar}>
                  <span className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded cursor-pointer">
                    <span className="mr-3">{item.icon}</span>
                    {isContentVisible && item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isContentVisible && (
          <div className="flex items-center justify-center p-6 border-t border-gray-200">
            <Link href="/profile" onClick={closeSidebar}>
              <FaUserCircle className="text-gray-500 text-3xl cursor-pointer hover:text-gray-700" />
            </Link>
            <div className="ml-3">
              <p className="font-bold">Ebenezer</p>
              <Link href="/profile" onClick={closeSidebar}>
                <span className="text-sm text-gray-500 hover:underline cursor-pointer">View Profile</span>
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