import React, { useRef, useState } from 'react';
import { FaUpload, FaTimes, FaFile, FaImage, FaFilePdf, FaTrash } from 'react-icons/fa';

const FileUpload = ({ onFileUpload, maxFiles = 5, acceptedTypes = ['image/*', 'application/pdf'] }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    // Validate file types
    const validFiles = fileArray.filter(file => {
      return acceptedTypes.some(type => {
        if (type === 'image/*') return file.type.startsWith('image/');
        if (type === 'application/pdf') return file.type === 'application/pdf';
        return file.type === type;
      });
    });

    if (validFiles.length !== fileArray.length) {
      setError('কিছু ফাইল সাপোর্টেড নয়। শুধুমাত্র ছবি এবং PDF ফাইল আপলোড করুন।');
      return;
    }

    // Validate file size (5MB max per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = validFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError('কিছু ফাইল খুব বড়। প্রতিটি ফাইল ৫MB এর কম হতে হবে।');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Process files and convert to base64 for preview
      const processedFiles = await Promise.all(
        validFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                data: e.target.result,
                lastModified: file.lastModified
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      if (onFileUpload) {
        await onFileUpload(processedFiles);
      }
    } catch (err) {
      console.error('File upload error:', err);
      setError('ফাইল আপলোড করতে সমস্যা হয়েছে।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">সমস্যা</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">ফাইল আপলোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUpload className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">ফাইল আপলোড করুন</h3>
            <p className="text-gray-600 mb-4">
              ফাইল এখানে ড্র্যাগ করুন অথবা ক্লিক করে নির্বাচন করুন
            </p>
            <button
              onClick={openFileDialog}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              ফাইল নির্বাচন করুন
            </button>
            <p className="text-sm text-gray-500 mt-2">
              সর্বোচ্চ {maxFiles}টি ফাইল • প্রতিটি ৫MB এর কম • JPG, PNG, PDF
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">নির্দেশনা:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• ছবির ফাইল: JPG, PNG, GIF ফরম্যাট সাপোর্টেড</li>
          <li>• ডকুমেন্ট: PDF ফাইল সাপোর্টেড</li>
          <li>• প্রতিটি ফাইল ৫MB এর কম হতে হবে</li>
          <li>• একসাথে সর্বোচ্চ {maxFiles}টি ফাইল আপলোড করতে পারবেন</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;