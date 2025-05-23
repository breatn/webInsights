export default function Marketing() {
  return (
    <section className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg card-shadow">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-darkText dark:text-white">Why Website Analysis Matters</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Regular analysis helps identify critical issues that affect your site's performance, visibility, and security.
          Our comprehensive scanner checks over 100 factors across five key areas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {/* SEO Analysis */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-darkText dark:text-white">SEO Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">25+ factors checked</p>
          </div>

          {/* Security Assessment */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-darkText dark:text-white">Security Assessment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">30+ factors checked</p>
          </div>

          {/* Performance Analysis */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-darkText dark:text-white">Performance Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">20+ factors checked</p>
          </div>

          {/* Accessibility Check */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-darkText dark:text-white">Accessibility Check</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">25+ factors checked</p>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-darkText dark:text-white">Competitor Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Compare your website against top search results for your target keywords to understand why competitors rank higher and what you can do to improve.
          </p>
        </div>
      </div>
    </section>
  );
}
