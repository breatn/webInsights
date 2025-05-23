import { useState } from "react";

interface ExpandableSectionProps {
  title: string;
  sectionId: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export default function ExpandableSection({ 
  title, 
  sectionId, 
  defaultExpanded = false, 
  children 
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${isExpanded ? 'expanded' : ''}`} data-section={sectionId}>
      <div 
        className="p-4 bg-white dark:bg-gray-800 flex justify-between items-center cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-darkText dark:text-white">{title}</h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-gray-400 dark:text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="expandable-content bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
