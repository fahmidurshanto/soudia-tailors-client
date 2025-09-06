import { Link } from 'react-router-dom';
import 'animate.css';

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 rounded-xl shadow-lg animate__animated animate__fadeInDown">
        <div className="px-4 py-3">
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 animate__animated animate__fadeIn animate__delay-1s"
            >
              Home
            </Link>
            <Link 
              to="/order" 
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 animate__animated animate__fadeIn animate__delay-2s"
            >
              Order
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 animate__animated animate__fadeIn animate__delay-3s"
            >
              Contact
            </Link>
            <Link 
              to="/admin/login" 
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 animate__animated animate__fadeIn animate__delay-4s"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;