import React, { useState } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { FiCamera, FiUpload, FiDownload, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

const Measurement = () => {
  const measurements = [
    "লম্বার মাপ",
    "বডি মাপ",
    "কোমরের মাপ",
    "হিপের মাপ",
    "পুট মাপ",
    "হাতে লম্বা",
    "হাতের মুখ",
    "নিচের ঘের"
  ];

  const [measurementValues, setMeasurementValues] = useState({});
  const [activeTab, setActiveTab] = useState('sketch');
  const [scannedImage, setScannedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [unit, setUnit] = useState('সেন্টিমিটার');
  const [payment, setPayment] = useState({
    total: '',
    advance: '',
    due: ''
  });

  const handleInputChange = (measurement, value) => {
    setMeasurementValues(prev => ({
      ...prev,
      [measurement]: value
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPayment(prev => ({
      ...prev,
      [field]: value,
      due: field === 'advance' ? (prev.total - value).toString() : 
           field === 'total' ? (value - prev.advance).toString() : prev.due
    }));
  };

  const handleScanClick = () => {
    setCameraActive(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScannedImage(event.target.result);
        setCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    setScannedImage('https://via.placeholder.com/400x500?text=Scanned+Measurement');
    setCameraActive(false);
  };

  const resetMeasurements = () => {
    setMeasurementValues({});
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg">
      {/* Payment Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-3 sm:mb-4 text-center">পেমেন্ট বিবরণ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-indigo-700 font-medium mb-1 text-sm sm:text-base">মোট টাকা</label>
            <input 
              type="number" 
              value={payment.total}
              onChange={(e) => handlePaymentChange('total', e.target.value)}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-sm sm:text-base"
              placeholder="০"
            />
          </div>
          <div>
            <label className="block text-indigo-700 font-medium mb-1 text-sm sm:text-base">অগ্রিম টাকা</label>
            <input 
              type="number" 
              value={payment.advance}
              onChange={(e) => handlePaymentChange('advance', e.target.value)}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-sm sm:text-base"
              placeholder="০"
            />
          </div>
          <div>
            <label className="block text-indigo-700 font-medium mb-1 text-sm sm:text-base">অবশিষ্ট টাকা</label>
            <input 
              type="number" 
              value={payment.due}
              readOnly
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-indigo-100 text-indigo-900 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-sm sm:text-base"
              placeholder="০"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Measurements Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800">দৈর্ঘ্য মাপ</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm sm:text-base">একক:</span>
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-indigo-100 text-indigo-800 py-1 px-2 sm:px-3 rounded-lg border border-indigo-200 focus:outline-none text-sm sm:text-base"
              >
                <option>সেন্টিমিটার</option>
                <option>ইঞ্চি</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {measurements.map((measurement, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-indigo-700 font-medium text-sm sm:text-base group-hover:text-indigo-900 transition-colors">
                    {measurement}
                  </label>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {unit}
                  </span>
                </div>
                <input 
                  type="text"
                  value={measurementValues[measurement] || ''}
                  onChange={(e) => handleInputChange(measurement, e.target.value)}
                  className="w-full py-2 px-3 sm:py-2.5 sm:px-4 bg-white text-gray-800 rounded-lg border border-indigo-100 focus:ring-2 focus:ring-indigo-300 focus:border-transparent focus:outline-none transition-all shadow-sm group-hover:shadow-md text-sm sm:text-base"
                  placeholder={`${measurement} লিখুন`}
                />
              </div>
            ))}
            
            {/* Additional Notes Section */}
            <div className="mt-4">
              <label className="block text-indigo-700 font-medium mb-1 text-sm sm:text-base">
                অতিরিক্ত নোটস
              </label>
              <textarea
                rows="3"
                className="w-full py-2 px-3 sm:py-2.5 sm:px-4 bg-white text-gray-800 rounded-lg border border-indigo-100 focus:ring-2 focus:ring-indigo-300 focus:border-transparent focus:outline-none transition-all shadow-sm text-sm sm:text-base"
                placeholder="যেকোনো বিশেষ নির্দেশনা লিখুন..."
              ></textarea>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-end space-x-3 sm:space-x-4">
            <button className="py-2 px-4 sm:py-2.5 sm:px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md text-sm sm:text-base flex items-center">
              <FiDownload className="mr-2" />
              সেভ করুন
            </button>
            <button 
              onClick={resetMeasurements}
              className="py-2 px-4 sm:py-2.5 sm:px-6 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors focus:outline-none text-sm sm:text-base flex items-center"
            >
              <FiTrash2 className="mr-2" />
              রিসেট করুন
            </button>
          </div>
        </div>

        {/* Sketch/Scan Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-800">
              {activeTab === 'sketch' ? 'ডিজাইন স্কেচ' : 'স্ক্যান মাপ'}
            </h2>
            
            {/* Tabs */}
            <div className="flex border border-indigo-200 rounded-lg overflow-hidden">
              <button
                className={`py-1 px-3 sm:py-1.5 sm:px-4 text-sm flex items-center ${activeTab === 'sketch' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
                onClick={() => setActiveTab('sketch')}
              >
                স্কেচ
              </button>
              <button
                className={`py-1 px-3 sm:py-1.5 sm:px-4 text-sm flex items-center ${activeTab === 'scan' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
                onClick={() => setActiveTab('scan')}
              >
                স্ক্যান
              </button>
            </div>
          </div>

          {/* Sketch/Scan Content */}
          {activeTab === 'sketch' && (
            <div className="h-[400px] sm:h-[500px] flex flex-col">
              <div className="flex-1 border border-indigo-200 rounded-lg overflow-hidden shadow-md">
                <Tldraw 
                  persistenceKey="measurement-sketch"
                  showMenu={false}
                  showPages={false}
                />
              </div>
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
                বোরখার ডিজাইন স্কেচ তৈরি করুন। প্রয়োজনীয় নোটস যোগ করতে ড্রয়িং টুলস ব্যবহার করুন
              </div>
            </div>
          )}

          {activeTab === 'scan' && (
            <div className="h-[400px] sm:h-[500px] flex flex-col">
              {cameraActive ? (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-indigo-300 p-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center mb-4">
                    <div className="text-center p-4">
                      <div className="mx-auto mb-3 text-indigo-500">
                        <FiCamera className="h-12 w-12 mx-auto" />
                      </div>
                      <p className="text-gray-500">ক্যামেরা প্রিভিউ</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setCameraActive(false)}
                      className="py-2 px-4 bg-red-500 text-white rounded-lg text-sm flex items-center"
                    >
                      <FiX className="mr-1" />
                      বাতিল
                    </button>
                    <button 
                      onClick={handleCapture}
                      className="py-2 px-4 bg-green-500 text-white rounded-lg text-sm flex items-center"
                    >
                      <FiCamera className="mr-1" />
                      ক্যাপচার
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-indigo-300 p-4">
                  {scannedImage ? (
                    <>
                      <div className="mb-4 w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={scannedImage} 
                          alt="Scanned measurement" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setScannedImage(null)}
                          className="py-2 px-4 bg-red-500 text-white rounded-lg text-sm flex items-center"
                        >
                          <FiTrash2 className="mr-1" />
                          মুছুন
                        </button>
                        <button 
                          onClick={handleScanClick}
                          className="py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm flex items-center"
                        >
                          <FiCamera className="mr-1" />
                          আবার স্ক্যান করুন
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-4">
                        <div className="mx-auto mb-3 text-indigo-400">
                          <FiCamera className="h-16 w-16 mx-auto" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          মাপ স্ক্যান করতে আপনার ডিভাইসের ক্যামেরা ব্যবহার করুন
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={handleScanClick}
                          className="py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm flex items-center justify-center"
                        >
                          <FiCamera className="mr-2" />
                          ক্যামেরা ব্যবহার করুন
                        </button>
                        <label className="py-2 px-4 bg-indigo-100 text-indigo-800 rounded-lg text-sm flex items-center justify-center cursor-pointer">
                          <FiUpload className="mr-2" />
                          ফাইল আপলোড
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
                স্ক্যান করা মাপ স্বয়ংক্রিয়ভাবে ফর্মে পূরণ হবে
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Save Button at Bottom */}
      <div className="mt-8 flex justify-center">
        <button className="py-3 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-lg font-bold text-lg flex items-center">
          <FiCheck className="mr-2 h-5 w-5" />
          অর্ডার কনফার্ম করুন
        </button>
      </div>
    </div>
  );
};

export default Measurement;