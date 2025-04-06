import React from 'react';
    import { motion } from 'framer-motion';

    const FAQ = () => {
      // Placeholder FAQ data
      const faqs = [
        { q: "How accurate is the comparison?", a: "Our analysis uses advanced (simulated) algorithms, but results are intended for entertainment purposes. Facial recognition can vary based on image quality and angles." },
        { q: "What happens to my uploaded photo?", a: "Your photo is processed temporarily for the comparison and is not stored on our servers long-term. See our Privacy Note for details." },
        { q: "Which celebrities are in the database?", a: "We have a wide (placeholder) range of well-known celebrities across various fields." },
        { q: "Why didn't I get a match?", a: "Matches depend on finding sufficient similarity. Try using a clear, front-facing photo with good lighting." },
      ];

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }} // Delay appearance
          className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-lg mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border-b pb-2">
                <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-gray-700 group-hover:text-purple-600">
                  {faq.q}
                  <span className="transition-transform duration-300 transform group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      );
    };

    export default FAQ;
