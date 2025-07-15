import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Tldraw, useEditor, getSvgAsImage } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import Swal from 'sweetalert2';

const WhiteboardContent = React.forwardRef((props, ref) => {
  const editor = useEditor();
  React.useImperativeHandle(ref, () => ({ editor }));

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
});

const Whiteboard = React.forwardRef((props, ref) => (
  <div className="w-full h-full">
    <Tldraw>
      <WhiteboardContent ref={ref} />
    </Tldraw>
  </div>
));

const Measurement = () => {
  const initialFormState = {
    name: '',
    phone: '',
    lomba: '',
    body: '',
    komor: '',
    hip: '',
    put: '',
    haterLomba: '',
    haterMukh: '',
    nicherGher: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const whiteboardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.phone) {
      Swal.fire('ত্রুটি!', 'ফোন নাম্বার আবশ্যক।', 'error');
      return;
    }

    let whiteboardSvg = null;
    if (whiteboardRef.current && whiteboardRef.current.editor) {
      const editor = whiteboardRef.current.editor;
      if (editor.currentPageShapeIds) {
        const svg = await editor.getSvg(Array.from(editor.currentPageShapeIds));
        if (svg) {
          const image = await getSvgAsImage(svg, { type: 'png', quality: 1, scale: 1 });
          whiteboardSvg = URL.createObjectURL(new Blob([image], { type: 'image/png' }));
        }
      }
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: {
        name: formData.name || 'N/A',
        phone: formData.phone,
      },
      measurements: {
        lomba: formData.lomba ? `${formData.lomba}"` : 'N/A',
        body: formData.body ? `${formData.body}"` : 'N/A',
        komor: formData.komor ? `${formData.komor}"` : 'N/A',
        hip: formData.hip ? `${formData.hip}"` : 'N/A',
        put: formData.put ? `${formData.put}"` : 'N/A',
        haterLomba: formData.haterLomba ? `${formData.haterLomba}"` : 'N/A',
        haterMukh: formData.haterMukh ? `${formData.haterMukh}"` : 'N/A',
        nicherGher: formData.nicherGher ? `${formData.nicherGher}"` : 'N/A',
      },
      pricing: { total: 0, paid: 0, due: 0 },
      status: 'In Progress',
      orderDate: new Date().toISOString().split('T')[0],
      capturedImage: capturedImage,
      whiteboardSvg: whiteboardSvg,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    Swal.fire('সফল!', 'অর্ডার সফলভাবে সেভ হয়েছে।', 'success');
    setFormData(initialFormState);
    setCapturedImage(null);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch {
      Swal.fire('ক্যামেরা অ্যাক্সেস ত্রুটি!', 'অনুগ্রহ করে ব্রাউজার অনুমতি দিন।', 'error');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
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
      stopCamera();
    }
  };

  useEffect(() => () => stopCamera(), [stopCamera]);

  const inputFields = [
    { name: 'lomba', label: 'লম্বার মাপ (ইঞ্চি)' },
    { name: 'body', label: 'বডি মাপ (ইঞ্চি)' },
    { name: 'komor', label: 'কোমরের মাপ (ইঞ্চি)' },
    { name: 'hip', label: 'হিপের মাপ (ইঞ্চি)' },
    { name: 'put', label: 'পুট মাপ (ইঞ্চি)' },
    { name: 'haterLomba', label: 'হাতে লম্বা (ইঞ্চি)' },
    { name: 'haterMukh', label: 'হাতের মুখ (ইঞ্চি)' },
    { name: 'nicherGher', label: 'নিচের ঘের (ইঞ্চি)' },
    { name: 'name', label: 'গ্রাহকের নাম (ঐচ্ছিক)' },
    { name: 'phone', label: 'ফোন নাম্বার (আবশ্যক)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
            মাপ ও গ্রাহকের তথ্য
          </h2>
          <form className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl space-y-5">
            {inputFields.map(({ name, label }) => (
              <div key={name} className="relative">
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-slate-700/40 text-white rounded-lg px-4 pt-7 pb-3 border border-slate-600 focus:outline-none focus:border-purple-500 transition"
                />
                <label className="absolute left-4 top-1 text-base font-bold text-purple-300 scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-400 peer-focus:top-1 peer-focus:text-base peer-focus:text-purple-300 transition-all duration-200">
                  {label}
                </label>
              </div>
            ))}
            
            {/* Camera Section */}
            <div className="space-y-3">
              <label className="block text-base font-bold text-slate-300">ক্যামেরা থেকে ছবি</label>
              {!stream && !capturedImage && (
                <button type="button" onClick={startCamera} className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-white font-semibold py-2.5 rounded-lg">
                  ক্যামেরা চালু করুন
                </button>
              )}
              {stream && (
                <div className="space-y-3">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-60 rounded-lg object-cover bg-black" />
                  <div className="flex gap-3">
                    <button type="button" onClick={capturePhoto} className="flex-1 bg-pink-500 text-white font-semibold py-2.5 rounded-lg">ছবি তুলুন</button>
                    <button type="button" onClick={stopCamera} className="flex-1 bg-slate-600 text-white font-semibold py-2.5 rounded-lg">বন্ধ করুন</button>
                  </div>
                </div>
              )}
              {capturedImage && (
                <div className="mt-4">
                  <img src={capturedImage} alt="Captured" className="w-full h-auto rounded-lg border border-slate-600" />
                  <canvas ref={canvasRef} className="hidden" />
                  <button type="button" onClick={() => setCapturedImage(null)} className="w-full mt-2 bg-red-500 text-white font-semibold py-2 rounded-lg">মুছুন</button>
                </div>
              )}
            </div>

            <button type="button" onClick={handleSave} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-xl hover:scale-105 transition-transform">
              সেভ করুন
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 h-[500px] md:h-[600px] lg:h-[700px] bg-slate-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
          <Whiteboard ref={whiteboardRef} />
        </div>
      </div>
    </div>
  );
};

export default Measurement;
