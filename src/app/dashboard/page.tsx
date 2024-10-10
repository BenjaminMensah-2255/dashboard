'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff } from 'lucide-react';

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const years = ['2024', '2023', '2022', '2021', '2020'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recentActivities = [
    { name: 'CodeXtra', date: '29 Dec 2021', amount: 320.67, type: 'received' },
    { name: 'Plugnom', date: '29 Dec 2021', amount: 28.00, type: 'received' },
    { name: 'Copaddler', date: '29 Dec 2021', amount: 28.00, type: 'received' },
    { name: 'QwikFit', date: '29 Dec 2021', amount: 28.00, type: 'received' },
  ];

  const cards = [
    {
      title: 'Wallet',
      subtitle: 'Account Balance in GHS',
      amount: isBalanceVisible ? 'GHS 1,234.56' : 'GHS***',
      icon: '/assets/wallet.png',
      iconBg: 'bg-blue-50',
      showEye: true,
      showFlag: true,
    },
    {
      title: 'Received',
      subtitle: '0%',
      amount: 'GHS0.00',
      icon: <ArrowDownRight className="w-6 h-6 text-emerald-500" />,
      iconBg: 'bg-emerald-50',
    },
    {
      title: 'Payouts',
      subtitle: '0%',
      amount: 'GHS0.00',
      icon: <ArrowUpRight className="w-6 h-6 text-rose-500" />,
      iconBg: 'bg-rose-50',
    },
  ];

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <TopBar 
          isProfileDropdownOpen={isProfileDropdownOpen} 
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        />

        {/* Alert Banner */}
        <div className="bg-[#0098db]/10 text-[#0098db] p-4 rounded-lg mb-8 flex justify-between items-center font-serif">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#0098db]/20 rounded-lg flex items-center justify-center mr-3">
              <Image src="/assets/money.png" alt="KYC" width={20} height={20} />
            </div>
            <span>Transactions on this account require completed KYC -</span>
            <a href="#" className="text-[#0098db] font-semibold ml-2">Complete KYC Now.</a>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                  {typeof card.icon === 'string' ? (
                    <Image src={card.icon} alt={card.title} width={24} height={24} />
                  ) : (
                    card.icon
                  )}
                </div>
                {card.showEye && (
                  <button 
                    className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={toggleBalanceVisibility}
                  >
                    {isBalanceVisible ? (
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-700 font-serif">{card.title}</h2>
                <p className="text-sm text-gray-500">{card.subtitle}</p>
                <div className="flex items-center pt-2">
                  <span className="text-2xl font-bold text-gray-900">{card.amount}</span>
                  {card.showFlag && (
                    <Image src="/assets/flag.png" alt="GH flag" width={24} height={24} className="ml-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 font-serif">
          <button className="flex-1 bg-[#0098db] text-white py-3 rounded-lg hover:bg-[#0087c4] transition-colors font-semibold shadow-sm">
            Receive Money
          </button>
          <button className="flex-1 bg-[#0098db] text-white py-3 rounded-lg hover:bg-[#0087c4] transition-colors font-semibold shadow-sm">
            Send Money
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
            Bulk Payment
          </button>
        </div>

        {/* Recent Activities section */}
        <div>
          <div className="flex justify-between items-center mb-4 font-serif">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-600 mr-2">{selectedYear}</span>
                <ArrowDownRight className="w-5 h-5 text-gray-600" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm font-serif">
            <table className="w-full">
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index} className={index > 0 ? "border-t border-gray-200" : ""}>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Image src="/assets/office-building.png" alt={activity.name} width={24} height={24} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{activity.name}</div>
                          <div className="text-gray-600 text-sm">{activity.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-semibold text-gray-900">GHS{activity.amount.toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}