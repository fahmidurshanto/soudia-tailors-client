import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold italic tracking-wider bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent select-none">সৌদিয়া টেইলার্স</h2>
                    </div>
                    {/* Hamburger menu for mobile */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <ul className="flex space-x-6 lg:space-x-8">
                            <li>
                                <Link to="/" className="text-base lg:text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">হোম</Link>
                            </li>
                            <li>
                                <Link to="/measurement" className="text-base lg:text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">মাপ</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-base lg:text-lg text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">যোগাযোগ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <ul className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
                        <li>
                            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition-colors duration-200">হোম</Link>
                        </li>
                        <li>
                            <Link to="/measurement" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition-colors duration-200">মাপ</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition-colors duration-200">যোগাযোগ</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;