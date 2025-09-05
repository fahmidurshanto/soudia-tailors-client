import { FaSearch, FaDownload, FaPlus } from 'react-icons/fa';

const SearchFilterSection = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  filteredOrdersCount,
  debouncedSearchTerm,
  onExportReport
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="গ্রাহকের নাম, ফোন নম্বর, অর্ডার আইডি বা ঠিকানা দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">সব অবস্থা</option>
            <option value="pending">অপেক্ষমান</option>
            <option value="in-progress">প্রক্রিয়াধীন</option>
            <option value="completed">সম্পন্ন</option>
          </select>
        </div>
        <button 
          onClick={onExportReport}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center"
          title="অর্ডার রিপোর্ট ডাউনলোড করুন"
        >
          <FaDownload className="mr-2" />
          রিপোর্ট
        </button>
      </div>
      
      {/* Search Results Info */}
      <div className="mt-4 text-sm text-gray-600">
        মোট {filteredOrdersCount}টি অর্ডার পাওয়া গেছে
        {debouncedSearchTerm && ` "${debouncedSearchTerm}" এর জন্য`}
        {statusFilter !== 'all' && ` (স্ট্যাটাস: ${statusFilter})`}
      </div>
    </div>
  );
};

export default SearchFilterSection;