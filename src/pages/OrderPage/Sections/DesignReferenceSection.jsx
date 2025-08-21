import React from 'react';
import { FaCamera, FaUpload } from 'react-icons/fa';

const DesignReferenceSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">ডিজাইন রেফারেন্স</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCamera className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">ক্যামেরা থেকে ছবি তুলুন</h3>
          <p className="text-gray-600 mb-4">সরাসরি ক্যামেরা ব্যবহার করে ডিজাইনের ছবি তুলুন</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">ক্যামেরা খুলুন</button>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUpload className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">ফাইল আপলোড করুন</h3>
          <p className="text-gray-600 mb-4">আপনার ডিভাইস থেকে ছবি বা ডিজাইন ফাইল আপলোড করুন</p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">ফাইল নির্বাচন করুন</button>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">আপলোড করা ফাইলসমূহ</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-gray-500 text-center">কোন ফাইল আপলোড করা হয়নি</p>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">ডিজাইন সম্পর্কে নির্দেশিকা</h3>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="3"
          placeholder="ডিজাইন সম্পর্কে যেকোনো বিশেষ নির্দেশিকা লিখুন"
        ></textarea>
      </div>
    </div>
  );
};

export default DesignReferenceSection;