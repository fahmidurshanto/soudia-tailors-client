import React from 'react';
import { FaHandPointRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-violet-100 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg 
            className="w-24 h-24 mx-auto text-violet-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-violet-900 mb-2">ওহো! কিছু ভুল হয়েছে</h1>
        <p className="text-violet-700 mb-6">
          দুঃখিত, আমরা যে পেজটি খুঁজছিলাম তা খুঁজে পাচ্ছি না বা একটি ত্রুটি ঘটেছে।
        </p>
        
        <div className="bg-white/50 backdrop-blur-sm border border-pink-200/30 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-violet-800 mb-2">সম্ভাব্য সমাধান:</h2>
          <ul className="text-violet-700 text-left space-y-2">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              <span>পেজটির URL সঠিক কিনা তা পরীক্ষা করুন</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              <span>আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              <span>পৃষ্ঠাটি সাময়িকভাবে উপলব্ধ নাও হতে পারে</span>
            </li>
          </ul>
        </div>
        
        <Link 
          to="/" 
          className="inline-block bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          হোমপেজে ফিরে যান
        </Link>
        
          <p className='text-violet-600 mt-4'>যদি সমস্যাটি অব্যাহত থাকে, অনুগ্রহ করে ডেভেলপার টিমের সাথে যোগাযোগ করুন </p>
        <div className="mt-8 text-violet-600 justify-center flex items-center gap-5">
          <FaHandPointRight className='text-3xl' /> <Link to="https://fahmidurshanto.vercel.app">fahmidurshanto</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;