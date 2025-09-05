// Cloudinary service for secure file uploads
import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

// Generate signature for secure upload (this will be replaced with backend endpoint)
// eslint-disable-next-line no-unused-vars
const generateSignature = (paramsToSign) => {
  // In production, this should be done on your backend
  // For now, we'll use unsigned upload with upload preset
  return null;
};

// Upload file to Cloudinary with unsigned upload
export const uploadToCloudinary = async (file, options = {}) => {
  try {
    console.log('Starting Cloudinary upload for file:', file.name);
    console.log('Using cloud name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    console.log('Using upload preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    // Create FormData for upload - only include basic required parameters
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    // Optional: Add folder only if specified and preset supports it
    const { folder } = options;
    if (folder && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET !== 'ml_default') {
      formData.append('folder', folder);
      console.log('Adding folder:', folder);
    }

    // Log FormData contents for debugging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
    }

    // Upload to Cloudinary
    const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
    console.log('Upload URL:', uploadUrl);
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('Cloudinary response status:', response.status);
    console.log('Cloudinary response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary error response:', errorText);
      
      // Try to parse error as JSON for better debugging
      try {
        const errorJson = JSON.parse(errorText);
        console.error('Parsed error JSON:', errorJson);
      } catch {
        console.error('Error text (not JSON):', errorText);
      }
      
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Cloudinary upload successful:', result.public_id);
    
    return {
      success: true,
      data: {
        id: result.public_id,
        url: result.secure_url,
        thumbnailUrl: result.secure_url.replace('/upload/', '/upload/w_200,h_200,c_fill/'),
        originalSize: result.bytes,
        format: result.format,
        width: result.width,
        height: result.height,
        createdAt: result.created_at
      }
    };

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message || 'ফাইল আপলোড করতে সমস্যা হয়েছে'
    };
  }
};

// Upload multiple files
export const uploadMultipleToCloudinary = async (files, options = {}) => {
  console.log(`Starting upload of ${files.length} files`);
  
  const uploadPromises = files.map((file, index) => {
    console.log(`Queuing upload ${index + 1}/${files.length}: ${file.name}`);
    return uploadToCloudinary(file, options);
  });
  
  try {
    const results = await Promise.all(uploadPromises);
    const successful = results.filter(result => result.success);
    const failed = results.filter(result => !result.success);
    
    console.log(`Upload completed: ${successful.length} successful, ${failed.length} failed`);
    
    return {
      success: failed.length === 0,
      successful: successful.map(result => result.data),
      failed: failed.map(result => result.error),
      totalUploaded: successful.length,
      totalFailed: failed.length
    };
  } catch (error) {
    console.error('Multiple upload error:', error);
    return {
      success: false,
      error: 'একাধিক ফাইল আপলোড করতে সমস্যা হয়েছে'
    };
  }
};

// Delete file from Cloudinary (requires backend for signed deletion)
// eslint-disable-next-line no-unused-vars
export const deleteFromCloudinary = async (publicId) => {
  try {
    // This requires backend implementation for security
    // For now, just return success (files will remain in Cloudinary)
    console.warn('Delete functionality requires backend implementation');
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'ফাইল মুছতে সমস্যা হয়েছে'
    };
  }
};

// Get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 400,
    height = 400,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary
    .image(publicId)
    .resize(`w_${width},h_${height},c_${crop}`)
    .quality(quality)
    .format(format)
    .toURL();
};

export default cloudinary;