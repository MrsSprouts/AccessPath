import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading AccessPath
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Preparing your accessibility map...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;