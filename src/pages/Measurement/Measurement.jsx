import React from 'react';
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const Measurement = () => {
  const measurements = [
    "কাঁধ থেকে গোড়ালি পর্যন্ত",
    "ঘাড় থেকে গোড়ালি পর্যন্ত",
    "মাথার পরিধি",
    "সামনে থেকে পিছনে",
    "কান থেকে কান পর্যন্ত",
    "মুখের প্রস্থ",
    "বুকের পরিধি",
    "কোমরের পরিধি",
    "নিতম্বের পরিধি",
    "কাঁধের প্রস্থ",
    "হাতার দৈর্ঘ্য",
    "বাহুর পরিধি",
    "কব্জির পরিধি",
    "ঘাড়ের গর্ত",
    "হাতার গর্তের গভীরতা"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg">
      {/* Payment Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">পেমেন্ট বিবরণ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-indigo-700 font-medium mb-1">মোট টাকা</label>
            <input 
              type="number" 
              className="w-full py-3 px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="০"
            />
          </div>
          <div>
            <label className="block text-indigo-700 font-medium mb-1">অগ্রিম টাকা</label>
            <input 
              type="number" 
              className="w-full py-3 px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="০"
            />
          </div>
          <div>
            <label className="block text-indigo-700 font-medium mb-1">অবশিষ্ট টাকা</label>
            <input 
              type="number" 
              className="w-full py-3 px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="০"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Measurements Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-indigo-800">দৈর্ঘ্য মাপ</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">একক:</span>
              <select className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-lg border border-indigo-200 focus:outline-none">
                <option>সেন্টিমিটার</option>
                <option>ইঞ্চি</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {measurements.map((measurement, index) => (
              <div key={index} className="group">
                <label className="block text-indigo-700 font-medium mb-1 group-hover:text-indigo-900 transition-colors">
                  {measurement}
                </label>
                <input 
                  type="text"
                  className="w-full py-2.5 px-4 bg-white text-gray-800 rounded-lg border border-indigo-100 focus:ring-2 focus:ring-indigo-300 focus:border-transparent focus:outline-none transition-all shadow-sm group-hover:shadow-md"
                  placeholder={`${measurement} লিখুন`}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button className="py-2.5 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md">
              সেভ করুন
            </button>
            <button className="py-2.5 px-6 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none">
              রিসেট করুন
            </button>
          </div>
        </div>

        {/* Tldraw Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-indigo-800">ডিজাইন স্কেচ</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">টুলস:</span>
              <button className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-lg border border-indigo-200">
                ক্লিয়ার
              </button>
            </div>
          </div>
          
          <div className="tldraw__container h-[500px] border border-indigo-200 rounded-lg overflow-hidden shadow-md">
            <Tldraw 
              persistenceKey="measurement-sketch"
              showMenu={false}
              showPages={false}
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            বোরখার ডিজাইন স্কেচ তৈরি করুন। প্রয়োজনীয় নোটস যোগ করতে ড্রয়িং টুলস ব্যবহার করুন
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;