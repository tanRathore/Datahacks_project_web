import React, { useState, useRef, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { FaUpload, FaTimesCircle, FaCamera, FaSyncAlt } from 'react-icons/fa';

    const ImageUpload = ({ onImageUpload, multiple = false }) => {
      const [previews, setPreviews] = useState([]);
      const [error, setError] = useState('');
      const fileInputRef = useRef(null);
      const [showCamera, setShowCamera] = useState(false);
      const videoRef = useRef(null);
      const canvasRef = useRef(null);
      const [stream, setStream] = useState(null);

      // Cleanup stream on component unmount
      useEffect(() => {
        return () => {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        };
      }, [stream]);

      const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        processFiles(files);
      };

      const processFiles = (files) => {
        const newPreviews = [];
        let hasError = false;

        for (const file of files) {
          const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
          if (!validTypes.includes(file.type)) {
            setError('Invalid file type. Please upload JPEG, PNG, or WebP.');
            hasError = true;
            break;
          }
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size exceeds 5MB limit.');
            hasError = true;
            break;
          }
          newPreviews.push({ src: URL.createObjectURL(file), file });
        }

        if (!hasError) {
          setError('');
          setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews); // Replace if not multiple
        } else {
          setPreviews([]); // Clear previews on error
        }
      };

      const handleUploadClick = () => {
        if (previews.length > 0) {
          const filesToUpload = previews.map(p => p.file);
          onImageUpload(filesToUpload);
        } else {
          setError('Please select or capture an image first.');
        }
      };

      const handleRemovePreview = (index) => {
        setPreviews(prev => {
          const newPreviews = [...prev];
          URL.revokeObjectURL(newPreviews[index].src); // Clean up object URL
          newPreviews.splice(index, 1);
          return newPreviews;
        });
        // Reset file input if all previews are removed
        if (previews.length === 1 && fileInputRef.current) {
            fileInputRef.current.value = '';
        }
      };

      const triggerFileInput = () => {
        fileInputRef.current?.click();
      };

      const startCamera = async () => {
        try {
          setError('');
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          setStream(mediaStream);
          setShowCamera(true);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          setError('Could not access camera. Please check permissions.');
          setShowCamera(false);
        }
      };

      const stopCamera = () => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setShowCamera(false);
      };

      const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob
        canvas.toBlob(blob => {
          if (blob) {
            const capturedFile = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
            processFiles([capturedFile]); // Process the captured file
            stopCamera(); // Stop camera after capture
          } else {
            setError('Failed to capture image.');
          }
        }, 'image/png');
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-white p-6 md:p-10 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Your Photo</h2>

          {/* Hidden canvas for capturing photo */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {showCamera ? (
            <div className="mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg shadow-md mb-4"></video>
              <div className="flex justify-center gap-4">
                <button
                  onClick={capturePhoto}
                  className="py-2 px-4 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <FaCamera /> Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="py-2 px-4 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition-colors duration-300"
                  >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                id="imageUploadInput"
                multiple={multiple}
              />

              {!previews.length ? (
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 md:p-12 cursor-pointer hover:border-hollywood-gold transition-colors duration-300"
                    onClick={triggerFileInput}
                  >
                    <FaUpload className="text-4xl md:text-5xl text-hollywood-gold mx-auto mb-4" />
                    <p className="text-gray-600">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB each)</p>
                  </motion.div>
                  <p className="text-gray-500">or</p>
                  <button
                    onClick={startCamera}
                    className="py-2 px-6 rounded-lg text-white font-semibold bg-hollywood-red hover:bg-red-700 transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <FaCamera /> Use Camera
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative inline-block">
                      <img src={preview.src} alt={`Preview ${index + 1}`} className="max-w-40 h-auto max-h-40 rounded-lg shadow-md object-cover" />
                      <button
                        onClick={() => handleRemovePreview(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                        aria-label="Remove image"
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {!showCamera && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadClick}
              disabled={previews.length === 0 || error}
              className={`mt-6 w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out ${
                previews.length === 0 || error
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-hollywood-red to-pink-500 hover:from-red-700 hover:to-pink-600 shadow-md hover:shadow-lg'
              }`}
            >
              Find My Twin!
            </motion.button>
          )}
        </motion.div>
      );
    };

    export default ImageUpload;
