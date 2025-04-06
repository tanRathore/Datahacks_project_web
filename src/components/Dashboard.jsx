import React, { useState } from 'react';
    import ResultsDisplay from './ResultsDisplay';
    import Chatbot from './Chatbot';
    import Playlist from './Playlist';
    import AttributeComparison from './AttributeComparison';

    const Dashboard = ({
      userImage,
      celebrityData,
      onReset,
      imageCount,
      onImageSelect,
      selectedImageIndex,
      selectedAttributes,
      customCelebrity,
      isInitialResult,
      handleAttributeChange,
      handleCustomCelebrityChange,
      handleCompare,
      allAttributes,
      comparisonTriggered
    }) => {
      const [activeTab, setActiveTab] = useState('results');
      const [showChatbot, setShowChatbot] = useState(false);
      const [showPlaylist, setShowPlaylist] = useState(false);

      const toggleChatbot = () => {
        setShowChatbot(prev => !prev);
      };

      const togglePlaylist = () => {
        setShowPlaylist(prev => !prev);
      };

      // Filter attributes based on selectedAttributes
      const filteredAttributes = Object.fromEntries(
        Object.entries(celebrityData.attributes).filter(([key]) => selectedAttributes.includes(key))
      );

      return (
        <div className="w-full">
          {/* Tab Navigation */}
          <div className="bg-white shadow rounded-md p-4 mb-6">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('results')}
                className={`py-2 px-4 rounded-md font-semibold ${
                  activeTab === 'results' ? 'bg-hollywood-gold text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab('customize')}
                className={`py-2 px-4 rounded-md font-semibold ${
                  activeTab === 'customize' ? 'bg-hollywood-gold text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                Customize
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'results' && (
            <div className="bg-white shadow rounded-md p-6">
              <ResultsDisplay
                userImage={userImage}
                celebrityData={celebrityData}
                onReset={onReset}
                imageCount={imageCount}
                onImageSelect={onImageSelect}
                selectedImageIndex={selectedImageIndex}
                selectedAttributes={selectedAttributes}
                customCelebrity={customCelebrity}
                isInitialResult={isInitialResult}
              />
            </div>
          )}

          {activeTab === 'customize' && (
            <div className="bg-white shadow rounded-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">Customize Comparison</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {allAttributes.map(attribute => (
                  <button
                    key={attribute}
                    onClick={() => handleAttributeChange(attribute)}
                    className={`py-2 px-4 rounded-full text-sm font-medium ${
                      selectedAttributes.includes(attribute)
                        ? 'bg-hollywood-red text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-200`}
                  >
                    {attribute.replace(/_/g, " ")}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label htmlFor="customCelebrity" className="block text-sm font-medium text-gray-700">Compare with a specific celebrity:</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    id="customCelebrity"
                    value={customCelebrity}
                    onChange={handleCustomCelebrityChange}
                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    placeholder="Enter celebrity name"
                  />
                </div>
              </div>

              <button
                onClick={handleCompare}
                className="w-full py-3 px-5 rounded-md shadow-md text-white font-semibold bg-gradient-to-r from-hollywood-red to-pink-500 hover:from-red-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-4"
              >
                Compare!
              </button>

              {/* Conditionally render AttributeComparison */}
              {comparisonTriggered && (
                <>
                  <AttributeComparison
                    attributes={filteredAttributes}
                    weights={{}} // Placeholder for weights
                  />
                </>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={toggleChatbot}
                  className={`py-2 px-4 rounded-md shadow-md text-white font-semibold ${
                    showChatbot ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors duration-200`}
                >
                  {showChatbot ? "Close Chatbot" : "Chat with Celebrity"}
                </button>
                <button
                  onClick={togglePlaylist}
                  className={`py-2 px-4 rounded-md shadow-md text-white font-semibold ${
                    showPlaylist ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } transition-colors duration-200`}
                >
                  {showPlaylist ? "Close Playlist" : "Get Playlist"}
                </button>
              </div>

              {showChatbot && <Chatbot celebrityName={celebrityData.name} />}
              {showPlaylist && <Playlist celebrityName={celebrityData.name} />}
            </div>
          )}
        </div>
      );
    };

    export default Dashboard;
