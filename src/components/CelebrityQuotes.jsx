import React from 'react';

    const CelebrityQuotes = ({ celebrityName }) => {
      const celebrityQuotes = [
        "Quote 1: I'll be back.",
        "Quote 2: Hasta la vista, baby."
      ];

      return (
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Celebrity Quotes</h3>
          {celebrityQuotes.map((quote, index) => (
            <p key={index} className="mb-2 text-gray-700">{quote}</p>
          ))}
        </div>
      );
    };

    export default CelebrityQuotes;
