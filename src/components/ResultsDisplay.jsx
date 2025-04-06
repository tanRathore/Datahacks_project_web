import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import AttributeComparison from './AttributeComparison';
    import SocialShare from './SocialShare';
    import CommentsSection from './CommentsSection';
    import { FaRedo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

    const ResultsDisplay = ({
      userImage,
      celebrityData,
      onReset,
      imageCount,
      onImageSelect,
      selectedImageIndex,
      selectedAttributes,
      customCelebrity,
      isInitialResult
    }) => {
      const { name, imageUrl, similarityScore, attributes } = celebrityData;

      const ProgressBar = ({ value }) => (
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      );

      const handlePrevImage = () => {
        onImageSelect((selectedImageIndex - 1 + imageCount) % imageCount);
      };

      const handleNextImage = () => {
        onImageSelect((selectedImageIndex + 1) % imageCount);
      };

      // Filter attributes based on selectedAttributes
      const filteredAttributes = Object.fromEntries(
        Object.entries(attributes).filter(([key]) => selectedAttributes.includes(key))
      );

      // Animated Radial Chart (Placeholder)
      const RadialChart = () => (
        <motion.div
          className="w-40 h-40 rounded-full bg-purple-200 mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Replace with actual chart implementation */}
          <p className="text-center text-gray-700">Radial Chart</p>
        </motion.div>
      );

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h2 className={`text-center text-3xl font-bold mb-6 text-transparent bg-clip-text ${
            isInitialResult
              ? 'bg-gradient-to-r from-green-500 to-blue-500'
              : 'bg-gradient-to-r from-hollywood-gold to-hollywood-red'
          }`}>
            {isInitialResult ? "Best Overall Match!" : "Customized Comparison"}
          </h2>

          {customCelebrity && (
            <p className="text-center text-lg text-gray-700 mb-4">Comparing with: {customCelebrity}</p>
          )}

          {imageCount > 1 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button onClick={handlePrevImage} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FaChevronLeft />
              </button>
              <span>Image {selectedImageIndex + 1} of {imageCount}</span>
              <button onClick={handleNextImage} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FaChevronRight />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">You</h3>
              <motion.img
                src={userImage}
                alt="User upload"
                className="w-full max-w-xs h-auto rounded-lg shadow-md mx-auto object-cover aspect-[3/4]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">{name}</h3>
              <motion.img
                src={imageUrl}
                alt={name}
                className="w-full max-w-xs h-auto rounded-lg shadow-md mx-auto object-cover aspect-[3/4]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Similarity Score</h3>
            <div className="w-full max-w-md mx-auto">
              <ProgressBar value={similarityScore} />
              <p className="text-2xl font-bold mt-2 text-green-600">{similarityScore}% Match</p>
            </div>
          </div>

          {/* Animated Visualization */}
          {/* <RadialChart /> */}

          <SocialShare celebrityName={name} score={similarityScore} />

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Comments</h3>
            <CommentsSection />
          </div>

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="py-2 px-6 rounded-lg text-white font-semibold bg-gray-500 hover:bg-gray-600 transition-colors duration-300 inline-flex items-center gap-2"
            >
              <FaRedo /> Try Another Photo
            </motion.button>
          </div>
        </motion.div>
      );
    };

    export default ResultsDisplay;
