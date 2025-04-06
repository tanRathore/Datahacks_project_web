import React from 'react';
    import { motion } from 'framer-motion';

    const Playlist = ({ celebrityName }) => {
      const playlist = [
        { title: "Song 1", artist: celebrityName },
        { title: "Song 2", artist: celebrityName },
        { title: "Song 3", artist: celebrityName }
      ];

      return (
        <motion.div
          className="bg-green-100 p-4 rounded-md shadow-lg mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Playlist Inspired by {celebrityName}</h3>
          <ul>
            {playlist.map((song, index) => (
              <li key={index} className="py-2 border-b border-gray-300 last:border-b-0">
                {song.title} - {song.artist}
              </li>
            ))}
          </ul>
        </motion.div>
      );
    };

    export default Playlist;
