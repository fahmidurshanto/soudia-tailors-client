// HeroSection.jsx
import { FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 p-4 bg-purple-100 rounded-full">
            <FaClipboardList className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6">
            সৌদিয়া লেডিস টেইলার্স
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">অর্ডার ব্যবস্থাপনা সিস্টেম</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/order" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
              নতুন অর্ডার তৈরি করুন
            </Link>
       
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;