import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-100 font-sans">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Frost-glass footer */}
      <footer className="bg-slate-800/50 backdrop-blur-md border-t border-slate-700/50 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-200 px-4">
          <div className="animate__animated animate__fadeInUp animate__delay-1s">
           <p>Developed by: <Link
  to="https://github.com/fahmidurshanto"          // <-- change to actual GitHub URL
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold text-purple-400 hover:text-purple-300 transition"
>
   fahmidurshanto
</Link></p>
            <p>Contact: fahmidurrahamanshanto@gmail.com</p>
          </div>
          <div className="animate__animated animate__fadeInUp animate__delay-2s">
            &copy; {new Date().getFullYear()} সৌদিয়া টেইলার্স. সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;