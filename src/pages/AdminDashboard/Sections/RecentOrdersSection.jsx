const RecentOrdersSection = ({ orders, loading, onViewOrder, getStatusBadge }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">সাম্প্রতিক অর্ডার</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow" data-aos="fade-up">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">সাম্প্রতিক অর্ডার</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                অর্ডার আইডি
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                গ্রাহকের নাম
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ফোন
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                অবস্থা
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                তারিখ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.slice(0, 5).map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewOrder(order)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.createdAt}
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

export default RecentOrdersSection;