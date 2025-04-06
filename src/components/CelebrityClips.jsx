import React from 'react';

    const CelebrityClips = ({ celebrityName }) => {
      const celebrityClips = [
        { title: "Clip 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { title: "Clip 2", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
      ];

      return (
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Celebrity Clips</h3>
          {celebrityClips.map((clip, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-medium text-gray-700">{clip.title}</h4>
              <iframe
                width="100%"
                height="150"
                src={clip.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      );
    };

    export default CelebrityClips;
