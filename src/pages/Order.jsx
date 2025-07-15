import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { FiUser, FiPhone, FiEdit, FiPrinter, FiTrash2 } from 'react-icons/fi';

// Edit Modal Component
const EditModal = ({ order, onSave, onClose }) => {
  const [formData, setFormData] = useState(order);

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">অর্ডার সম্পাদনা</h2>
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-slate-300">গ্রাহকের তথ্য</h3>
          <input type="text" value={formData.customer.name} onChange={e => handleChange(e, 'customer', 'name')} className="w-full bg-slate-700/50 rounded p-3 text-white" />
          <input type="text" value={formData.customer.phone} onChange={e => handleChange(e, 'customer', 'phone')} className="w-full bg-slate-700/50 rounded p-3 text-white" />
        </div>
        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-slate-300">মূল্য নির্ধারণ</h3>
          <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="মোট" value={formData.pricing.total} onChange={e => handleChange(e, 'pricing', 'total')} className="w-full bg-slate-700/50 rounded p-3 text-white" />
            <input type="number" placeholder="জমা" value={formData.pricing.paid} onChange={e => handleChange(e, 'pricing', 'paid')} className="w-full bg-slate-700/50 rounded p-3 text-white" />
            <input type="number" placeholder="বাকি" value={formData.pricing.due} onChange={e => handleChange(e, 'pricing', 'due')} className="w-full bg-slate-700/50 rounded p-3 text-white" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg">বাতিল</button>
          <button onClick={handleSave} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">সেভ</button>
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Order Receipt - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            .logo { text-align: center; margin-bottom: 20px; }
            .logo h1 { font-size: 2.5rem; font-weight: 800; background: -webkit-linear-gradient(left, #ec4899, #8b5cf6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            h1 { color: #6a0dad; border-bottom: 2px solid #eee; padding-bottom: 10px; }
            h2 { color: #4a4a4a; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="logo">
            <h1>সৌদিয়া টেইলার্স</h1>
          </div>
          <h1>Order Receipt - ${order.id}</h1>
          <p><strong>Order Date:</strong> ${order.orderDate}</p>
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> ${order.customer.name}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
          <h2>Pricing</h2>
          <p><strong>Total:</strong> ৳${order.pricing.total}</p>
          <p><strong>Paid:</strong> ৳${order.pricing.paid}</p>
          <p><strong>Due:</strong> ৳${order.pricing.due}</p>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-2xl p-6 space-y-5 border border-slate-700/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-xl text-purple-300">{order.id}</p>
            <p className="text-sm text-slate-400">{order.orderDate}</p>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <h3 className="text-lg font-bold text-slate-200 mb-3">Customer Details</h3>
          <div className="space-y-2 text-slate-300">
            <p className="flex items-center gap-3"><FiUser className="text-cyan-400" /> {order.customer.name}</p>
            <p className="flex items-center gap-3"><FiPhone className="text-cyan-400" /> {order.customer.phone}</p>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-4">
          <h3 className="text-lg font-bold text-slate-200 mb-3">Pricing</h3>
          <div className="flex justify-between items-center text-slate-300">
            <div className="text-center">
              <p className="text-xs text-slate-400">Total</p>
              <p className="font-bold text-xl text-green-400">৳${order.pricing.total}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Paid</p>
              <p className="font-bold text-xl text-cyan-400">৳${order.pricing.paid}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Due</p>
              <p className="font-bold text-xl text-red-400">৳${order.pricing.due}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <button onClick={() => setIsEditing(true)} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-2.5 rounded-lg"><FiEdit /> Edit</button>
          <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2.5 rounded-lg"><FiPrinter /> Print</button>
          <button onClick={() => onDelete(order.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2.5 rounded-lg"><FiTrash2 /> Delete</button>
        </div>
      </div>
      {isEditing && <EditModal order={order} onClose={() => setIsEditing(false)} onSave={onUpdate} />}
    </>
  );
};

// Main Order Page Component
const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders.sort((a, b) => b.id.localeCompare(a.id))); // Sort by ID descending
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateOrder = (updatedOrder) => {
    const updatedOrders = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    Swal.fire('Success!', 'Order has been updated.', 'success');
  };

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredOrders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(filteredOrders));
        setOrders(filteredOrders);
        Swal.fire('Deleted!', 'The order has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 text-center">Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.id} order={order} onUpdate={handleUpdateOrder} onDelete={handleDeleteOrder} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-slate-400">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;