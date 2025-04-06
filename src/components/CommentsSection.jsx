import React, { useState } from 'react';
    import { motion } from 'framer-motion';

    const CommentsSection = () => {
      const [comments, setComments] = useState([]);
      const [newComment, setNewComment] = useState('');

      const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
          setComments(prev => [...prev, { text: newComment, author: 'User', date: new Date().toLocaleDateString() }]);
          setNewComment('');
        }
      };

      return (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Comments</h3>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              rows="3"
            />
            <button
              type="submit"
              className="mt-2 py-2 px-4 rounded-lg text-white font-semibold bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
            >
              Post Comment
            </button>
          </form>
          <div>
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-4 p-3 bg-gray-50 rounded-lg shadow-inner"
              >
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-gray-500 text-sm mt-1">By {comment.author} on {comment.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };

    export default CommentsSection;
