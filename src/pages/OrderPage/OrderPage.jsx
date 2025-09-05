import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerInfoSection from './Sections/CustomerInfoSection';
import MeasurementsSection from './Sections/MeasurementsSection';
import DesignReferenceSection from './Sections/DesignReferenceSection';
import ProgressIndicator from './Sections/ProgressIndicator';
import { 
  setCustomerData, 
  setMeasurements, 
  setDesignReferences,
  resetOrder,
  submitOrder,
  updateOrder
} from '../../features/order/orderSlice';

const OrderPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { customerData, measurements, designReferences, orders } = useSelector((state) => state.order);

  // Check if we're in edit mode
  useEffect(() => {
    // If we're coming from the admin dashboard with an order to edit
    if (location.state && location.state.orderId) {
      setEditingOrderId(location.state.orderId);
    }
  }, [location]);

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
      // Format the data to match backend expectations
      const orderData = {
        customerName: customerData.name,
        phoneNumber: customerData.phone,
        address: customerData.address,
        totalAmount: customerData.totalAmount || 0,
        measurementSketch: measurements.sketchData?.imageData || '', // Include canvas sketch data
        measurements: {
          length: measurements.length || '',
          body: measurements.body || '',
          waist: measurements.waist || '',
          hip: measurements.hip || '',
          leg: measurements.leg || '',
          armLength: measurements.armLength || '',
          armWidth: measurements.armWidth || '',
          bottomRound: measurements.bottomRound || ''
        },
        sketchData: measurements.sketchData, // Include full sketch data object
        designReference: [
          ...designReferences.capturedImages.map(img => img.url),
          ...designReferences.uploadedFiles.map(file => file.url)
        ].filter(url => url), // Remove any null/undefined URLs
        specialNotes: designReferences.designNotes
      };
      
      console.log('Submitting order data:', orderData); // Debug log
      
      let resultAction;
      if (editingOrderId) {
        // Update existing order
        resultAction = await dispatch(updateOrder({ orderId: editingOrderId, orderData }));
      } else {
        // Create new order
        resultAction = await dispatch(submitOrder(orderData));
      }
      
      if ((editingOrderId ? updateOrder.fulfilled.match(resultAction) : submitOrder.fulfilled.match(resultAction))) {
        alert(editingOrderId ? 'অর্ডারটি সফলভাবে আপডেট হয়েছে!' : 'অর্ডারটি সফলভাবে জমা দেওয়া হয়েছে!');
        dispatch(resetOrder());
        setActiveSection(0);
        setEditingOrderId(null);
        // Navigate back to admin dashboard
        navigate('/admin/dashboard');
      } else {
        throw new Error(resultAction.payload || (editingOrderId ? 'অর্ডার আপডেট করতে সমস্যা হয়েছে' : 'অর্ডার জমা দিতে সমস্যা হয়েছে'));
      }
    } catch (error) {
      alert(error.message || (editingOrderId ? 'অর্ডার আপডেট করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।' : 'অর্ডার জমা দিতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।'));
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-center text-purple-900 mb-2">
              {editingOrderId ? 'অর্ডার সম্পাদনা' : 'নতুন অর্ডার'}
            </h1>
            <p className="text-center text-gray-600">
              {editingOrderId ? 'অর্ডারের তথ্য সম্পাদনা করুন' : 'গ্রাহকের তথ্য, মাপ এবং ডিজাইন রেফারেন্স যোগ করুন'}
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(resetOrder());
              navigate('/admin/dashboard');
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ড্যাশবোর্ডে ফিরে যান
          </button>
        </div>

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
                {isSubmitting ? (editingOrderId ? 'আপডেট হচ্ছে...' : 'জমা হচ্ছে...') : (editingOrderId ? 'অর্ডার আপডেট করুন' : 'অর্ডার জমা দিন')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;