import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await new Promise((res) => setTimeout(res, 1000)); // simulate API
      Swal.fire({
        title: 'সফল!',
        text: 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে।',
        icon: 'success',
        confirmButtonText: 'ঠিক আছে',
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      Swal.fire({
        title: 'ত্রুটি!',
        text: 'বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        icon: 'error',
        confirmButtonText: 'ঠিক আছে',
      });
    }
  };

  const inputFields = [
    { id: 'name', type: 'text', label: 'নাম', required: true },
    { id: 'phone', type: 'tel', label: 'ফোন নাম্বার', required: true },
    { id: 'email', type: 'email', label: 'ইমেইল', required: true },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-lg animate__animated animate__fadeIn">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 text-center">
          যোগাযোগ করুন
        </h2>

        {/* Glass-morphic card */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 shadow-2xl space-y-6"
        >
          {inputFields.map(({ id, type, label }, idx) => (
            <div
              key={id}
              className={`animate__animated animate__fadeInUp animate__delay-${idx + 1}s`}
            >
              <label
                htmlFor={id}
                className="block text-lg font-bold text-slate-200 mb-2"
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                required
                className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-3
                           text-white placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                           transition"
              />
            </div>
          ))}

          {/* Message textarea */}
          <div className="animate__animated animate__fadeInUp animate__delay-4s">
            <label
              htmlFor="message"
              className="block text-lg font-bold text-slate-200 mb-2"
            >
              বার্তার ঘর
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-3
                         text-white placeholder-slate-400 resize-none
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                         transition"
            />
          </div>

          {/* Submit button */}
          <div className="animate__animated animate__fadeInUp animate__delay-5s">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white font-bold py-3 rounded-lg shadow-xl
                         hover:scale-105 hover:shadow-purple-500/50
                         transition-transform duration-300"
            >
              পাঠান
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;