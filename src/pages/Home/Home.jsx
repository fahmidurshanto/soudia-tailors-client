import CTASection from "./Sections/CTASection";
import FeaturesSection from "./Sections/FeaturesSection";
import HeroSection from "./Sections/HeroSection";
import HowItWorks from "./Sections/HowItWorks";
import SecuritySection from "./Sections/SecuritySection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <SecuritySection />
      <CTASection />
    </div>
  );
};

export default Home;