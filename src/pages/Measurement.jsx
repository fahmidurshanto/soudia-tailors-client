import React, { useState, useCallback } from 'react';
import { Tldraw, useEditor, getSvgAsImage } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import Swal from 'sweetalert2';

/* ---------- Whiteboard helpers ---------- */
const WhiteboardContent = () => {
  const editor = useEditor();
  const handleExport = async () => {
    if (!editor) return;
    const { isConfirmed } = await Swal.fire({
      title: 'এক্সপোর্ট করুন',
      text: 'আপনি কিভাবে এক্সপোর্ট করতে চান?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ছবি (PNG)',
      cancelButtonText: 'JSON',
    });

    if (isConfirmed) {
      try {
        const svg = await editor.getSvg(Array.from(editor.currentPageShapeIds));
        if (!svg) throw new Error('Could not get SVG');
        const image = await getSvgAsImage(svg, { type: 'png', quality: 1, scale: 2 });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([image], { type: 'image/png' }));
        a.download = 'canvas.png';
        a.click();
      } catch {
        Swal.fire('ত্রুটি!', 'ছবি এক্সপোর্ট করতে সমস্যা হয়েছে।', 'error');
      }
    } else {
      try {
        const data = editor.store.getSnapshot();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
        a.download = 'canvas.json';
        a.click();
      } catch {
        Swal.fire('ত্রুটি!', 'JSON এক্সপোর্ট করতে সমস্যা হয়েছে।', 'error');
      }
    }
  };

  return (
    <button
      onClick={handleExport}
      className="absolute bottom-5 right-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg
                 hover:scale-105 transition-transform duration-300"
    >
      এক্সপোর্ট করুন
    </button>
  );
};

const Whiteboard = () => (
  <div className="w-full h-full">
    <Tldraw>
      <WhiteboardContent />
    </Tldraw>
  </div>
);

/* ---------- Measurement form ---------- */
const Measurement = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [sleeve, setSleeve] = useState('');
  const [pants, setPants] = useState('');
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch {
      Swal.fire({
        title: 'ক্যামেরা অ্যাক্সেস ত্রুটি!',
        text: 'অনুগ্রহ করে ব্রাউজার অনুমতি দিন।',
        icon: 'error',
        confirmButtonText: 'ঠিক আছে',
      });
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
      setCapturedImage(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(v, 0, 0);
      setCapturedImage(c.toDataURL('image/png'));
    }
  };

  const handleSave = () => {
    if (!phone) {
      Swal.fire('ত্রুটি!', 'ফোন নাম্বার আবশ্যক।', 'error');
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: {
        name: name || 'N/A',
        phone,
      },
      measurements: {
        chest: chest ? `${chest}"` : 'N/A',
        waist: waist ? `${waist}"` : 'N/A',
        sleeve: sleeve ? `${sleeve}"` : 'N/A',
        pants: pants ? `${pants}"` : 'N/A',
      },
      pricing: {
        total: 0, // Placeholder
        paid: 0,
        due: 0,
      },
      status: 'In Progress',
      orderDate: new Date().toISOString().split('T')[0],
      // capturedImage can be added here if needed
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    Swal.fire('সফল!', 'অর্ডার সফলভাবে সেভ হয়েছে।', 'success');

    // Clear form
    setName('');
    setPhone('');
    setChest('');
    setWaist('');
    setSleeve('');
    setPants('');
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-1 animate__animated animate__fadeInUp">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
            মাপ ও গ্রাহকের তথ্য
          </h2>

          <form className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl space-y-5">
            {/* Larger floating-label inputs */}
            {[
              { value: chest, set: setChest, label: 'বুকের মাপ (ইঞ্চি)' },
              { value: waist, set: setWaist, label: 'কোমরের মাপ (ইঞ্চি)' },
              { value: sleeve, set: setSleeve, label: 'হাতার দৈর্ঘ্য (ইঞ্চি)' },
              { value: pants, set: setPants, label: 'প্যান্টের মাপ (ইঞ্চি)' },
              { value: name, set: setName, label: 'গ্রাহকের নাম (ঐচ্ছিক)' },
              { value: phone, set: setPhone, label: 'ফোন নাম্বার (আবশ্যক)' },
            ].map(({ value, set, label }) => (
              <div key={label} className="relative">
                <input
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-slate-700/40 text-white rounded-lg px-4 pt-7 pb-3
                             border border-slate-600 focus:outline-none focus:border-purple-500
                             focus:ring-2 focus:ring-purple-500 transition"
                />
                <label className="absolute left-4 top-1 text-base font-bold text-purple-300 scale-75
                                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg
                                 peer-placeholder-shown:text-slate-400
                                 peer-focus:top-1 peer-focus:text-base peer-focus:text-purple-300
                                 transition-all duration-200">
                  {label}
                </label>
              </div>
            ))}

            {/* File upload */}
            <div>
              <label className="block text-base font-bold text-slate-300 mb-1">ছবি আপলোড (ঐচ্ছিক)</label>
              <input
                type="file"
                accept="image/*"
                capture
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-purple-500 file:text-white
                           hover:file:bg-purple-600 transition"
              />
            </div>

            {/* Camera section */}
            <div>
              <label className="block text-base font-bold text-slate-300 mb-2">ক্যামেরা থেকে ছবি</label>
              {!stream ? (
                <button
                  type="button"
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-green-400 to-cyan-500
                             text-white font-semibold py-2.5 rounded-lg shadow-md
                             hover:scale-105 transition-transform duration-300"
                >
                  ক্যামেরা চালু করুন
                </button>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-60 rounded-lg object-cover bg-black mb-2"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-red-500
                                 text-white font-semibold py-2.5 rounded-lg shadow-md
                                 hover:scale-105 transition-transform duration-300"
                    >
                      ছবি তুলুন
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700
                                 text-white font-semibold py-2.5 rounded-lg shadow-md
                                 hover:scale-105 transition-transform duration-300"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </>
              )}
              {capturedImage && (
                <div className="mt-4">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-auto rounded-lg border border-slate-600"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}
            </div>

            {/* Save button */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white font-bold py-3 rounded-lg shadow-xl
                         hover:scale-105 transition-transform duration-300"
            >
              সেভ করুন
            </button>
          </form>
        </div>

        {/* Whiteboard */}
        <div
          className="lg:col-span-2 h-[500px] md:h-[600px] lg:h-[700px]
                     bg-slate-800/40 backdrop-blur-md rounded-xl shadow-2xl
                     animate__animated animate__fadeInRight overflow-hidden"
        >
          <Whiteboard />
        </div>
      </div>
    </div>
  );
};

export default Measurement;