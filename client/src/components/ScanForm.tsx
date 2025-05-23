import { useState } from "react";
import { validateUrl } from "@/lib/validation";

interface ScanFormProps {
  onSubmit: (url: string) => void;
  isScanning: boolean;
}

export default function ScanForm({ onSubmit, isScanning }: ScanFormProps) {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setUrlError("");
    
    // Validate URL
    const isValid = validateUrl(url);
    if (!isValid) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    // Proceed with scan
    onSubmit(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg card-shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-darkText dark:text-white">Start Your Website Analysis</h2>
      <form id="scan-form" className="mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="url-input" className="sr-only">Website URL</label>
            <input 
              type="url" 
              id="url-input" 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-darkText dark:text-white"
              placeholder="Enter website URL (e.g., https://example.com)" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {urlError && (
              <div className="text-left text-sm text-danger mt-1">{urlError}</div>
            )}
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition duration-150 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isScanning}
          >
            <span>{isScanning ? "Analyzing..." : "Analyze Website"}</span>
            {!isScanning && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Comprehensive website analysis with detailed reports. Instant insights for your site.
      </p>
    </div>
  );
}
