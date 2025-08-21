import React from 'react';

const MeasurementsSection = ({ measurements, setMeasurements }) => {
  const handleInputChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 animate__animated animate__fadeInLeft">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">মাপ</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">লম্বা</label>
          <div className="flex">
            <input
              type="number"
              name="length"
              value={measurements.length}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">বডি</label>
          <div className="flex">
            <input
              type="number"
              name="body"
              value={measurements.body}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">কোমরের</label>
          <div className="flex">
            <input
              type="number"
              name="waist"
              value={measurements.waist}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">হিপের</label>
          <div className="flex">
            <input
              type="number"
              name="hip"
              value={measurements.hip}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">পুট</label>
          <div className="flex">
            <input
              type="number"
              name="leg"
              value={measurements.leg}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">হাতে লম্বা</label>
          <div className="flex">
            <input
              type="number"
              name="armLength"
              value={measurements.armLength}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">হাতের মুখ</label>
          <div className="flex">
            <input
              type="number"
              name="armWidth"
              value={measurements.armWidth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">নিচের ঘের</label>
          <div className="flex">
            <input
              type="number"
              name="bottomRound"
              value={measurements.bottomRound}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="সেন্টিমিটার"
            />
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 rounded-r-lg">সেমি</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2">অতিরিক্ত নোট</label>
        <textarea
          name="additionalNotes"
          value={measurements.additionalNotes}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="3"
          placeholder="যেকোনো বিশেষ নির্দেশিকা বা অতিরিক্ত নোট লিখুন"
        ></textarea>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">স্কেচ প্যাড</h3>
        <p className="text-gray-600 mb-4">গ্রাহকের মাপ চিত্রের মাধ্যমে নির্দেশ করুন</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center">
          <p className="text-gray-500">স্কেচ প্যাড এখানে লোড হবে</p>
        </div>
        <div className="flex mt-4 space-x-2">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">পেন</button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">ইরেজার</button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">ক্লিয়ার</button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsSection;