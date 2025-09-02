import React, { useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { FaPen, FaEraser, FaTrash, FaUndo, FaRedo, FaDownload, FaPalette } from 'react-icons/fa';

const DigitalSketchpad = ({ onSketchChange, initialSketch = null }) => {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState('#8B5CF6'); // Purple
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [eraseMode, setEraseMode] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [canvasReady, setCanvasReady] = useState(false);

  const colors = [
    '#8B5CF6', // Purple
    '#000000', // Black
    '#EF4444', // Red
    '#10B981', // Green
    '#3B82F6', // Blue
    '#F59E0B', // Yellow
    '#8B5A2B', // Brown
    '#6B7280'  // Gray
  ];

  const strokeWidths = [1, 2, 3, 5, 8];

  // Load initial sketch if provided
  useEffect(() => {
    const loadInitialSketch = async () => {
      if (initialSketch && canvasRef.current && canvasReady) {
        try {
          setIsLoading(true);
          setError(null);
          await canvasRef.current.loadPaths(initialSketch);
        } catch (err) {
          console.error('Error loading initial sketch:', err);
          setError('স্কেচ লোড করতে সমস্যা হয়েছে');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadInitialSketch();
  }, [initialSketch, canvasReady]);

  const handleStrokeEnd = async () => {
    if (canvasRef.current && onSketchChange) {
      try {
        setError(null);
        // Export as image (base64)
        const imageData = await canvasRef.current.exportImage('png');
        // Also export paths for future loading
        const paths = await canvasRef.current.exportPaths();
        
        onSketchChange({
          imageData,
          paths
        });
      } catch (error) {
        console.error('Error exporting sketch:', error);
        setError('স্কেচ সেভ করতে সমস্যা হয়েছে');
      }
    }
  };

  const handleClearCanvas = () => {
    try {
      if (canvasRef.current) {
        canvasRef.current.clearCanvas();
        setError(null);
        if (onSketchChange) {
          onSketchChange({
            imageData: null,
            paths: []
          });
        }
      }
    } catch (error) {
      console.error('Error clearing canvas:', error);
      setError('ক্যানভাস ক্লিয়ার করতে সমস্যা হয়েছে');
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
      handleStrokeEnd(); // Update the parent component
    }
  };

  const handleRedo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
      handleStrokeEnd(); // Update the parent component
    }
  };

  const handleDownload = async () => {
    if (canvasRef.current) {
      try {
        setIsLoading(true);
        setError(null);
        const imageData = await canvasRef.current.exportImage('png');
        const link = document.createElement('a');
        link.download = 'measurement-sketch.png';
        link.href = imageData;
        link.click();
      } catch (error) {
        console.error('Error downloading sketch:', error);
        setError('স্কেচ ডাউনলোড করতে সমস্যা হয়েছে');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleEraseMode = () => {
    setEraseMode(!eraseMode);
  };

  return (
    <div className="bg-purple-50 p-4 rounded-lg" data-aos="fade-up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h3 className="font-semibold text-purple-800 mb-2 sm:mb-0">ডিজিটাল স্কেচ প্যাড</h3>
        <p className="text-gray-600 text-sm">গ্রাহকের মাপ চিত্রের মাধ্যমে নির্দেশ করুন</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-4 w-4 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">সমস্যা ঘটেছে</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="relative border-2 border-gray-300 rounded-lg bg-white mb-4 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-purple-600 font-medium">লোড হচ্ছে...</span>
            </div>
          </div>
        )}
        <ReactSketchCanvas
          ref={canvasRef}
          style={{
            border: 'none',
            borderRadius: '0.5rem'
          }}
          width="100%"
          height="300px"
          strokeWidth={strokeWidth}
          strokeColor={eraseMode ? 'transparent' : strokeColor}
          eraserWidth={strokeWidth * 2}
          allowOnlyPointerType="all"
          onStroke={handleStrokeEnd}
          backgroundImage="/borkha-outline.svg" // Borkha outline guide
          onReady={() => setCanvasReady(true)}
        />
      </div>

      {/* Tools */}
      <div className="space-y-4">
        {/* Primary Tools */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <button
            onClick={toggleEraseMode}
            disabled={isLoading}
            className={`flex items-center justify-center px-3 py-3 sm:py-2 rounded-lg transition-colors touch-target ${
              eraseMode 
                ? 'bg-red-500 text-white' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {eraseMode ? <FaEraser className="mr-1" /> : <FaPen className="mr-1" />}
            <span className="text-sm sm:text-base">{eraseMode ? 'ইরেজার' : 'পেন'}</span>
          </button>

          <button
            onClick={() => setShowColorPalette(!showColorPalette)}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-3 sm:py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPalette className="mr-1" />
            <span className="text-sm sm:text-base">রং</span>
          </button>

          <button
            onClick={handleUndo}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-3 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUndo className="mr-1" />
            <span className="text-sm sm:text-base">আনডু</span>
          </button>

          <button
            onClick={handleRedo}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-3 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaRedo className="mr-1" />
            <span className="text-sm sm:text-base">রিডু</span>
          </button>

          <button
            onClick={handleClearCanvas}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-3 sm:py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTrash className="mr-1" />
            <span className="text-sm sm:text-base">ক্লিয়ার</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex items-center justify-center px-3 py-3 sm:py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="mr-1" />
            <span className="text-sm sm:text-base">{isLoading ? 'লোড...' : 'ডাউনলোড'}</span>
          </button>
        </div>

        {/* Color Palette */}
        {showColorPalette && (
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <div className="flex flex-wrap gap-2 mb-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setStrokeColor(color);
                    setEraseMode(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    strokeColor === color 
                      ? 'border-purple-500 scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            {/* Stroke Width */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">তুলির আকার:</label>
              <div className="flex gap-2">
                {strokeWidths.map((width) => (
                  <button
                    key={width}
                    onClick={() => setStrokeWidth(width)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      strokeWidth === width
                        ? 'border-purple-500 bg-purple-100 text-purple-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="rounded-full bg-current"
                      style={{
                        width: `${Math.max(width, 2)}px`,
                        height: `${Math.max(width, 2)}px`
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">নির্দেশনা:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• পেন টুল দিয়ে মাপের লাইন আঁকুন</li>
            <li>• বিভিন্ন রং ব্যবহার করে বিভিন্ন মাপ চিহ্নিত করুন</li>
            <li>• ভুল হলে ইরেজার বা আনডু ব্যবহার করুন</li>
            <li>• প্রয়োজনে স্কেচ ডাউনলোড করুন</li>
            <li>• মোবাইলে আঙুল দিয়ে আঁকতে পারেন</li>
          </ul>
        </div>

        {/* Add touch target styles */}
        <style jsx>{`
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
          @media (max-width: 640px) {
            .touch-target {
              min-height: 48px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default DigitalSketchpad;