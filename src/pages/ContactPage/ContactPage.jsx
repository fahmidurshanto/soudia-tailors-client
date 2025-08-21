import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the store location
const storeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ContactPage = () => {
  // Coordinates for Joypurhat, Bangladesh
  const position = [25.10279483729949, 89.0257758976146];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-2">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-center text-gray-600 mb-8">
          যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করতে পারেন
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">
                দোকানের তথ্য
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ঠিকানা</h3>
                    <p className="text-gray-600">সৌদিয়া লেডিস টেইলার্স</p>
                    <p className="text-gray-600">নিউ মার্কেট, জয়পুরহাট সদর</p>
                    <p className="text-gray-600">জয়পুরহাট ৫৯০০</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaPhone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ফোন নম্বর</h3>
                    <p className="text-gray-600">+৮৮ ০১৭১২৩৪৫৬৭৮</p>
                    <p className="text-gray-600">+৮৮ ০১৯৮৭৬৫৪৩২১</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ইমেইল</h3>
                    <p className="text-gray-600">info@borkhabd.com</p>
                    <p className="text-gray-600">orders@borkhabd.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaClock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">খোলার সময়</h3>
                    <p className="text-gray-600">
                      শনিবার - বৃহস্পতিবার: সকাল ১০টা - রাত ৯টা
                    </p>
                    <p className="text-gray-600">শুক্রবার: বন্ধ</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-4">
                  সোশ্যাল মিডিয়া
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-pink-100 text-pink-600 p-3 rounded-full hover:bg-pink-200 transition"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-200 transition"
                  >
                    <FaWhatsapp className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">
                বার্তা পাঠান
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">আপনার নাম</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">ইমেইল</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার ইমেইল লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">ফোন নম্বর</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="আপনার ফোন নম্বর লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">বার্তা</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows="5"
                    placeholder="আপনার বার্তা লিখুন..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  বার্তা পাঠান
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">
              আমাদের অবস্থান
            </h2>
            <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-200">
              <MapContainer 
                center={position} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={storeIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong>সৌদিয়া লেডিস টেইলার্স</strong><br />
                      নিউ মার্কেট, জয়পুরহাট সদর<br />
                      জয়পুরহাট ৫৯০০
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="mt-4 text-center">
              <a 
                href={`https://www.google.com/maps/dir//${position[0]},${position[1]}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <FaMapMarkerAlt className="mr-2" />
                গুগল ম্যাপে দিকনির্দেশনা পান
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">
              সচরাচর জিজ্ঞাসিত প্রশ্ন!
            </h2>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">
                  অর্ডার করতে কতদিন সময় লাগে?
                </h3>
                <p className="text-gray-600 mt-2">
                  সাধারণত অর্ডার নেওয়ার পর ৭-১০ কর্মদিবসের মধ্যে ডেলিভারি করা
                  হয়। জরুরি অর্ডারের জন্য আলাদাভাবে জানাতে পারেন।
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">
                  মাপ ভুল হলে কি করা যাবে?
                </h3>
                <p className="text-gray-600 mt-2">
                  মাপ ভুল হলে ২৪ ঘন্টার মধ্যে আমাদের জানালে আমরা পুনরায় মাপ
                  নেওয়ার ব্যবস্থা করব। ডেলিভারির পর পরিবর্তনের সুযোগ থাকবে না।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;