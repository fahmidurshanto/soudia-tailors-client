import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg bg-violet-300/30 border border-pink-200/30 rounded-t-2xl shadow-xl mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-violet-900">সৌদিয়া টেইলর্স</h3>
            <p className="text-violet-800">
              আপনার পছন্দ অনুযায়ী কাপড়ের নকশা এবং মেপ করে সেলাই করে দেওয়া হয়।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-violet-900">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-violet-800 hover:text-violet-600 transition-colors duration-300">
                  হোম
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-violet-800 hover:text-violet-600 transition-colors duration-300">
                  অর্ডার
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-violet-800 hover:text-violet-600 transition-colors duration-300">
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-violet-800 hover:text-violet-600 transition-colors duration-300">
                  অ্যাডমিন
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-violet-900">ডেভেলপার তথ্য</h4>
            <p className="text-violet-800">
              এই অ্যাপ্লিকেশনটি তৈরি করেছেন: <span className="text-violet-900 font-bold"><Link to='https://fahmidurshanto.vercel.app' target='_blank'>Fahmidur Rahaman Shanto</Link></span>
            </p>
            <p className="text-violet-800 mt-2">
              যদি আপনার কোন প্রশ্ন বা সমস্যা থাকে, অনুগ্রহ করে যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-pink-200/30 mt-8 pt-6 text-center text-violet-800">
          <p>&copy; {new Date().getFullYear()} সৌদিয়া টেইলর্স। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;