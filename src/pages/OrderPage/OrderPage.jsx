import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomerInfoSection from './Sections/CustomerInfoSection';
import MeasurementsSection from './Sections/MeasurementsSection';
import DesignReferenceSection from './Sections/DesignReferenceSection';
import ProgressIndicator from './Sections/ProgressIndicator';
import { 
  setCustomerData, 
  setMeasurements, 
  setDesignReferences,
  resetOrder,
  submitOrder 
} from '../../features/order/orderSlice';

const OrderPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const { customerData, measurements, designReferences } = useSelector((state) => state.order);

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
    // Validate phone number before proceeding
    if (activeSection === 0 && !customerData.phone) {
      alert('ফোন নম্বরটি অবশ্যই প্রয়োজন');
      return;
    }
    
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Dispatch the async action
      const resultAction = await dispatch(submitOrder({ 
        customerData, 
        measurements, 
        designReferences 
      }));
      
      if (submitOrder.fulfilled.match(resultAction)) {
        alert('অর্ডারটি সফলভাবে জমা দেওয়া হয়েছে!');
        dispatch(resetOrder());
        setActiveSection(0);
      } else {
        throw new Error(resultAction.payload || 'অর্ডার জমা দিতে সমস্যা হয়েছে');
      }
    } catch (error) {
      alert(error.message || 'অর্ডার জমা দিতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              setCustomerData={(data) => dispatch(setCustomerData(data))} 
            />
          )}
          
          {activeSection === 1 && (
            <MeasurementsSection 
              measurements={measurements} 
              setMeasurements={(data) => dispatch(setMeasurements(data))} 
            />
          )}
          
          {activeSection === 2 && (
            <DesignReferenceSection 
              designReferences={designReferences}
              setDesignReferences={(data) => dispatch(setDesignReferences(data))}
            />
          )}

          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrevious}
              disabled={activeSection === 0 || isSubmitting}
              className={`flex items-center px-5 py-2 rounded-lg ${activeSection === 0 || isSubmitting ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              পূর্ববর্তী
            </button>
            
            {activeSection < sections.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300"
              >
                পরবর্তী
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300"
              >
                {isSubmitting ? 'জমা হচ্ছে...' : 'অর্ডার জমা দিন'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;