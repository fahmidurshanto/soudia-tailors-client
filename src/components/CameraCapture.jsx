import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FaCamera, FaTimes, FaRedo, FaCheck, FaInfoCircle, FaCloudUploadAlt } from 'react-icons/fa';
import { uploadToCloudinary } from '../services/cloudinaryService';

// Webcam component will be loaded dynamically
let WebcamComponent = null;

const CameraCapture = ({ onCapture, onClose, isOpen }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
  const [webcamLoaded, setWebcamLoaded] = useState(false);

  // Dynamically load Webcam component
  useEffect(() => {
    const loadWebcam = async () => {
      try {
        const webcamModule = await import('react-webcam');
        WebcamComponent = webcamModule.default;
        setWebcamLoaded(true);
      } catch (error) {
        console.error('Failed to load react-webcam:', error);
        setError('ক্যামেরা লাইব্রেরি লোড করতে সমস্যা হয়েছে।');
      }
    };
    
    if (!WebcamComponent) {
      loadWebcam();
    }
  }, []);

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    facingMode: facingMode
  };

  const capture = useCallback(() => {
    try {
      setError(null);
      if (!webcamRef.current || !WebcamComponent) {
        setError('ক্যামেরা অনুপস্থিত। দয়া করে পেজ রিলোড করুন।');
        return;
      }
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      } else {
        setError('ছবি তুলতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('Capture error:', err);
      setError('ক্যামেরা অ্যাক্সেস করতে সমস্যা হয়েছে।');
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
    setError(null);
  };

  const confirmCapture = async () => {
    if (capturedImage && onCapture) {
      try {
        setIsLoading(true);
        setError(null);
        
        // Convert base64 to blob for Cloudinary upload
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(file, {
          folder: 'borkha-designs/camera-captures',
          quality: 'auto',
          format: 'auto'
        });
        
        if (uploadResult.success) {
          // Pass Cloudinary data to parent
          const cloudinaryData = {
            id: uploadResult.data.id,
            url: uploadResult.data.url,
            thumbnailUrl: uploadResult.data.thumbnailUrl,
            cloudinaryId: uploadResult.data.id,
            type: 'camera',
            format: uploadResult.data.format,
            width: uploadResult.data.width,
            height: uploadResult.data.height,
            uploadedAt: uploadResult.data.createdAt
          };
          
          await onCapture(cloudinaryData);
          setCapturedImage(null);
          onClose();
        } else {
          setError(uploadResult.error || 'ছবি আপলোড করতে সমস্যা হয়েছে।');
        }
      } catch (err) {
        console.error('Camera upload error:', err);
        setError('ছবি আপলোড করতে সমস্যা হয়েছে।');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setCapturedImage(null);
    setError(null);
  };

  const handleUserMediaError = (error) => {
    console.error('Webcam error:', error);
    setError('ক্যামেরা চালু করতে সমস্যা হয়েছে। ব্রাউজারে ক্যামেরার অনুমতি দিন।');
  };

  if (!isOpen) return null;

  // Fallback if Webcam is not available
  if (!WebcamComponent && !webcamLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">ক্যামেরা অনুপস্থিত</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <div className="text-center py-8">
            <FaCamera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">ক্যামেরা ফিচার লোড করতে সমস্যা হয়েছে।</p>
            <p className="text-sm text-gray-500 mb-4">দয়া করে ফাইল আপলোড ব্যবহার করুন।</p>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" data-aos="fade-in">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">ডিজাইনের ছবি তুলুন</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <div className="flex">
              <FaInfoCircle className="text-red-500 mr-2 mt-0.5" />
              <div>
                <p className="font-bold">সমস্যা</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Camera/Preview Area */}
        <div className="p-4">
          <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {capturedImage ? (
              // Preview captured image
              <img
                src={capturedImage}
                alt="Captured design"
                className="w-full h-full object-cover"
              />
            ) : (
              // Live camera feed
              WebcamComponent && webcamLoaded ? (
                <WebcamComponent
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={0.8}
                  videoConstraints={videoConstraints}
                  onUserMediaError={handleUserMediaError}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <FaCamera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">ক্যামেরা লোড হচ্ছে...</p>
                  </div>
                </div>
              )
            )}

            {/* Camera overlay guide */}
            {!capturedImage && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg opacity-30"></div>
                <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  ডিজাইনটি ফ্রেমের মধ্যে রাখুন
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                    <FaCloudUploadAlt className="absolute inset-0 m-auto h-3 w-3 text-purple-600" />
                  </div>
                  <span className="text-gray-700">ক্লাউডিনারিতে আপলোড হচ্ছে...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t bg-gray-50">
          {capturedImage ? (
            // Preview controls
            <div className="flex justify-center space-x-4">
              <button
                onClick={retake}
                disabled={isLoading}
                className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaRedo className="mr-2" />
                আবার তুলুন
              </button>
              <button
                onClick={confirmCapture}
                disabled={isLoading}
                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck className="mr-2" />
                {isLoading ? 'সেভ হচ্ছে...' : 'ছবি সেভ করুন'}
              </button>
            </div>
          ) : (
            // Camera controls
            <div className="flex flex-col sm:flex-row justify-between items-center camera-controls gap-4">
              <button
                onClick={switchCamera}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors camera-button"
              >
                <FaRedo className="mr-2" />
                ক্যামেরা সুইচ
              </button>

              <button
                onClick={capture}
                className="flex items-center px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg camera-button"
              >
                <FaCamera className="mr-2" />
                ছবি তুলুন
              </button>

              <div className="text-sm text-gray-600 text-center sm:text-right">
                <p>টিপস: ভালো আলোতে ছবি তুলুন</p>
                <p>ডিজাইনটি স্পষ্ট করে দেখান</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">নির্দেশনা:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• ভালো আলোতে ছবি তুলুন যাতে ডিজাইন স্পষ্ট দেখা যায়</li>
              <li>• ডিজাইনটি সম্পূর্ণভাবে ফ্রেমের মধ্যে রাখুন</li>
              <li>• একাধিক অ্যাঙ্গেল থেকে ছবি তুলতে পারেন</li>
              <li>• মোবাইলে পিছনের ক্যামেরা ব্যবহার করুন ভালো কোয়ালিটির জন্য</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .camera-controls {
            flex-direction: column;
            gap: 0.75rem;
          }
          .camera-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CameraCapture;