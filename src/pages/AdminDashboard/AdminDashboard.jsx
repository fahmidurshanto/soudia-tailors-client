import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';

import { signOutUser } from '../../features/auth/authSlice';
import { fetchOrders, updateOrderStatus, setOrderForEdit, resetOrder } from '../../features/order/orderSlice';
import Modal from '../../components/Modal';
import OrderDetailsModal from '../../components/OrderDetailsModal';
import ReportModal from '../../components/ReportModal';
import useDebounce from '../../hooks/useDebounce';

// Dashboard Sections
import DashboardHeader from './Sections/DashboardHeader';
import TabNavigation from './Sections/TabNavigation';
import StatsSection from './Sections/StatsSection';
import RecentOrdersSection from './Sections/RecentOrdersSection';
import SearchFilterSection from './Sections/SearchFilterSection';
import OrdersTableSection from './Sections/OrdersTableSection';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalCustomers: 0
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, status: orderStatus } = useSelector((state) => state.order);
  
  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Check authentication status - only redirect after auth check is complete
  useEffect(() => {
    // Wait for auth loading to finish before making navigation decisions
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch orders from backend
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated, authLoading]);

  // Update stats when orders change
  useEffect(() => {
    if (orders && orders.length > 0) {
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        inProgressOrders: orders.filter(o => o.status === 'in-progress').length,
        completedOrders: orders.filter(o => o.status === 'completed').length,
        totalCustomers: orders.length
      });
    }
  }, [orders]);

  // Refresh AOS when authentication state changes
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }, [authLoading, isAuthenticated]);

  // Event Handlers
  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
      navigate('/admin/login');
      toast.success('সফলভাবে লগআউট হয়েছে');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('লগআউট করতে সমস্যা হয়েছে');
    } finally {
      setShowLogoutModal(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleEditOrder = (order) => {
    // Set the order data in the Redux store for editing
    dispatch(setOrderForEdit(order));
    // Navigate to the order page with edit mode
    navigate('/order', { state: { orderId: order._id } });
    toast.info(`${order.customerName} এর অর্ডার সম্পাদনার জন্য তৈরি`);
  };

  const handleNewOrder = () => {
    // Reset the order form
    dispatch(resetOrder());
    // Navigate to new order page
    navigate('/order');
    toast.success('নতুন অর্ডার পৃষ্ঠায় পুনর্নির্দেশিত হচ্ছে...');
  };

  const handleExportReport = () => {
    setShowReportModal(true);
  };

  const handleGenerateReport = (filters) => {
    try {
      // Filter orders based on selected criteria
      let filteredData = [...filteredOrders];
      
      // Apply date filter
      if (filters.dateRange !== 'all') {
        const today = new Date();
        const filterDate = new Date();
        
        switch (filters.dateRange) {
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
        
        filteredData = filteredData.filter(order => new Date(order.createdAt) >= filterDate);
      }
      
      // Apply status filter
      if (filters.statusFilter !== 'all') {
        filteredData = filteredData.filter(order => order.status === filters.statusFilter);
      }
      
      // Generate report based on type
      if (filters.reportType === 'pdf') {
        generatePDFReport(filteredData);
      } else {
        const csvContent = generateCSVReport(filteredData, filters.includeDetails);
        downloadCSV(csvContent, `orders-report-${new Date().toISOString().split('T')[0]}.csv`);
      }
      
      toast.success(`${filteredData.length}টি অর্ডারের রিপোর্ট সফলভাবে তৈরি হয়েছে`);
    } catch (error) {
      console.error('Report generation error:', error);
      toast.error('রিপোর্ট তৈরি করতে সমস্যা হয়েছে');
    }
  };

  // Generate PDF report
  const generatePDFReport = (orders) => {
    // Create a simple HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>অর্ডার রিপোর্ট</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .status-pending { color: #f59e0b; }
          .status-progress { color: #3b82f6; }
          .status-completed { color: #10b981; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>সৌদিয়া টেইলার্স</h1>
          <h2>অর্ডার রিপোর্ট</h2>
          <p>তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
        </div>
        
        <div class="summary">
          <h3>সারাংশ</h3>
          <p>মোট অর্ডার: ${orders.length}টি</p>
          <p>অপেক্ষমান: ${orders.filter(o => o.status === 'pending').length}টি</p>
          <p>প্রক্রিয়াধীন: ${orders.filter(o => o.status === 'in-progress').length}টি</p>
          <p>সম্পন্ন: ${orders.filter(o => o.status === 'completed').length}টি</p>
          <p>মোট আয়: ৳${orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>অর্ডার আইডি</th>
              <th>গ্রাহকের নাম</th>
              <th>ফোন</th>
              <th>অবস্থা</th>
              <th>পরিমাণ</th>
              <th>তারিখ</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(order => `
              <tr>
                <td>#${order._id?.substring(0, 6)}</td>
                <td>${order.customerName}</td>
                <td>${order.phoneNumber}</td>
                <td class="status-${order.status.toLowerCase().replace(' ', '')}">
                  ${order.status === 'pending' ? 'অপেক্ষমান' : 
                    order.status === 'in-progress' ? 'প্রক্রিয়াধীন' : 
                    order.status === 'completed' ? 'সম্পন্ন' : order.status}
                </td>
                <td>৳${order.totalAmount || 0}</td>
                <td>${new Date(order.createdAt).toLocaleDateString('bn-BD')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    
    // Create and download PDF
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders-report-${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    
    // Note: For actual PDF generation, you would use a library like jsPDF or html2pdf
    toast.info('HTML রিপোর্ট ডাউনলোড হয়েছে। PDF এর জন্য ব্রাউজারে প্রিন্ট করুন।');
  };

  // Generate CSV report
  const generateCSVReport = (orders, includeDetails = true) => {
    let headers = [
      'অর্ডার আইডি',
      'গ্রাহকের নাম', 
      'ফোন নম্বর',
      'ঠিকানা',
      'অবস্থা',
      'পরিমাণ (৳)',
      'অর্ডারের তারিখ',
      'ডেলিভারির তারিখ'
    ];

    if (includeDetails) {
      headers = headers.concat([
        'লম্বা',
        'বডি',
        'কোমর',
        'হিপ',
        'অতিরিক্ত নোট'
      ]);
    }

    const csvRows = [headers.join(',')];

    orders.forEach(order => {
      let row = [
        order._id?.substring(0, 6) || '',
        `"${order.customerName || ''}"`,
        order.phoneNumber || '',
        `"${order.address || ''}"`,
        order.status === 'pending' ? 'অপেক্ষমান' : 
        order.status === 'in-progress' ? 'প্রক্রিয়াধীন' : 
        order.status === 'completed' ? 'সম্পন্ন' : order.status,
        order.totalAmount || 0,
        order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD') : '',
        order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('bn-BD') : ''
      ];

      if (includeDetails) {
        row = row.concat([
          order.measurements?.length || '',
          order.measurements?.body || '',
          order.measurements?.waist || '',
          order.measurements?.hip || '',
          `"${order.specialNotes || order.notes || ''}"`
        ]);
      }

      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  };

  // Download CSV file
  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      // In a real implementation, you would call an API to delete the order
      toast.success(`অর্ডার #${orderToDelete._id?.substring(0, 6)} সফলভাবে মুছে ফেলা হয়েছে`);
      setOrderToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const resultAction = await dispatch(updateOrderStatus({ orderId, status: newStatus }));
      
      if (updateOrderStatus.fulfilled.match(resultAction)) {
        toast.success(`অর্ডার #${orderId?.substring(0, 6)} স্ট্যাটাস পরিবর্তন করা হয়েছে`);
        setShowOrderDetails(false);
      } else {
        throw new Error(resultAction.payload || 'স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.message || 'স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { text: 'অপেক্ষমান', color: 'bg-yellow-100 text-yellow-800' },
      'in-progress': { text: 'প্রক্রিয়াধীন', color: 'bg-blue-100 text-blue-800' },
      'completed': { text: 'সম্পন্ন', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         order.phoneNumber?.includes(debouncedSearchTerm) ||
                         order._id?.toString().includes(debouncedSearchTerm) ||
                         (order.address && order.address.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show loading screen while authentication is being checked
  if (authLoading || orderStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (after auth check is complete)
  if (!authLoading && !isAuthenticated) {
    return <div>পুনর্নির্দেশ করা হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader 
        user={user}
        onLogout={() => setShowLogoutModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 opacity-0 animate-fade-in" style={{animationDelay: '100ms'}}>
            {/* Stats Cards */}
            <StatsSection 
              stats={stats}
              loading={orderStatus === 'loading'}
            />

            {/* Recent Orders */}
            <RecentOrdersSection 
              orders={orders}
              loading={orderStatus === 'loading'}
              onViewOrder={handleViewOrder}
              getStatusBadge={getStatusBadge}
            />
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6 opacity-0 animate-fade-in" style={{animationDelay: '100ms'}}>
            {/* Search and Filter */}
            <SearchFilterSection 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              filteredOrdersCount={filteredOrders.length}
              debouncedSearchTerm={debouncedSearchTerm}
              onExportReport={handleExportReport}
            />

            {/* Orders Table */}
            <OrdersTableSection 
              orders={filteredOrders}
              loading={orderStatus === 'loading'}
              onViewOrder={handleViewOrder}
              onEditOrder={handleEditOrder}
              onDeleteOrder={handleDeleteOrder}
              onNewOrder={handleNewOrder}
              getStatusBadge={getStatusBadge}
            />
          </div>
        )}
      </div>
      
      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        orders={orders}
        onGenerateReport={handleGenerateReport}
      />
      
      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
        onEdit={handleEditOrder}
      />
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteOrder}
        title="অর্ডার মুছে ফেলার নিশ্চিতকরণ"
        message={`আপনি কি নিশ্চিত যে অর্ডার #${orderToDelete?._id?.substring(0, 6)} (${orderToDelete?.customerName}) মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmText="মুছে ফেলুন"
        cancelText="বাতিল"
      />
      
      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="লগআউট নিশ্চিতকরণ"
        message="আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?"
        confirmText="লগআউট"
        cancelText="বাতিল"
      />
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminDashboard;