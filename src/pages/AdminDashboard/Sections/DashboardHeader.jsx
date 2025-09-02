import { FaSignOutAlt } from 'react-icons/fa';

const DashboardHeader = ({ user, onLogout }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">
              অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-gray-600">সৌদিয়া লেডিস টেইলার্স</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              স্বাগতম, {user?.email || 'অ্যাডমিন'}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <FaSignOutAlt className="mr-2" />
              লগআউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;