// SecuritySection.jsx
import { FaShieldAlt, FaLock, FaDatabase } from 'react-icons/fa';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <FaShieldAlt className="text-green-500 mr-2" />,
      text: "ডাটা এনক্রিপশন"
    },
    {
      icon: <FaLock className="text-green-500 mr-2" />,
      text: "নিরাপদ লগইন ব্যবস্থা"
    },
    {
      icon: <FaDatabase className="text-green-500 mr-2" />,
      text: "নিয়মিত ডাটা ব্যাকআপ"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">আপনার তথ্য সুরক্ষিত</h2>
            <p className="text-gray-700 mb-4">
              আমাদের সিস্টেমে আপনার এবং আপনার গ্রাহকদের সকল তথ্য সর্বোচ্চ সুরক্ষা ব্যবস্থায় সংরক্ষণ করা হয়।
            </p>
            <ul className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.icon} {feature.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-2/5 bg-purple-100 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">শুরু করতে চান?</h3>
            <p className="mb-4">আমাদের টিম আপনাকে সিস্টেম ব্যবহার শেখাতে সাহায্য করবে</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
              ফ্রি ট্রেনিং নিন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;