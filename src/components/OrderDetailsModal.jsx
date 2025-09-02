import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaEdit } from 'react-icons/fa';

const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onEdit }) => {
  if (!isOpen || !order) return null;

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending': { text: 'অপেক্ষমান', color: 'bg-yellow-100 text-yellow-800' },
      'In Progress': { text: 'প্রক্রিয়াধীন', color: 'bg-blue-100 text-blue-800' },
      'Completed': { text: 'সম্পন্ন', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Pending': 'In Progress',
      'In Progress': 'Completed',
      'Completed': null
    };
    return statusFlow[currentStatus];
  };

  const getNextStatusText = (nextStatus) => {
    const statusMap = {
      'In Progress': 'প্রক্রিয়াধীন করুন',
      'Completed': 'সম্পন্ন করুন'
    };
    return statusMap[nextStatus];
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" data-aos="fade-in">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        {/* <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div> */}

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">অর্ডার বিস্তারিত</h3>
              <p className="text-sm text-gray-500">অর্ডার আইডি: #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Order Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">অবস্থা:</span>
                {getStatusBadge(order.status)}
              </div>
              {nextStatus && (
                <button
                  onClick={() => onStatusUpdate(order.id, nextStatus)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  {getNextStatusText(nextStatus)}
                </button>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaUser className="mr-2 text-purple-600" />
                গ্রাহকের তথ্য
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaUser className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">নাম</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">ফোন</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                </div>
                {order.address && (
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">ঠিকানা</p>
                      <p className="font-medium">{order.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-600" />
                অর্ডার তথ্য
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">তারিখ</p>
                    <p className="font-medium">{order.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">পরিমাণ</p>
                    <p className="font-medium text-green-600">৳{order.totalAmount}</p>
                  </div>
                </div>
                {order.deliveryDate && (
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">ডেলিভারি তারিখ</p>
                      <p className="font-medium">{order.deliveryDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Measurements */}
          {order.measurements && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">মাপের তথ্য</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {order.measurements.length && (
                    <div>
                      <p className="text-sm text-gray-600">লম্বা</p>
                      <p className="font-medium">{order.measurements.length} সেমি</p>
                    </div>
                  )}
                  {order.measurements.body && (
                    <div>
                      <p className="text-sm text-gray-600">বডি</p>
                      <p className="font-medium">{order.measurements.body} সেমি</p>
                    </div>
                  )}
                  {order.measurements.waist && (
                    <div>
                      <p className="text-sm text-gray-600">কোমর</p>
                      <p className="font-medium">{order.measurements.waist} সেমি</p>
                    </div>
                  )}
                  {order.measurements.hip && (
                    <div>
                      <p className="text-sm text-gray-600">হিপ</p>
                      <p className="font-medium">{order.measurements.hip} সেমি</p>
                    </div>
                  )}
                </div>
                {order.measurements.additionalNotes && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">অতিরিক্ত নোট</p>
                    <p className="font-medium">{order.measurements.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Design References */}
          {order.designReferences && order.designReferences.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">ডিজাইন রেফারেন্স</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {order.designReferences.map((ref, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <img 
                      src={ref} 
                      alt={`Design ${index + 1}`} 
                      className="w-full h-20 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Notes */}
          {order.notes && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">বিশেষ নির্দেশনা</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              বন্ধ করুন
            </button>
            <button
              onClick={() => onEdit(order)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <FaEdit className="mr-2" />
              সম্পাদনা করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;