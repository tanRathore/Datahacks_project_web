import React, { useState } from 'react';
    import { motion } from 'framer-motion';

    const Chatbot = ({ celebrityName }) => {
      const [messages, setMessages] = useState([]);
      const [newMessage, setNewMessage] = useState('');

      const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
          setMessages(prev => [
            ...prev,
            { text: newMessage, sender: 'user' },
            { text: `As ${celebrityName}, I'd say... ${getCelebrityResponse(celebrityName)}`, sender: 'celebrity' }
          ]);
          setNewMessage('');
        }
      };

      const getCelebrityResponse = (name) => {
        // Placeholder responses - customize based on celebrity
        if (name === "Placeholder Celebrity") {
          return "That's what she said!";
        } else {
          return "I'll be back!";
        }
      };

      return (
        <motion.div
          className="bg-gray-100 p-4 rounded-md shadow-lg mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Chatting with {celebrityName}</h3>
          <div className="h-64 overflow-y-auto mb-2">
            {messages.map((message, index) => (
              <div key={index} className={`p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-100 text-blue-800 ml-auto w-fit' : 'bg-gray-200 text-gray-800 mr-auto w-fit'} mb-1`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSendMessage} className="ml-2 py-2 px-4 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600">Send</button>
          </div>
        </motion.div>
      );
    };

    export default Chatbot;
