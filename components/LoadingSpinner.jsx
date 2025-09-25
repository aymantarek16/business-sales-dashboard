"use client";

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-800 opacity-20"></div>

        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-purple-900 border-b-gray-900 border-l-gray-900 animate-spin"></div>

        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-900 to-purple-900 opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
