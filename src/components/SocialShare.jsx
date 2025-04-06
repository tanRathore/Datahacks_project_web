import React from 'react';
    import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
    import { motion } from 'framer-motion';

    const SocialShare = ({ celebrityName, score }) => {
      const shareText = `I got a ${score}% match with ${celebrityName} on Celeb Twin Finder! ✨ Find your twin:`;
      // Replace with your actual app URL when deployed
      const appUrl = encodeURIComponent("https://your-app-url.com");

      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${appUrl}`;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${appUrl}&quote=${encodeURIComponent(shareText)}`;
      // Instagram sharing is more complex, usually requires mobile app integration or specific APIs.
      // This link provides a generic prompt but doesn't prefill content.
      const instagramUrl = `https://www.instagram.com/`;

      const buttonVariants = {
        hover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
        tap: { scale: 0.9 }
      };

      return (
        <div className="mt-8 text-center border-t pt-6">
          <h3 className="text-lg font-semibold mb-3 text-white">Share Your Result!</h3>
          <div className="flex justify-center items-center gap-4">
            <motion.a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
              aria-label="Share on Twitter"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaTwitter size={32} />
            </motion.a>
            <motion.a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
              aria-label="Share on Facebook"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaFacebook size={32} />
            </motion.a>
            <motion.a
              href={instagramUrl} // Note: Limited functionality
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
              aria-label="Share on Instagram"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaInstagram size={32} />
            </motion.a>
          </div>
        </div>
      );
    };

    export default SocialShare;
