// /src/components/UTMLog.tsx
import React from 'react';
import { useUTMStore } from '../store/utmStore';

const UTMLog: React.FC = () => {
  const { history, removeEntry } = useUTMStore();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">UTM History</h2>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No UTM links generated yet</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-md p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Generated URL:</span>
                  <button
                    onClick={() => copyToClipboard(entry.url)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Copy URL
                  </button>
                </div>
                <div className="bg-gray-50 p-2 rounded text-sm break-all">
                  {entry.url}
                </div>

                <div className="mt-2">
                  <div className="text-sm font-medium mb-1">Parameters:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Source: {entry.parameters.source}</div>
                    <div>Medium: {entry.parameters.medium}</div>
                    <div>Campaign: {entry.parameters.campaign}</div>
                    <div>Term: {entry.parameters.term}</div>
                    <div>Content: {entry.parameters.content}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UTMLog;
