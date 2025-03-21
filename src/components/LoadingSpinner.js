import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-blue-700 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
