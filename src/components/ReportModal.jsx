import { useState } from 'react';
import { FaDownload, FaTimes, FaFileExcel, FaFilePdf, FaFilter } from 'react-icons/fa';

const ReportModal = ({ isOpen, onClose, orders, onGenerateReport }) => {
  const [reportType, setReportType] = useState('csv');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [includeDetails, setIncludeDetails] = useState(true);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const filters = {
      dateRange,
      statusFilter,
      includeDetails,
      reportType
    };
    onGenerateReport(filters);
    onClose();
  };

  const getFilteredOrdersCount = () => {
    let filtered = orders;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (dateRange !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setDate(today.getDate());
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(order => new Date(order.createdAt) >= filterDate);
    }
    
    return filtered.length;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" data-aos="fade-in">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div> */}

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">রিপোর্ট তৈরি করুন</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                রিপোর্টের ধরন
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setReportType('csv')}
                  className={`p-3 border rounded-lg flex items-center justify-center transition ${
                    reportType === 'csv' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaFileExcel className="mr-2" />
                  CSV ফাইল
                </button>
                <button
                  onClick={() => setReportType('pdf')}
                  className={`p-3 border rounded-lg flex items-center justify-center transition ${
                    reportType === 'pdf' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaFilePdf className="mr-2" />
                  PDF ফাইল
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                সময়কাল
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="all">সমস্ত অর্ডার</option>
                <option value="today">আজকের অর্ডার</option>
                <option value="week">গত ৭ দিন</option>
                <option value="month">গত ৩০ দিন</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অবস্থা
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="all">সব অবস্থা</option>
                <option value="Pending">অপেক্ষমান</option>
                <option value="In Progress">প্রক্রিয়াধীন</option>
                <option value="Completed">সম্পন্ন</option>
              </select>
            </div>

            {/* Include Details */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <span className="ml-2 text-sm text-gray-700">
                  মাপ এবং বিস্তারিত তথ্য অন্তর্ভুক্ত করুন
                </span>
              </label>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                <FaFilter className="mr-2" />
                মোট {getFilteredOrdersCount()}টি অর্ডার রিপোর্টে অন্তর্ভুক্ত হবে
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              বাতিল
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center"
            >
              <FaDownload className="mr-2" />
              রিপোর্ট তৈরি করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;