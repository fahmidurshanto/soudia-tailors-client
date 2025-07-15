import React from 'react';
import { FiUser, FiPhone, FiClipboard, FiDollarSign, FiCheckCircle, FiClock } from 'react-icons/fi';

// Mock data for orders - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'রহিম শেখ',
      phone: '01700-000001',
    },
    measurements: {
      chest: '৪২"',
      waist: '৩৪"',
      sleeve: '২৫"',
      pants: '৪০"',
    },
    pricing: {
      total: 1800,
      paid: 800,
      due: 1000,
    },
    status: 'In Progress',
    orderDate: '2025-07-15',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'করিম চৌধুরী',
      phone: '01800-000002',
    },
    measurements: {
      chest: '৪৪"',
      waist: '৩৬"',
      sleeve: '২৬"',
      pants: '৪১"',
    },
    pricing: {
      total: 2200,
      paid: 2200,
      due: 0,
    },
    status: 'Completed',
    orderDate: '2025-07-12',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'আব্দুল বাতেন',
      phone: '01900-000003',
    },
    measurements: {
      chest: '৪০"',
      waist: '৩২"',
      sleeve: '২৪"',
      pants: '৩৯"',
    },
    pricing: {
      total: 1500,
      paid: 500,
      due: 1000,
    },
    status: 'In Progress',
    orderDate: '2025-07-16',
  },
];

const StatusBadge = ({ status }) => {
  const isCompleted = status === 'Completed';
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold
      ${isCompleted
        ? 'bg-green-500/20 text-green-300'
        : 'bg-yellow-500/20 text-yellow-300'
      }`}
    >
      {isCompleted ? <FiCheckCircle /> : <FiClock />}
      <span>{isCompleted ? 'সম্পন্ন' : 'চলমান'}</span>
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl p-6 space-y-5 border border-slate-700/50 animate__animated animate__fadeInUp">
      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-xl text-purple-300">{order.id}</p>
          <p className="text-sm text-slate-400">{order.orderDate}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer Details */}
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-lg font-bold text-slate-200 mb-3">গ্রাহকের তথ্য</h3>
        <div className="space-y-2 text-slate-300">
          <p className="flex items-center gap-3"><FiUser className="text-cyan-400" /> {order.customer.name}</p>
          <p className="flex items-center gap-3"><FiPhone className="text-cyan-400" /> {order.customer.phone}</p>
        </div>
      </div>

      {/* Measurements */}
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-lg font-bold text-slate-200 mb-3">মাপের বিবরণ</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-300">
          <p><span className="font-semibold text-slate-400">বুক:</span> {order.measurements.chest}</p>
          <p><span className="font-semibold text-slate-400">কোমর:</span> {order.measurements.waist}</p>
          <p><span className="font-semibold text-slate-400">হাতা:</span> {order.measurements.sleeve}</p>
          <p><span className="font-semibold text-slate-400">প্যান্ট:</span> {order.measurements.pants}</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-lg font-bold text-slate-200 mb-3">মূল্য নির্ধারণ</h3>
        <div className="flex justify-between items-center text-slate-300">
          <div className="text-center">
            <p className="text-xs text-slate-400">মোট</p>
            <p className="font-bold text-xl text-green-400">৳{order.pricing.total}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400">জমা</p>
            <p className="font-bold text-xl text-cyan-400">৳{order.pricing.paid}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400">বাকি</p>
            <p className="font-bold text-xl text-red-400">৳{order.pricing.due}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-transform">
          সম্পাদনা
        </button>
        <button className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold py-2.5 rounded-lg shadow-lg hover:scale-105 transition-transform">
          প্রিন্ট
        </button>
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 text-center animate__animated animate__fadeInDown">
          অর্ডার সমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
