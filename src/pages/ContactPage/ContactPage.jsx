import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-2">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-center text-gray-600 mb-8">
          যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করতে পারেন
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">দোকানের তথ্য</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ঠিকানা</h3>
                    <p className="text-gray-600">সৌদিয়া লেডিস টেইলার্স</p>
                    <p className="text-gray-600">নিউ মার্কেট, জয়পুরহাট সদর</p>
                    <p className="text-gray-600">জয়পুরহাট ৫৯০০</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaPhone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ফোন নম্বর</h3>
                    <p className="text-gray-600">+৮৮ ০১৭১২৩৪৫৬৭৮</p>
                    <p className="text-gray-600">+৮৮ ০১৯৮৭৬৫৪৩২১</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ইমেইল</h3>
                    <p className="text-gray-600">info@borkhabd.com</p>
                    <p className="text-gray-600">orders@borkhabd.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaClock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">খোলার সময়</h3>
                    <p className="text-gray-600">শনিবার - বৃহস্পতিবার: সকাল ১০টা - রাত ৯টা</p>
                    <p className="text-gray-600">শুক্রবার: বন্ধ</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-4">সোশ্যাল মিডিয়া</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition">
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-pink-100 text-pink-600 p-3 rounded-full hover:bg-pink-200 transition">
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-200 transition">
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">বার্তা পাঠান</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">আপনার নাম</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">ইমেইল</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার ইমেইল লিখুন"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">ফোন নম্বর</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার ফোন নম্বর লিখুন"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">বার্তা</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows="5"
                    placeholder="আপনার বার্তা লিখুন..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  বার্তা পাঠান
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">আমাদের অবস্থান</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">এখানে গুগল ম্যাপ দেখানো হবে</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">
                  ম্যাপে দেখুন
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">সচরাচর জিজ্ঞাসিত প্রশ্ন!</h2>
            
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">অর্ডার করতে কতদিন সময় লাগে?</h3>
                <p className="text-gray-600 mt-2">সাধারণত অর্ডার নেওয়ার পর ৭-১০ কর্মদিবসের মধ্যে ডেলিভারি করা হয়। জরুরি অর্ডারের জন্য আলাদাভাবে জানাতে পারেন।</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">মাপ ভুল হলে কি করা যাবে?</h3>
                <p className="text-gray-600 mt-2">মাপ ভুল হলে ২৪ ঘন্টার মধ্যে আমাদের জানালে আমরা পুনরায় মাপ নেওয়ার ব্যবস্থা করব। ডেলিভারির পর পরিবর্তনের সুযোগ থাকবে না।</p>
              </div>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;