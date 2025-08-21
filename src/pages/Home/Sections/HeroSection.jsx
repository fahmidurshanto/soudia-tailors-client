// HeroSection.jsx
import { FaClipboardList } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 p-4 bg-purple-100 rounded-full">
            <FaClipboardList className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6">
            বোরখা অর্ডার ব্যবস্থাপনা সিস্টেম
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
            দোকানদারদের জন্য বিশেষভাবে তৈরি অর্ডার ব্যবস্থাপনা সিস্টেম। 
            এখন সহজেই নিতে পারেন কাস্টমারদের অর্ডার, মাপ এবং ডিজাইন রেফারেন্স।
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
              নতুন অর্ডার তৈরি করুন
            </button>
            <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-8 rounded-full transition duration-300">
              ডেমো দেখুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;