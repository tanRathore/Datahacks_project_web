import React from 'react';
    import { FaLock } from 'react-icons/fa';

    const PrivacyNote = () => {
      return (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-start gap-3">
          <FaLock className="text-blue-500 mt-1 flex-shrink-0" size={18} />
          <span>
            <strong>Privacy Assurance:</strong> Your photos are processed securely and are only used temporarily for the comparison. We do not store your images after the analysis is complete.
          </span>
        </div>
      );
    };

    export default PrivacyNote;
