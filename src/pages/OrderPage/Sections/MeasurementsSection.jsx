import React from 'react';
import DigitalSketchpad from '../../../components/DigitalSketchpad';

const MeasurementsSection = ({ measurements, setMeasurements }) => {
  const handleInputChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value
    });
  };

  const handleSketchChange = (sketchData) => {
    setMeasurements({
      ...measurements,
      sketchData: sketchData
    });
  };

  return (
    <div className="space-y-6 animate__animated animate__fadeInLeft">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">মাপ</h2>
        <p className="text-gray-600">গ্রাহকের মাপ সংখ্যা এবং ডিজিটাল স্কেচের মাধ্যমে লিপিবদ্ধ করুন</p>
      </div>
      
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

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-4 text-sm text-gray-500 font-medium">ডিজিটাল স্কেচ</div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <DigitalSketchpad 
        onSketchChange={handleSketchChange}
        initialSketch={measurements.sketchData?.paths}
      />
    </div>
  );
};

export default MeasurementsSection;