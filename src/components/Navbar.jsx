import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';   // <-- React Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
    ${isActive
      ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg shadow-pink-500/50'
      : 'text-slate-100 hover:text-white hover:bg-white/20'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/60 border-b border-slate-700/50 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <NavLink
            to="/"
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-200
                       hover:scale-105 transform transition-transform duration-300"
          >
            সৌদিয়া টেইলার্স
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/measurement" className={linkClass}>
              মাপ ও গ্রাহকের তথ্য
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              যোগাযোগ
            </NavLink>
          </div>

          {/* React Icon hamburger/close */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer (Animate.css) */}
      {isOpen && (
        <div
          className="md:hidden bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50
                     animate__animated animate__fadeInDown animate__faster"
        >
          <div className="px-4 py-4 space-y-2">
            <NavLink
              to="/measurement"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg shadow-pink-500/40'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              মাপ ও গ্রাহকের তথ্য
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                ${isActive
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg shadow-pink-500/40'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              যোগাযোগ
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;