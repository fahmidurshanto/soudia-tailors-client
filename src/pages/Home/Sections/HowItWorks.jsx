// HowItWorks.jsx
const HowItWorks = () => {
  const steps = [
    {
      number: "১",
      title: "গ্রাহকের তথ্য নিন",
      description: "গ্রাহকের নাম এবং ফোন নম্বর লিখুন"
    },
    {
      number: "২",
      title: "মাপ নিন",
      description: "ডিজিটাল স্কেচপ্যাডে প্রয়োজনীয় মাপ চিহ্নিত করুন"
    },
    {
      number: "৩",
      title: "ডিজাইন যুক্ত করুন",
      description: "ক্যামেরা বা ফাইল আপলোডের মাধ্যমে ডিজাইন সংযুক্ত করুন"
    },
    {
      number: "৪",
      title: "অর্ডার সম্পূর্ণ করুন",
      description: "অর্ডার সাবমিট করুন এবং কনফার্মেশন পান"
    }
  ];

  return (
    <section className="py-16 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">কিভাবে অর্ডার নেবেন?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white text-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-purple-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;