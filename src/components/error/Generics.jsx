import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

const GenericError = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center">
      {/* Error Icon */}
      <div className="p-4 bg-red-100 rounded-full">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      {/* Error Message */}
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{message}</h2>
      <p className="text-sm text-gray-500 mt-1">
        Please try again or contact support if the issue persists.
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 mt-6 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-all"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  );
};

export default GenericError;
