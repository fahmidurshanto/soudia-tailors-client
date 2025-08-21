const CustomerInfoSection = ({ customerData, setCustomerData }) => {
  const handleInputChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">গ্রাহকের তথ্য</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">গ্রাহকের নাম</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="গ্রাহকের নাম লিখুন"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">ফোন নম্বর</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
              +88
            </span>
            <input
              type="tel"
              name="phone"
              value={customerData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="01XXXXXXXXX"
              pattern="[0-9]{11}"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2">ঠিকানা</label>
        <textarea
          name="address"
          value={customerData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="3"
          placeholder="গ্রাহকের সম্পূর্ণ ঠিকানা লিখুন"
        ></textarea>
      </div>
    </div>
  );
};

export default CustomerInfoSection;