import React, { useState } from 'react';
    import ImageUpload from './components/ImageUpload';
    import PrivacyNote from './components/PrivacyNote';
    import FAQ from './components/FAQ';
    import { FaGithub } from 'react-icons/fa';
    import Dashboard from './components/Dashboard';

    function App() {
      const [userImages, setUserImages] = useState([]);
      const [showResults, setShowResults] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [selectedImageIndex, setSelectedImageIndex] = useState(0);
      const [badges, setBadges] = useState([]);
      const [selectedAttributes, setSelectedAttributes] = useState([]);
      const [customCelebrity, setCustomCelebrity] = useState('');
      const [initialCelebrityMatch, setInitialCelebrityMatch] = useState(null);
      const [comparisonTriggered, setComparisonTriggered] = useState(false);

      // Placeholder for celebrity data - replace with actual API response
      const defaultCelebrityMatchData = {
        name: "Placeholder Celebrity",
        imageUrl: "https://via.placeholder.com/300x400.png?text=Celebrity",
        similarityScore: 75,
        attributes: {
          Arched_Eyebrows: { user: false, celebrity: false, match: true },
          Attractive: { user: true, celebrity: true, match: true },
          Bags_Under_Eyes: { user: false, celebrity: false, match: true },
          Bald: { user: false, celebrity: false, match: true },
          Bangs: { user: false, celebrity: false, match: true },
          Big_Lips: { user: true, celebrity: true, match: true },
          Big_Nose: { user: false, celebrity: false, match: true },
          Black_Hair: { user: true, celebrity: true, match: true },
          Blond_Hair: { user: false, celebrity: false, match: true },
          Blurry: { user: false, celebrity: false, match: true },
          Brown_Hair: { user: true, celebrity: true, match: true },
          Bushy_Eyebrows: { user: false, celebrity: false, match: true },
          Chubby: { user: false, celebrity: false, match: true },
          Double_Chin: { user: false, celebrity: false, match: true },
          Eyeglasses: { user: true, celebrity: true, match: true },
          Goatee: { user: false, celebrity: false, match: true },
          Gray_Hair: { user: false, celebrity: false, match: true },
          Heavy_Makeup: { user: false, celebrity: false, match: true },
          High_Cheekbones: { user: true, celebrity: true, match: true },
          Male: { user: true, celebrity: true, match: true },
          Mouth_Slightly_Open: { user: true, celebrity: true, match: true },
          Mustache: { user: false, celebrity: false, match: true },
          Narrow_Eyes: { user: false, celebrity: false, match: true },
          No_Beard: { user: true, celebrity: true, match: true },
          Oval_Face: { user: true, celebrity: true, match: true },
          Pale_Skin: { user: false, celebrity: false, match: true },
          Pointy_Nose: { user: false, celebrity: false, match: true },
          Receding_Hairline: { user: false, celebrity: false, match: true },
          Rosy_Cheeks: { user: false, celebrity: false, match: true },
          Sideburns: { user: false, celebrity: false, match: true },
          Smiling: { user: true, celebrity: true, match: true },
          Straight_Hair: { user: false, celebrity: false, match: true },
          Wavy_Hair: { user: false, celebrity: false, match: true },
          Wearing_Earrings: { user: false, celebrity: false, match: true },
          Wearing_Hat: { user: false, celebrity: false, match: true },
          Wearing_Lipstick: { user: false, celebrity: false, match: true },
          Wearing_Necklace: { user: false, celebrity: false, match: true },
          Wearing_Necktie: { user: true, celebrity: true, match: true },
          Young: { user: true, celebrity: true, match: true }
        }
      };

      const [celebrityMatchData, setCelebrityMatchData] = useState(defaultCelebrityMatchData);

      const allAttributes = Object.keys(defaultCelebrityMatchData.attributes);

      const handleImageUpload = (files) => {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));
        setUserImages(prevImages => [...prevImages, ...newImages]);
        setShowResults(false);
        setIsLoading(true);
        setCustomCelebrity('');
        setComparisonTriggered(false);

        if (userImages.length === 0) {
          setBadges(prev => [...prev, { name: "First Upload", description: "Uploaded your first image!" }]);
        }

        setTimeout(() => {
          setInitialCelebrityMatch(defaultCelebrityMatchData);
          setCelebrityMatchData(defaultCelebrityMatchData);
          setSelectedAttributes(allAttributes);
          setShowResults(true);
          setIsLoading(false);
        }, 2000);
      };

      const handleReset = () => {
        setUserImages([]);
        setShowResults(false);
        setIsLoading(false);
        setSelectedImageIndex(0);
        setInitialCelebrityMatch(null);
        setSelectedAttributes([]);
        setCustomCelebrity('');
        setComparisonTriggered(false);
      };

      const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
      };

      const handleAttributeChange = (attribute) => {
        setSelectedAttributes(prev =>
          prev.includes(attribute) ? prev.filter(a => a !== attribute) : [...prev, attribute]
        );
      };

      const handleCustomCelebrityChange = (e) => {
        setCustomCelebrity(e.target.value);
      };

      const handleCompare = () => {
        setComparisonTriggered(true);
        // Simulate API call to get custom celebrity data
        setTimeout(() => {
          // Replace with actual API call and response
          const customCelebrityData = {
            name: customCelebrity,
            imageUrl: "https://via.placeholder.com/300x400.png?text=" + customCelebrity,
            similarityScore: 60, // Example score
            attributes: { ...defaultCelebrityMatchData.attributes } // Use same attributes for now
          };
          setCelebrityMatchData(customCelebrityData);
        }, 1000);
      };

      return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-200 via-red-200 to-pink-200">
          <header className="bg-black text-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
              Celeb Twin Finder
            </h1>
            <a href="#" className="text-gray-300 hover:text-yellow-400">
              <FaGithub size={24} />
            </a>
          </header>

          <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
            {!showResults && !isLoading && (
              <ImageUpload onImageUpload={handleImageUpload} multiple />
            )}

            {isLoading && (
              <div className="text-center mt-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-xl font-semibold text-gray-700">Finding your twin...</p>
              </div>
            )}

            {showResults && userImages.length > 0 && initialCelebrityMatch && (
              <Dashboard
                userImage={userImages[selectedImageIndex]}
                celebrityData={celebrityMatchData}
                onReset={handleReset}
                imageCount={userImages.length}
                onImageSelect={handleImageSelect}
                selectedImageIndex={selectedImageIndex}
                selectedAttributes={selectedAttributes}
                customCelebrity={customCelebrity}
                isInitialResult={!comparisonTriggered}
                handleAttributeChange={handleAttributeChange}
                handleCustomCelebrityChange={handleCustomCelebrityChange}
                handleCompare={handleCompare}
                allAttributes={allAttributes}
                comparisonTriggered={comparisonTriggered}
              />
            )}

            {!userImages.length && !isLoading && (
              <div className="mt-12 text-center text-gray-600 max-w-xl">
                <p className="mb-4">Upload your photos to discover which celebrity you resemble most! Our advanced (simulated) analysis compares your facial features against a vast database.</p>
                <PrivacyNote />
              </div>
            )}
          </main>

          {badges.length > 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">New Badge!</strong>
              {badges.map((badge, index) => (
                <span key={index} className="block sm:inline">{badge.name}: {badge.description}</span>
              ))}
            </div>
          )}

          <footer className="bg-black text-white shadow-inner text-center py-4 mt-auto">
            <p className="text-gray-300 text-sm">&copy; 2024 Celeb Twin Finder. All Rights Reserved.</p>
          </footer>
        </div>
      );
    }

    export default App;
