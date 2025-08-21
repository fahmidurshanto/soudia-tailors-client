import { FaUser, FaRulerCombined, FaCamera } from 'react-icons/fa';

const ProgressIndicator = ({ sections, activeSection }) => {
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'FaUser': return <FaUser />;
      case 'FaRulerCombined': return <FaRulerCombined />;
      case 'FaCamera': return <FaCamera />;
      default: return <FaUser />;
    }
  };

  return (
    <div className="mb-10" data-aos="fade-down">
      <div className="flex justify-between items-center mb-4">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${index === activeSection ? 'bg-purple-600 text-white' : index < activeSection ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {getIconComponent(section.icon)}
            </div>
            <span className="mt-2 text-sm font-medium">{section.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(activeSection + 1) * 33.33}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;