import { useState, useRef } from 'react';
import { FaTimes, FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaEdit, FaDraftingCompass, FaSearchPlus, FaSearchMinus, FaExpand, FaPrint } from 'react-icons/fa';

const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate, onEdit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const modalRef = useRef(null);
  
  if (!isOpen || !order) return null;

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { text: 'অপেক্ষমান', color: 'bg-yellow-100 text-yellow-800' },
      'in-progress': { text: 'প্রক্রিয়াধীন', color: 'bg-blue-100 text-blue-800' },
      'completed': { text: 'সম্পন্ন', color: 'bg-green-100 text-green-800' }
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
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': null
    };
    return statusFlow[currentStatus];
  };

  const getNextStatusText = (nextStatus) => {
    const statusMap = {
      'in-progress': 'প্রক্রিয়াধীন করুন',
      'completed': 'সম্পন্ন করুন'
    };
    return statusMap[nextStatus];
  };

  const nextStatus = getNextStatus(order.status);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setZoomLevel(1);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const handlePrint = () => {
    // Create a print-friendly version of the order details
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>অর্ডার বিস্তারিত - #${order._id?.substring(0, 6)}</title>
        <style>
          body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            margin: 0; 
            padding: 15px;
            color: #333;
            background: #fff;
            font-size: 12px;
          }
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
          .header { 
            text-align: center; 
            margin-bottom: 20px;
            border-bottom: 2px solid #8B5CF6;
            padding-bottom: 15px;
          }
          .header h1 {
            color: #8B5CF6;
            margin: 0 0 8px 0;
            font-size: 22px;
          }
          .header p {
            margin: 4px 0;
            color: #666;
            font-size: 12px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #8B5CF6;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #eee;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 12px;
          }
          .info-item {
            margin-bottom: 8px;
          }
          .info-label {
            font-weight: bold;
            color: #555;
            font-size: 11px;
          }
          .info-value {
            margin-top: 4px;
            font-size: 12px;
          }
          .measurements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
            gap: 8px;
          }
          .measurement-item {
            background: #f8f9fa;
            padding: 8px 6px;
            border-radius: 5px;
            text-align: center;
            border: 1px solid #eee;
          }
          .measurement-value {
            font-size: 15px;
            font-weight: bold;
            color: #8B5CF6;
          }
          .measurement-label {
            font-size: 10px;
            color: #666;
            margin-top: 3px;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 11px;
          }
          .status-pending { background: #fef3c7; color: #92400e; }
          .status-in-progress { background: #dbeafe; color: #1e40af; }
          .status-completed { background: #d1fae5; color: #065f46; }
          .image-container {
            text-align: center;
            margin: 12px 0;
          }
          .image-container img {
            max-width: 100%;
            max-height: 120px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .image-label {
            margin-top: 5px;
            font-size: 10px;
            color: #666;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 10px;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
          .notes-box {
            background: #fff8e6;
            border: 1px solid #ffe0b3;
            border-radius: 5px;
            padding: 10px;
            margin: 10px 0;
          }
          .notes-title {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            font-size: 12px;
          }
          .reference-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
            gap: 10px;
          }
          @media print {
            @page {
              size: A4;
              margin: 0.5cm;
            }
            body {
              margin: 0;
              padding: 10px;
              font-size: 10px;
              transform: scale(0.95);
              transform-origin: top left;
            }
            button {
              display: none;
            }
            .header h1 {
              font-size: 20px;
            }
            .section-title {
              font-size: 14px;
            }
            .info-grid {
              gap: 6px;
            }
            .measurements-grid {
              gap: 4px;
            }
            .measurement-item {
              padding: 5px 3px;
            }
            .measurement-value {
              font-size: 13px;
            }
            .image-container img {
              max-height: 100px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>সৌদিয়া টেইলার্স</h1>
            <p>অর্ডার বিস্তারিত</p>
            <p>অর্ডার আইডি: #${order._id?.substring(0, 6)}</p>
          </div>
          
          <!-- Customer Information -->
          <div class="section">
            <div class="section-title">গ্রাহকের তথ্য</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">নাম</div>
                <div class="info-value">${order.customerName || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">ফোন</div>
                <div class="info-value">${order.phoneNumber || 'N/A'}</div>
              </div>
              ${order.address ? `
              <div class="info-item">
                <div class="info-label">ঠিকানা</div>
                <div class="info-value">${order.address}</div>
              </div>
              ` : ''}
              <div class="info-item">
                <div class="info-label">অবস্থা</div>
                <div class="info-value">
                  <span class="status-badge status-${order.status}">
                    ${order.status === 'pending' ? 'অপেক্ষমান' : 
                      order.status === 'in-progress' ? 'প্রক্রিয়াধীন' : 
                      order.status === 'completed' ? 'সম্পন্ন' : order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Information -->
          <div class="section">
            <div class="section-title">অর্ডার তথ্য</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">অর্ডারের তারিখ</div>
                <div class="info-value">
                  ${order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD') : 'N/A'}
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">পরিমাণ</div>
                <div class="info-value">৳${order.totalAmount || 0}</div>
              </div>
              ${order.deliveryDate ? `
              <div class="info-item">
                <div class="info-label">ডেলিভারির তারিখ</div>
                <div class="info-value">
                  ${new Date(order.deliveryDate).toLocaleDateString('bn-BD')}
                </div>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Measurements -->
          ${order.measurements ? `
          <div class="section">
            <div class="section-title">মাপের তথ্য</div>
            <div class="measurements-grid">
              ${order.measurements.length ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.length} সেমি</div>
                <div class="measurement-label">লম্বা</div>
              </div>
              ` : ''}
              ${order.measurements.body ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.body} সেমি</div>
                <div class="measurement-label">বডি</div>
              </div>
              ` : ''}
              ${order.measurements.waist ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.waist} সেমি</div>
                <div class="measurement-label">কোমর</div>
              </div>
              ` : ''}
              ${order.measurements.hip ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.hip} সেমি</div>
                <div class="measurement-label">হিপ</div>
              </div>
              ` : ''}
              ${order.measurements.leg ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.leg} সেমি</div>
                <div class="measurement-label">লেগ</div>
              </div>
              ` : ''}
              ${order.measurements.armLength ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.armLength} সেমি</div>
                <div class="measurement-label">আর্ম লেন্থ</div>
              </div>
              ` : ''}
              ${order.measurements.armWidth ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.armWidth} সেমি</div>
                <div class="measurement-label">আর্ম উইডথ</div>
              </div>
              ` : ''}
              ${order.measurements.bottomRound ? `
              <div class="measurement-item">
                <div class="measurement-value">${order.measurements.bottomRound} সেমি</div>
                <div class="measurement-label">বটম রাউন্ড</div>
              </div>
              ` : ''}
            </div>
            ${(order.specialNotes || order.measurements.additionalNotes) ? `
            <div class="notes-box">
              <div class="notes-title">অতিরিক্ত নোট</div>
              <div>
                ${order.specialNotes || order.measurements.additionalNotes}
              </div>
            </div>
            ` : ''}
          </div>
          ` : ''}
          
          <!-- Measurement Sketch -->
          ${order.measurementSketch ? `
          <div class="section">
            <div class="section-title">মাপের স্কেচ</div>
            <div class="image-container">
              <img src="${order.measurementSketch}" alt="Measurement Sketch" />
              <div class="image-label">গ্রাহকের মাপের ডিজিটাল স্কেচ</div>
            </div>
          </div>
          ` : ''}
          
          <!-- Design References -->
          ${(order.designReference && order.designReference.length > 0) ? `
          <div class="section">
            <div class="section-title">ডিজাইন রেফারেন্স</div>
            <div class="reference-grid">
              ${order.designReference.map((ref, index) => `
                <div style="text-align: center;">
                  <div class="image-container">
                    <img src="${ref}" alt="Design ${index + 1}" />
                    <div class="image-label">ডিজাইন ${index + 1}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} সৌদিয়া টেইলার্স - সকল স্বত্ব সংরক্ষিত</p>
            <p>প্রিন্ট করেছেন: ${new Date().toLocaleDateString('bn-BD')} ${new Date().toLocaleTimeString('bn-BD')}</p>
          </div>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" data-aos="fade-in">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        {/* <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div> */

        /* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">অর্ডার বিস্তারিত</h3>
              <p className="text-sm text-gray-500">অর্ডার আইডি: #{order._id?.substring(0, 6)}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="text-gray-600 hover:text-purple-600"
                title="প্রিন্ট করুন"
              >
                <FaPrint size={20} />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                <FaTimes />
              </button>
            </div>
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
                  onClick={() => onStatusUpdate(order._id, nextStatus)}
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
                    <p className="font-medium">{order.phoneNumber}</p>
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
                    <p className="font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD') : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">পরিমাণ</p>
                    <p className="font-medium text-green-600">৳{order.totalAmount || 0}</p>
                  </div>
                </div>
                {order.deliveryDate && (
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">ডেলিভারি তারিখ</p>
                      <p className="font-medium">
                        {new Date(order.deliveryDate).toLocaleDateString('bn-BD')}
                      </p>
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
                  {order.measurements.leg && (
                    <div>
                      <p className="text-sm text-gray-600">লেগ</p>
                      <p className="font-medium">{order.measurements.leg} সেমি</p>
                    </div>
                  )}
                  {order.measurements.armLength && (
                    <div>
                      <p className="text-sm text-gray-600">আর্ম লেন্থ</p>
                      <p className="font-medium">{order.measurements.armLength} সেমি</p>
                    </div>
                  )}
                  {order.measurements.armWidth && (
                    <div>
                      <p className="text-sm text-gray-600">আর্ম উইডথ</p>
                      <p className="font-medium">{order.measurements.armWidth} সেমি</p>
                    </div>
                  )}
                  {order.measurements.bottomRound && (
                    <div>
                      <p className="text-sm text-gray-600">বটম রাউন্ড</p>
                      <p className="font-medium">{order.measurements.bottomRound} সেমি</p>
                    </div>
                  )}
                </div>
                {(order.specialNotes || order.measurements.additionalNotes) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">অতিরিক্ত নোট</p>
                    <p className="font-medium">
                      {order.specialNotes || order.measurements.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Measurement Sketch (Canvas Data) */}
          {order.measurementSketch && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaDraftingCompass className="mr-2 text-purple-600" />
                মাপের স্কেচ
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <img 
                  src={order.measurementSketch} 
                  alt="Measurement Sketch" 
                  className="w-full max-h-64 object-contain border rounded cursor-pointer hover:opacity-90 transition"
                  onClick={() => openImageModal(order.measurementSketch)}
                />
                <p className="text-sm text-gray-600 mt-2 text-center">গ্রাহকের মাপের ডিজিটাল স্কেচ (ক্লিক করে বড় সাইজে দেখুন)</p>
              </div>
            </div>
          )}

          {/* Design References */}
          {(order.designReference && order.designReference.length > 0) && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">ডিজাইন রেফারেন্স</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {order.designReference.map((ref, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
                    onClick={() => openImageModal(ref)}
                  >
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
          {(order.specialNotes || order.notes) && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">বিশেষ নির্দেশনা</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700">{order.specialNotes || order.notes}</p>
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

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-60 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-10"
            >
              <FaTimes size={20} />
            </button>
            
            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 flex space-x-2 z-10">
              <button
                onClick={zoomIn}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                title="জুম ইন"
              >
                <FaSearchPlus />
              </button>
              <button
                onClick={zoomOut}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                title="জুম আউট"
              >
                <FaSearchMinus />
              </button>
              <button
                onClick={resetZoom}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                title="রিসেট"
              >
                <FaExpand />
              </button>
            </div>
            
            {/* Image */}
            <div className="flex items-center justify-center h-full">
              <img 
                src={selectedImage} 
                alt="Zoomed view" 
                className="max-h-[80vh] max-w-full object-contain"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
              />
            </div>
            
            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              জুম: {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;