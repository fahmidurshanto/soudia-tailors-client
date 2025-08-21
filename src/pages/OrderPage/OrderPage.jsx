import React, { useState } from 'react';
import CustomerInfoSection from './Sections/CustomerInfoSection';
import MeasurementsSection from './Sections/MeasurementsSection';
import DesignReferenceSection from './Sections/DesignReferenceSection';
import ProgressIndicator from './Sections/ProgressIndicator';

const OrderPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [measurements, setMeasurements] = useState({
    length: '',
    body: '',
    waist: '',
    hip: '',
    leg: '',
    armLength: '',
    armWidth: '',
    bottomRound: '',
    additionalNotes: ''
  });

  const sections = [
    {
      title: "গ্রাহকের তথ্য",
      icon: "FaUser"
    },
    {
      title: "মাপ",
      icon: "FaRulerCombined"
    },
    {
      title: "ডিজাইন রেফারেন্স",
      icon: "FaCamera"
    }
  ];

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('অর্ডারটি সফলভাবে জমা দেওয়া হয়েছে!');
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-2">
          নতুন অর্ডার
        </h1>
        <p className="text-center text-gray-600 mb-8">
          গ্রাহকের তথ্য, মাপ এবং ডিজাইন রেফারেন্স যোগ করুন
        </p>

        <ProgressIndicator 
          sections={sections} 
          activeSection={activeSection} 
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          {activeSection === 0 && (
            <CustomerInfoSection 
              customerData={customerData} 
              setCustomerData={setCustomerData} 
            />
          )}
          
          {activeSection === 1 && (
            <MeasurementsSection 
              measurements={measurements} 
              setMeasurements={setMeasurements} 
            />
          )}
          
          {activeSection === 2 && (
            <DesignReferenceSection />
          )}

          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrevious}
              disabled={activeSection === 0}
              className={`flex items-center px-5 py-2 rounded-lg ${activeSection === 0 ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              পূর্ববর্তী
            </button>
            
            {activeSection < sections.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                পরবর্তী
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                অর্ডার জমা দিন
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;