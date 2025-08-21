// FeaturesSection.jsx
import { FaRulerCombined, FaCamera, FaUsers, FaFileAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaRulerCombined className="h-8 w-8 text-purple-600" />,
      title: "ডিজিটাল মাপ নেওয়া",
      description: "ডিজিটাল স্কেচপ্যাডের মাধ্যমে নিখুত মাপ রেকর্ড করুন"
    },
    {
      icon: <FaCamera className="h-8 w-8 text-purple-600" />,
      title: "ডিজাইন রেফারেন্স",
      description: "ক্যামেরা বা ফাইল আপলোডের মাধ্যমে ডিজাইন সংগ্রহ করুন"
    },
    {
      icon: <FaUsers className="h-8 w-8 text-purple-600" />,
      title: "গ্রাহক ব্যবস্থাপনা",
      description: "গ্রাহকের তথ্য সহজেই সংরক্ষণ এবং ব্যবস্থাপনা করুন"
    },
    {
      icon: <FaFileAlt className="h-8 w-8 text-purple-600" />,
      title: "অর্ডার ট্র্যাকিং",
      description: "সমস্ত অর্ডারের অবস্থান ট্র্যাক করুন এবং ব্যবস্থাপনা করুন"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
          সিস্টেমের বিশেষ সুবিধাসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-purple-50 hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;