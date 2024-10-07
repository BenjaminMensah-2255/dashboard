import React from 'react';
import { FiDollarSign, FiArrowDown, FiArrowUp, FiEye, FiBell, FiUser, FiSearch } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

const Dashboard: React.FC = () => {
  const transactions: Transaction[] = [
    { id: '1', name: 'CodeXtra', date: '29 Dec 2021', amount: 320.67, type: 'credit' },
    { id: '2', name: 'Plugnom', date: '29 Dec 2021', amount: 28.00, type: 'credit' },
    { id: '3', name: 'Copaddler', date: '29 Dec 2021', amount: 28.00, type: 'credit' },
    { id: '4', name: 'QwikFit', date: '29 Dec 2021', amount: 28.00, type: 'credit' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Good morning, Ebenezer 👋</h1>
              <p className="text-gray-600">Here's a summary of your business operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                <FiBell />
              </button>
              <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
                <FiUser />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiDollarSign className="text-blue-500 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-500">Account Balance in GHS</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">GHS*****</h2>
              <p className="text-sm text-gray-500 mt-2">Wallet</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FiArrowDown className="text-green-500 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-500">0%</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">GHS0.00</h2>
              <p className="text-sm text-gray-500 mt-2">Received</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FiArrowUp className="text-red-500 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-500">0%</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">GHS0.00</h2>
              <p className="text-sm text-gray-500 mt-2">Payouts</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'credit' ? (
                          <FiArrowDown className="text-green-500" />
                        ) : (
                          <FiArrowUp className="text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.name}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      GHS{transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Receive Money
                </button>
                <button className="w-full bg-white text-blue-500 font-medium py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors">
                  Send Money
                </button>
                <button className="w-full bg-white text-blue-500 font-medium py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors">
                  Bulk Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;