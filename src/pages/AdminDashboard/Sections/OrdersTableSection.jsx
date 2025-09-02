import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const OrdersTableSection = ({ 
  orders, 
  loading, 
  onViewOrder, 
  onEditOrder, 
  onDeleteOrder, 
  onNewOrder,
  getStatusBadge 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">অর্ডার তালিকা</h3>
          </div>
          <button 
            onClick={onNewOrder}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
            title="নতুন অর্ডার তৈরি করুন"
          >
            <FaPlus className="mr-2" />
            নতুন অর্ডার
          </button>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2">লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">অর্ডার তালিকা</h3>
        </div>
        <button 
          onClick={onNewOrder}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
          title="নতুন অর্ডার তৈরি করুন"
        >
          <FaPlus className="mr-2" />
          নতুন অর্ডার
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                অর্ডার আইডি
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                গ্রাহকের তথ্য
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                অবস্থা
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                পরিমাণ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                তারিখ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                কার্যক্রম
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ৳{order.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onViewOrder(order)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="দেখুন"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => onEditOrder(order)}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="সম্পাদনা"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => onDeleteOrder(order)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="মুছে ফেলুন"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">কোন অর্ডার পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default OrdersTableSection;