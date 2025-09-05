import React, { useState } from 'react';
import { FaCamera, FaUpload, FaTimes, FaEye, FaTrash } from 'react-icons/fa';
import CameraCapture from '../../../components/CameraCapture';
import FileUpload from '../../../components/FileUpload';

const DesignReferenceSection = ({ designReferences, setDesignReferences }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraCapture = async (cloudinaryData) => {
    try {
      setIsLoading(true);
      const newImage = {
        id: cloudinaryData.id,
        url: cloudinaryData.url,
        thumbnailUrl: cloudinaryData.thumbnailUrl,
        cloudinaryId: cloudinaryData.cloudinaryId,
        type: 'camera',
        format: cloudinaryData.format,
        width: cloudinaryData.width,
        height: cloudinaryData.height,
        timestamp: cloudinaryData.uploadedAt || new Date().toISOString()
      };
      
      const updatedImages = [...designReferences.capturedImages, newImage];
      setDesignReferences({
        ...designReferences,
        capturedImages: updatedImages
      });
    } catch (error) {
      console.error('Error saving captured image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (cloudinaryFiles) => {
    try {
      setIsLoading(true);
      const newFiles = cloudinaryFiles.map(file => ({
        id: file.id,
        name: file.name || file.id.split('/').pop(),
        url: file.url,
        thumbnailUrl: file.thumbnailUrl,
        cloudinaryId: file.cloudinaryId,
        type: 'upload',
        format: file.format,
        width: file.width,
        height: file.height,
        size: file.size,
        timestamp: file.uploadedAt || new Date().toISOString()
      }));
      
      const updatedFiles = [...designReferences.uploadedFiles, ...newFiles];
      setDesignReferences({
        ...designReferences,
        uploadedFiles: updatedFiles
      });
    } catch (error) {
      console.error('Error saving uploaded files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDesignNotesChange = (e) => {
    setDesignReferences({
      ...designReferences,
      designNotes: e.target.value
    });
  };

  const removeImage = (imageId, type) => {
    if (type === 'camera') {
      const updatedImages = designReferences.capturedImages.filter(img => img.id !== imageId);
      setDesignReferences({
        ...designReferences,
        capturedImages: updatedImages
      });
    } else {
      const updatedFiles = designReferences.uploadedFiles.filter(file => file.id !== imageId);
      setDesignReferences({
        ...designReferences,
        uploadedFiles: updatedFiles
      });
    }
  };

  const allImages = [
    ...designReferences.capturedImages,
    ...designReferences.uploadedFiles
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  return (
    <div className="space-y-6 animate__animated animate__fadeInLeft">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">ডিজাইন রেফারেন্স</h2>
        <p className="text-gray-600">গ্রাহকের পছন্দের ডিজাইনের ছবি বা ফাইল যুক্ত করুন</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCamera className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">ক্যামেরা থেকে ছবি তুলুন</h3>
          <p className="text-gray-600 mb-4">সরাসরি ক্যামেরা ব্যবহার করে ডিজাইনের ছবি তুলুন</p>
          <button 
            onClick={() => setShowCamera(true)}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'লোড হচ্ছে...' : 'ক্যামেরা খুলুন'}
          </button>
          {designReferences.capturedImages.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {designReferences.capturedImages.length}টি ছবি তোলা হয়েছে
            </p>
          )}
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUpload className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">ফাইল আপলোড করুন</h3>
            <p className="text-gray-600 mb-4">আপনার ডিভাইস থেকে ছবি বা ডিজাইন ফাইল আপলোড করুন</p>
          </div>
          <FileUpload 
            onFileUpload={handleFileUpload}
            maxFiles={5}
            acceptedTypes={['image/*', 'application/pdf']}
          />
          {designReferences.uploadedFiles.length > 0 && (
            <p className="text-sm text-green-600 mt-2 text-center">
              {designReferences.uploadedFiles.length}টি ফাইল আপলোড হয়েছে
            </p>
          )}
        </div>
      </div>
      
      
      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
            আপলোড করা ফাইলসমূহ ({allImages.length})
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              ক্লাউডিনারি স্টোরেজ
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((item) => (
              <div 
                key={item.id} 
                className="relative group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.url ? (
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={`Design reference - ${item.name || item.id}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to main URL if thumbnail fails
                        if (e.target.src !== item.url) {
                          e.target.src = item.url;
                        }
                      }}
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FaUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-600 truncate">{item.name || 'ফাইল'}</p>
                      {item.size && (
                        <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(item);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      title="প্রিভিউ দেখুন"
                    >
                      <FaEye className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(item.id, item.type);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      title="মুছে ফেলুন"
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </div>
                
                {/* Type indicator */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white shadow-lg ${
                    item.type === 'camera' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {item.type === 'camera' ? 'ক্যামেরা' : 'আপলোড'}
                  </span>
                </div>
                
                {/* Loading overlay for new uploads */}
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto mb-2"></div>
                      <p className="text-xs text-gray-600">প্রসেস হচ্ছে...</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {allImages.length === 0 && (
        <div className="border border-gray-200 rounded-lg p-8 text-center">
          <FaUpload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">কোন ফাইল আপলোড করা হয়নি</p>
          <p className="text-sm text-gray-400 mt-1">ক্যামেরা বা ফাইল আপলোড ব্যবহার করে ডিজাইন যুক্ত করুন</p>
        </div>
      )}
      
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">ডিজাইন সম্পর্কে নির্দেশিকা</h3>
        <textarea
          value={designReferences.designNotes}
          onChange={handleDesignNotesChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="3"
          placeholder="ডিজাইন সম্পর্কে যেকোনো বিশেষ নির্দেশিকা লিখুন"
        ></textarea>
      </div>

      {/* Camera Modal */}
      <CameraCapture
        isOpen={showCamera}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="font-semibold text-lg">ডিজাইন প্রিভিউ</h3>
                  <p className="text-sm text-gray-600">
                    {selectedImage.name || selectedImage.id?.split('/').pop()} 
                    {selectedImage.size && ` • ${formatFileSize(selectedImage.size)}`}
                    {selectedImage.width && selectedImage.height && ` • ${selectedImage.width}x${selectedImage.height}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                {selectedImage.url ? (
                  <img
                    src={selectedImage.url}
                    alt="Design preview"
                    className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center p-8">
                    <FaUpload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium">{selectedImage.name || 'ফাইল'}</p>
                    {selectedImage.size && (
                      <p className="text-gray-600">{formatFileSize(selectedImage.size)}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">প্রিভিউ উপলব্ধ নেই</p>
                  </div>
                )}
              </div>
              
              {/* Image Info Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedImage.type === 'camera' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedImage.type === 'camera' ? 'ক্যামেরা থেকে' : 'আপলোড করা'}
                  </span>
                  {selectedImage.format && (
                    <span className="text-gray-500">ফরম্যাট: {selectedImage.format.toUpperCase()}</span>
                  )}
                  {selectedImage.timestamp && (
                    <span className="text-gray-500">
                      {new Date(selectedImage.timestamp).toLocaleDateString('bn-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignReferenceSection;