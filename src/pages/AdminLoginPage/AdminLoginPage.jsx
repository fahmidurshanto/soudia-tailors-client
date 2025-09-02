import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { signInUser, clearError } from '../../features/auth/authSlice';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  
  // Get the page user was trying to access
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear Firebase error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'ইমেইল ঠিকানা প্রয়োজন';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }
    
    if (!formData.password) {
      errors.password = 'পাসওয়ার্ড প্রয়োজন';
    } else if (formData.password.length < 6) {
      errors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoggingIn(true);
      const resultAction = await dispatch(signInUser({
        email: formData.email,
        password: formData.password
      }));
      
      if (signInUser.fulfilled.match(resultAction)) {
        // Redirect to intended page or dashboard
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center" data-aos="fade-down">
          <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <FaShieldAlt className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-purple-900">
            অ্যাডমিন লগইন
          </h2>
          <p className="mt-2 text-gray-600">
            সিস্টেম ব্যবস্থাপনার জন্য লগইন করুন
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ইমেইল ঠিকানা
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="আপনার ইমেইল লিখুন"
                  disabled={loading}
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">
                  {error === 'Server error' ? 'সার্ভার সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।' : error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLoggingIn}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              {loading || isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  লগইন হচ্ছে...
                </>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              সমস্যা হচ্ছে?{' '}
              <a href="/contact" className="text-purple-600 hover:text-purple-800">
                সাহায্য নিন
              </a>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" data-aos="fade-up">
          <div className="flex items-start">
            <FaShieldAlt className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                নিরাপত্তা সতর্কতা
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                আপনার লগইন তথ্য কারো সাথে শেয়ার করবেন না। লগইন শেষে অবশ্যই লগআউট করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;