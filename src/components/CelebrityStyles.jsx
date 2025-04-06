import React from 'react';

    const CelebrityStyles = ({ celebrityName }) => {
      const celebrityStyles = [
        "https://via.placeholder.com/150x200.png?text=Style1",
        "https://via.placeholder.com/150x200.png?text=Style2",
        "https://via.placeholder.com/150x200.png?text=Style3"
      ];

      return (
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Celebrity Styles</h3>
          <div className="flex overflow-x-auto space-x-4">
            {celebrityStyles.map((style, index) => (
              <img key={index} src={style} alt={`Style ${index + 1}`} className="w-24 h-32 object-cover rounded-md shadow-md" />
            ))}
          </div>
        </div>
      );
    };

    export default CelebrityStyles;
