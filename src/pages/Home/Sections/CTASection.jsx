// CTASection.jsx
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">আজই শুরু করুন অর্ডার ব্যবস্থাপনা</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          সহজ এবং কার্যকরী অর্ডার ব্যবস্থাপনা সিস্টেম দিয়ে আপনার ব্যবসাকে আরো সুসংগঠিত করুন
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 hover:bg-purple-100 font-bold py-3 px-8 rounded-full transition duration-300">
            ফ্রি অ্যাকাউন্ট তৈরি করুন
          </button>
          <button className="border border-white text-white hover:bg-purple-700 font-bold py-3 px-8 rounded-full transition duration-300">
            লাইভ ডেমো দেখুন
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;