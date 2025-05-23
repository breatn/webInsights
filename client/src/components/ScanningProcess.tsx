interface ScanningProcessProps {
  url: string;
  progress: number;
}

export default function ScanningProcess({ url, progress }: ScanningProcessProps) {
  // Determine which steps are completed
  const checkingUrlComplete = progress >= 25;
  const analyzingSeoComplete = progress >= 50;
  const scanningSecurityInProgress = progress >= 50 && progress < 75;
  const scanningSecurityComplete = progress >= 75;
  const preparingReportInProgress = progress >= 75 && progress < 100;
  const preparingReportComplete = progress >= 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg card-shadow p-6 mb-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-darkText dark:text-white">
          Analyzing <span className="text-primary font-mono">{url}</span>
        </h2>
        <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-200" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-sm mb-6 max-w-md mx-auto">
          <span className={checkingUrlComplete ? "text-green-600 dark:text-green-500" : "text-gray-400"}>
            {checkingUrlComplete ? "✓ Checking URL" : "Checking URL"}
          </span>
          <span className={analyzingSeoComplete ? "text-green-600 dark:text-green-500" : "text-gray-400"}>
            {analyzingSeoComplete ? "✓ Analyzing SEO elements" : "Analyzing SEO"}
          </span>
          <span className={
            scanningSecurityComplete 
              ? "text-green-600 dark:text-green-500" 
              : scanningSecurityInProgress 
                ? "text-primary animate-pulse" 
                : "text-gray-400"
          }>
            {scanningSecurityComplete ? "✓ Security scan complete" : "Scanning security..."}
          </span>
          <span className={
            preparingReportComplete 
              ? "text-green-600 dark:text-green-500" 
              : preparingReportInProgress 
                ? "text-primary animate-pulse" 
                : "text-gray-400"
          }>
            {preparingReportComplete ? "✓ Report ready" : "Preparing report"}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          This usually takes less than a minute. Please don't close this page.
        </p>
      </div>
    </div>
  );
}
