'use client';

import { Bell, Search, ChevronDown, User, Settings, CreditCard, HelpCircle, LogOut} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface TopBarProps {
  isProfileDropdownOpen: boolean;
  setIsProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ isProfileDropdownOpen, setIsProfileDropdownOpen }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsProfileDropdownOpen]);

  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: 'My Profile', action: () => console.log('Profile clicked'), color: 'text-blue-500' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', action: () => console.log('Settings clicked'), color: 'text-green-500' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Billing', action: () => console.log('Billing clicked'), color: 'text-purple-500' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Help', action: () => console.log('Help clicked'), color: 'text-yellow-500' },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 font-serif">Good morning, Ebenezer 👋</h1>
        <p className="text-gray-600 font-serif">Here's a summary of your business operations</p>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
        <div className="relative w-full lg:w-64">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0098db] focus:ring-1 focus:ring-[#0098db]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative flex-grow lg:flex-grow-0">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 w-full lg:w-auto justify-between lg:justify-start transition-colors duration-200"
            >
              <div className="flex items-center">
                <img src="/assets/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
                <span className="ml-2 mr-2 text-sm font-medium text-gray-700 lg:hidden">Ebenezer Kwesi</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>

            {isProfileDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Ebenezer Kwesi</p>
                  <p className="text-sm text-gray-500 truncate">kwesi@example.com</p>
                </div>
                
                <div className="py-1">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className={`mr-3 ${item.color} bg-opacity-20 p-2 rounded-full`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 mt-2">
                  <button
                    onClick={() => console.log('Logout clicked')}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <span className="mr-3 text-red-500 bg-red-100 p-2 rounded-full">
                      <LogOut className="w-5 h-5" />
                    </span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;