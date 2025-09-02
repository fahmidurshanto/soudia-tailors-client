import { FaUsers, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';

const StatsSection = ({ stats, loading }) => {
  const statsCards = [
    {
      title: 'মোট অর্ডার',
      value: stats.totalOrders,
      icon: FaClipboardList,
      color: 'text-purple-600'
    },
    {
      title: 'অপেক্ষমান',
      value: stats.pendingOrders,
      icon: FaClock,
      color: 'text-yellow-600'
    },
    {
      title: 'সম্পন্ন',
      value: stats.completedOrders,
      icon: FaCheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'গ্রাহক',
      value: stats.totalCustomers,
      icon: FaUsers,
      color: 'text-blue-600'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6" data-aos="fade-up" data-aos-delay={index * 100}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;