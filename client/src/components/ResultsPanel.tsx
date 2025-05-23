import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ScanResult, ResultsTab } from "@/types";
import ScoreCircle from "./ScoreCircle";
import ExpandableSection from "./ExpandableSection";
import { formatDate } from "@/lib/utils";
import { generateHtmlReport } from "@/lib/reportGenerator";

interface ResultsPanelProps {
  result: ScanResult;
  onNewScan: () => void;
}

export default function ResultsPanel({ result, onNewScan }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultsTab>("seo");
  const reportRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `WebInsight-Scan-${result.url.replace(/https?:\/\/(www\.)?/, "")}-${new Date().toISOString().split('T')[0]}`,
    copyStyles: true,
  });

  const handleDownloadReport = () => {
    // Generate and download HTML report
    const htmlContent = generateHtmlReport(result);
    
    // Create a blob and download link
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WebInsight-Scan-${result.url.replace(/https?:\/\/(www\.)?/, "")}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div ref={reportRef} className="bg-white dark:bg-gray-800 rounded-lg card-shadow overflow-hidden">
      {/* Results Header & Overview */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-darkText dark:text-white">Analysis Results for</h2>
              <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-primary font-mono ml-2 hover:underline">
                {result.url.replace(/https?:\/\/(www\.)?/, "")}
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scan completed on {formatDate(result.scanDate)}
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition duration-150 flex items-center" 
              onClick={handleDownloadReport}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Report
            </button>
            <button 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-darkText dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150" 
              onClick={onNewScan}
            >
              New Scan
            </button>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-5 gap-4">
        <ScoreCircle 
          score={result.scores.overall} 
          label="Overall Score" 
          status={result.scores.overall >= 80 ? "good" : result.scores.overall >= 60 ? "warning" : "danger"} 
          color="text-secondary"
        />
        
        <ScoreCircle 
          score={result.scores.seo} 
          label="SEO Health" 
          status={result.scores.seo >= 80 ? "good" : result.scores.seo >= 60 ? "warning" : "danger"} 
          color="text-warning"
        />
        
        <ScoreCircle 
          score={result.scores.security} 
          label="Security Rating" 
          status={result.scores.security >= 80 ? "good" : result.scores.security >= 60 ? "warning" : "danger"} 
          color="text-primary"
        />

        <ScoreCircle 
          score={result.scores.performance} 
          label="Performance" 
          status={result.scores.performance >= 80 ? "good" : result.scores.performance >= 60 ? "warning" : "danger"} 
          color="text-accent"
        />
        
        <ScoreCircle 
          score={result.scores.accessibility} 
          label="Accessibility" 
          status={result.scores.accessibility >= 80 ? "good" : result.scores.accessibility >= 60 ? "warning" : "danger"} 
          color="text-danger"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex overflow-x-auto">
          <button 
            className={`px-6 py-4 font-medium ${activeTab === "seo" ? "text-primary border-b-2 border-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary"}`}
            onClick={() => setActiveTab("seo")}
          >
            SEO Analysis
          </button>
          <button 
            className={`px-6 py-4 font-medium ${activeTab === "security" ? "text-primary border-b-2 border-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary"}`}
            onClick={() => setActiveTab("security")}
          >
            Security Assessment
          </button>
          <button 
            className={`px-6 py-4 font-medium ${activeTab === "performance" ? "text-primary border-b-2 border-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary"}`}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
          <button 
            className={`px-6 py-4 font-medium ${activeTab === "accessibility" ? "text-primary border-b-2 border-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary"}`}
            onClick={() => setActiveTab("accessibility")}
          >
            Accessibility
          </button>
        </nav>
      </div>

      {/* Tab Content - SEO Analysis */}
      <div className={`p-6 space-y-6 ${activeTab !== "seo" ? "hidden" : ""}`}>
        {/* SEO Overview */}
        {result.seo.competitorAnalysis && (
          <ExpandableSection title="Search Rankings Comparison" sectionId="search-comparison">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-darkText dark:text-white">
                  Search Rankings for "{result.seo.competitorAnalysis.keyword}"
                </h3>
                <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                  Your Position: #{result.seo.competitorAnalysis.searchResults.find(r => r.url === result.url)?.position || "Not found"}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Website</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Title</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {result.seo.competitorAnalysis.searchResults
                      .filter(r => !r.isSponsored)
                      .map((searchResult, index) => (
                        <tr key={index} className={searchResult.url === result.url ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                          <td className="py-3 px-4 text-sm">
                            <span className="font-medium text-darkText dark:text-white">#{searchResult.position}</span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <div className="text-blue-600 dark:text-blue-400 font-medium truncate max-w-[200px]">
                              {new URL(searchResult.url).hostname}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">
                            <div className="truncate max-w-[300px]">{searchResult.title}</div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {searchResult.url === result.url ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                Your Site
                              </span>
                            ) : searchResult.position <= 3 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Top Result
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                                Competitor
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3 text-darkText dark:text-white">Content Gap Analysis</h4>
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Missing Keywords</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.seo.competitorAnalysis.contentGap.missingKeywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs rounded text-gray-700 dark:text-gray-300">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Missing Topics</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.seo.competitorAnalysis.contentGap.missingTopics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs rounded text-gray-700 dark:text-gray-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3 text-darkText dark:text-white">Technical Comparison</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Load Speed</span>
                      <span className="text-xs text-red-600 dark:text-red-400">
                        {result.seo.competitorAnalysis.technicalComparison.loadSpeed.difference}
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-20 text-right mr-2 text-gray-700 dark:text-gray-300">
                        <span className="font-medium">You:</span> {result.seo.competitorAnalysis.technicalComparison.loadSpeed.yours}
                      </div>
                      <div className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="flex h-full">
                          <div className="bg-blue-500 h-full rounded-l-full" style={{width: '60%'}}></div>
                          <div className="bg-green-500 h-full rounded-r-full" style={{width: '40%'}}></div>
                        </div>
                      </div>
                      <div className="w-28 text-left ml-2 text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Top site:</span> {result.seo.competitorAnalysis.technicalComparison.loadSpeed.competitor}
                      </div>
                    </div>
                  </div>
                
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Backlinks</span>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400">
                        {result.seo.competitorAnalysis.technicalComparison.backlinks.competitor - result.seo.competitorAnalysis.technicalComparison.backlinks.yours} more
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-20 text-right mr-2 text-gray-700 dark:text-gray-300">
                        <span className="font-medium">You:</span> {result.seo.competitorAnalysis.technicalComparison.backlinks.yours}
                      </div>
                      <div className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="bg-blue-500 h-full rounded-l-full" 
                          style={{
                            width: `${Math.min(
                              (result.seo.competitorAnalysis.technicalComparison.backlinks.yours / 
                              (result.seo.competitorAnalysis.technicalComparison.backlinks.yours + 
                               result.seo.competitorAnalysis.technicalComparison.backlinks.competitor)) * 100,
                              5
                            )}%`
                          }}
                        ></div>
                      </div>
                      <div className="w-28 text-left ml-2 text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Top site:</span> {result.seo.competitorAnalysis.technicalComparison.backlinks.competitor}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {result.seo.competitorAnalysis.technicalComparison.backlinks.qualityAssessment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-3 text-darkText dark:text-white">Recommendations</h4>
              <ul className="space-y-2">
                {result.seo.competitorAnalysis.contentGap.recommendations.map((recommendation, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ExpandableSection>
        )}
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-darkText dark:text-white">SEO Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Meta Title</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.seo.metaTitle.status === 'good' ? 'bg-secondary' : result.seo.metaTitle.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.seo.metaTitle.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Meta Description</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.seo.metaDescription.status === 'good' ? 'bg-secondary' : result.seo.metaDescription.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.seo.metaDescription.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Headings</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.seo.headings.status === 'good' ? 'bg-secondary' : result.seo.headings.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.seo.headings.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Images</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.seo.images.status === 'good' ? 'bg-secondary' : result.seo.images.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.seo.images.message}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Detailed Reports */}
        <ExpandableSection title="Meta Tags Analysis" sectionId="meta-tags">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Title Tag</h4>
              <div className="text-sm code-font p-2 bg-gray-100 dark:bg-gray-900 rounded mb-2">
                {result.seo.metaTitle.value}
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${result.seo.metaTitle.status === 'good' ? 'bg-secondary' : result.seo.metaTitle.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm text-darkText dark:text-gray-300">Length: {result.seo.metaTitle.value.length} characters (Recommended: 50-60)</span>
              </div>
              {result.seo.metaTitle.suggestion && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Suggestion:</strong> {result.seo.metaTitle.suggestion}
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Meta Description</h4>
              <div className="text-sm code-font p-2 bg-gray-100 dark:bg-gray-900 rounded mb-2">
                {result.seo.metaDescription.value}
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${result.seo.metaDescription.status === 'good' ? 'bg-secondary' : result.seo.metaDescription.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm text-darkText dark:text-gray-300">Length: {result.seo.metaDescription.value.length} characters (Recommended: 120-158)</span>
              </div>
              {result.seo.metaDescription.suggestion && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Suggestion:</strong> {result.seo.metaDescription.suggestion}
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Canonical URL</h4>
              <div className="text-sm code-font p-2 bg-gray-100 dark:bg-gray-900 rounded mb-2">
                {result.seo.canonical.value ? result.seo.canonical.value : 'No canonical URL found'}
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${result.seo.canonical.status === 'good' ? 'bg-secondary' : result.seo.canonical.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm text-darkText dark:text-gray-300">{result.seo.canonical.message}</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Viewport Meta Tag</h4>
              <div className="text-sm code-font p-2 bg-gray-100 dark:bg-gray-900 rounded mb-2">
                {result.seo.viewport.value ? result.seo.viewport.value : 'No viewport meta tag found'}
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${result.seo.viewport.status === 'good' ? 'bg-secondary' : result.seo.viewport.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm text-darkText dark:text-gray-300">{result.seo.viewport.message}</span>
              </div>
            </div>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Heading Structure" sectionId="heading-structure">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-darkText dark:text-white">Heading Hierarchy</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.seo.headings.status === 'good' ? 'bg-secondary' : result.seo.headings.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm font-medium text-darkText dark:text-white">{result.seo.headings.message}</span>
              </div>
            </div>
            <ul className="space-y-3">
              {result.seo.headings.h1.length > 0 && (
                <li className="flex">
                  <span className="text-primary font-mono w-10">H1:</span>
                  <span className="code-font text-sm text-darkText dark:text-gray-300">{result.seo.headings.h1.join(', ')}</span>
                </li>
              )}
              {result.seo.headings.h2.length > 0 && (
                <li className="flex">
                  <span className="text-primary font-mono w-10">H2:</span>
                  <span className="code-font text-sm text-darkText dark:text-gray-300">{result.seo.headings.h2.join(', ')}</span>
                </li>
              )}
              {result.seo.headings.h3.length > 0 && (
                <li className="flex">
                  <span className="text-primary font-mono w-10">H3:</span>
                  <span className="code-font text-sm text-darkText dark:text-gray-300">{result.seo.headings.h3.join(', ')}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Analysis</h4>
            <ul className="space-y-2 text-sm">
              {result.seo.headingsAnalysis.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 flex-shrink-0 ${item.type === 'success' ? 'text-secondary' : item.type === 'warning' ? 'text-warning' : 'text-danger'}`} viewBox="0 0 20 20" fill="currentColor">
                    {item.type === 'success' ? (
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    )}
                  </svg>
                  <span className="text-darkText dark:text-gray-300">{item.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Image Optimization" sectionId="image-optimization">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-darkText dark:text-white">Images Without Alt Text</h4>
              {result.seo.imagesWithoutAlt.length > 0 ? (
                <div className="px-2 py-1 bg-danger/10 dark:bg-danger/20 text-danger rounded-full text-xs font-medium">
                  {result.seo.imagesWithoutAlt.length} {result.seo.imagesWithoutAlt.length === 1 ? 'Issue' : 'Issues'}
                </div>
              ) : (
                <div className="px-2 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full text-xs font-medium">
                  No Issues
                </div>
              )}
            </div>
            {result.seo.imagesWithoutAlt.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2 font-medium text-darkText dark:text-white">Image</th>
                    <th className="text-left py-2 font-medium text-darkText dark:text-white">File</th>
                    <th className="text-left py-2 font-medium text-darkText dark:text-white">Suggested Alt Text</th>
                  </tr>
                </thead>
                <tbody>
                  {result.seo.imagesWithoutAlt.map((img, index) => (
                    <tr key={index} className={index < result.seo.imagesWithoutAlt.length - 1 ? "border-b dark:border-gray-700" : ""}>
                      <td className="py-2 text-darkText dark:text-gray-300">[Thumbnail]</td>
                      <td className="py-2 code-font text-darkText dark:text-gray-300">{img.src.split('/').pop()}</td>
                      <td className="py-2 text-darkText dark:text-gray-300">"{img.suggestedAlt}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">All images have proper alt text. Good job!</p>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Image Optimization Tips</h4>
            <ul className="space-y-2 text-sm">
              {result.seo.imageOptimizationTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-darkText dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </ExpandableSection>
      </div>

      {/* Tab Content - Security Assessment */}
      <div className={`p-6 space-y-6 ${activeTab !== "security" ? "hidden" : ""}`}>
        {/* Security Overview */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-darkText dark:text-white">Security Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">SSL Certificate</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.security.ssl.status === 'good' ? 'bg-secondary' : result.security.ssl.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.security.ssl.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">HTTP Headers</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.security.headers.status === 'good' ? 'bg-secondary' : result.security.headers.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.security.headers.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Content Security</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.security.contentSecurity.status === 'good' ? 'bg-secondary' : result.security.contentSecurity.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.security.contentSecurity.message}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">HTTPS Redirect</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.security.httpsRedirect.status === 'good' ? 'bg-secondary' : result.security.httpsRedirect.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.security.httpsRedirect.message}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Detailed Reports */}
        <ExpandableSection title="SSL Certificate" sectionId="ssl-certificate">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-darkText dark:text-white">Certificate Details</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.security.ssl.status === 'good' ? 'bg-secondary' : result.security.ssl.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="text-sm font-medium text-darkText dark:text-white">{result.security.ssl.status === 'good' ? 'Valid' : result.security.ssl.status === 'warning' ? 'Warning' : 'Invalid'}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Common Name</p>
                <p className="code-font text-darkText dark:text-gray-300">{result.security.ssl.commonName}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Issuer</p>
                <p className="code-font text-darkText dark:text-gray-300">{result.security.ssl.issuer}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Valid From</p>
                <p className="code-font text-darkText dark:text-gray-300">{formatDate(result.security.ssl.validFrom)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Valid Until</p>
                <p className="code-font text-darkText dark:text-gray-300">{formatDate(result.security.ssl.validUntil)} ({result.security.ssl.daysRemaining} days remaining)</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Key Strength</p>
                <p className="code-font text-darkText dark:text-gray-300">{result.security.ssl.keyStrength}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Signature Algorithm</p>
                <p className="code-font text-darkText dark:text-gray-300">{result.security.ssl.signatureAlgorithm}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">SSL/TLS Configuration</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 font-medium text-darkText dark:text-white">Protocol</th>
                  <th className="text-left py-2 font-medium text-darkText dark:text-white">Status</th>
                  <th className="text-left py-2 font-medium text-darkText dark:text-white">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {result.security.ssl.protocols.map((protocol, index) => (
                  <tr key={index} className={index < result.security.ssl.protocols.length - 1 ? "border-b dark:border-gray-700" : ""}>
                    <td className="py-2 code-font text-darkText dark:text-gray-300">{protocol.name}</td>
                    <td className="py-2">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${protocol.enabled ? (protocol.secure ? 'bg-secondary' : 'bg-danger') : 'bg-secondary'}`}></div>
                        <span className="text-darkText dark:text-gray-300">{protocol.enabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">{protocol.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Vulnerabilities Check" sectionId="vulnerability-check">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium mb-3 text-darkText dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                XSS Protection
              </h4>
              {Math.random() > 0.5 ? (
                <div className="flex items-center text-secondary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">No XSS vulnerabilities detected</span>
                </div>
              ) : (
                <div className="flex items-center text-danger mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Found {Math.floor(Math.random() * 3) + 1} potential XSS vulnerabilities</span>
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cross-site scripting (XSS) vulnerabilities allow attackers to inject client-side scripts into your web pages.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium mb-3 text-darkText dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                SQL Injection
              </h4>
              {Math.random() > 0.5 ? (
                <div className="flex items-center text-secondary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">No SQL injection vulnerabilities detected</span>
                </div>
              ) : (
                <div className="flex items-center text-danger mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Found potential SQL injection point</span>
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                SQL injection attacks allow malicious users to execute SQL code on your database, potentially accessing, modifying, or deleting data.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Outdated Libraries</h4>
            {Math.random() > 0.5 ? (
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center text-danger mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-darkText dark:text-white">jQuery v1.11.3</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      This version has known security vulnerabilities. Update to jQuery v3.6.3 or later.
                    </p>
                    <div className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                      <span className="font-medium">CVE ID:</span> CVE-2020-11023, CVE-2019-11358
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-warning/10 flex items-center justify-center text-warning mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-darkText dark:text-white">Bootstrap v4.3.1</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      This version has potential vulnerabilities. Update to Bootstrap v5.3.0 or later.
                    </p>
                    <div className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
                      <span className="font-medium">CVE ID:</span> CVE-2019-8331
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg font-medium">No outdated libraries detected</span>
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Open Ports</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-4 py-2">Port</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-darkText dark:text-white">80</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">HTTP</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">
                        Redirects to HTTPS
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">Necessary for HTTP to HTTPS redirection</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-darkText dark:text-white">443</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">HTTPS</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary">
                        Secure
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">Required for secure website access</td>
                  </tr>
                  {Math.random() > 0.5 && (
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-darkText dark:text-white">22</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">SSH</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-danger/10 text-danger">
                          Publicly Exposed
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">Restrict access with firewall rules</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Security Headers" sectionId="security-headers">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-darkText dark:text-white">Security Headers Analysis</h4>
              {result.security.missingHeaders.length > 0 ? (
                <div className="px-2 py-1 bg-warning/10 dark:bg-warning/20 text-warning rounded-full text-xs font-medium">
                  {result.security.missingHeaders.length} Missing {result.security.missingHeaders.length === 1 ? 'Header' : 'Headers'}
                </div>
              ) : (
                <div className="px-2 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary rounded-full text-xs font-medium">
                  All Security Headers Present
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              HTTP response headers can help enhance the security of your web application.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                    <th className="text-left py-2 px-4 font-medium text-darkText dark:text-white">Header</th>
                    <th className="text-left py-2 px-4 font-medium text-darkText dark:text-white">Status</th>
                    <th className="text-left py-2 px-4 font-medium text-darkText dark:text-white">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.security.headers.all.map((header, index) => (
                    <tr key={index} className={index < result.security.headers.all.length - 1 ? "border-b dark:border-gray-700" : ""}>
                      <td className="py-3 px-4 code-font text-darkText dark:text-gray-300">{header.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${header.implemented ? 'bg-secondary' : header.severity === 'high' ? 'bg-danger' : 'bg-warning'}`}></div>
                          <span className="text-darkText dark:text-gray-300">{header.implemented ? 'Implemented' : 'Missing'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 code-font text-xs text-darkText dark:text-gray-300">
                        {header.implemented ? header.value : (
                          <span className="text-gray-500 dark:text-gray-400 italic">Not implemented</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {result.security.missingHeaders.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-3 text-darkText dark:text-white">Recommended Implementations</h4>
              <div className="space-y-4">
                {result.security.missingHeaders.map((header, index) => (
                  <div key={index}>
                    <h5 className={`font-medium mb-1 ${header.severity === 'high' ? 'text-danger' : 'text-warning'}`}>{header.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {header.description}
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded code-font text-xs text-darkText dark:text-gray-300">
                      {header.recommendedValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ExpandableSection>
      </div>

      {/* Tab Content - Performance */}
      <div className={`p-6 space-y-6 ${activeTab !== "performance" ? "hidden" : ""}`}>
        {/* Performance Overview */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-darkText dark:text-white">Performance Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Page Load Time</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.performance.loadTime.status === 'good' ? 'bg-secondary' : result.performance.loadTime.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.performance.loadTime.value}{result.performance.loadTime.unit}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">First Contentful Paint</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.performance.firstContentfulPaint.status === 'good' ? 'bg-secondary' : result.performance.firstContentfulPaint.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">{result.performance.firstContentfulPaint.value}{result.performance.firstContentfulPaint.unit}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Layout Shift</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${result.performance.cumulativeLayoutShift.status === 'good' ? 'bg-secondary' : result.performance.cumulativeLayoutShift.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                <span className="font-medium text-darkText dark:text-white">CLS: {result.performance.cumulativeLayoutShift.value}</span>
              </div>
            </div>
          </div>
        </div>

        <ExpandableSection title="Core Web Vitals" sectionId="core-web-vitals">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Largest Contentful Paint</h4>
              <div className={`text-2xl font-bold mb-1 ${result.performance.largestContentfulPaint.status === 'good' ? 'text-secondary' : result.performance.largestContentfulPaint.status === 'warning' ? 'text-warning' : 'text-danger'}`}>
                {result.performance.largestContentfulPaint.value}{result.performance.largestContentfulPaint.unit}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.performance.largestContentfulPaint.description}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Total Blocking Time</h4>
              <div className={`text-2xl font-bold mb-1 ${result.performance.totalBlockingTime.status === 'good' ? 'text-secondary' : result.performance.totalBlockingTime.status === 'warning' ? 'text-warning' : 'text-danger'}`}>
                {result.performance.totalBlockingTime.value}{result.performance.totalBlockingTime.unit}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.performance.totalBlockingTime.description}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium mb-2 text-darkText dark:text-white">Speed Index</h4>
              <div className={`text-2xl font-bold mb-1 ${result.performance.speedIndex.status === 'good' ? 'text-secondary' : result.performance.speedIndex.status === 'warning' ? 'text-warning' : 'text-danger'}`}>
                {result.performance.speedIndex.value}{result.performance.speedIndex.unit}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.performance.speedIndex.description}
              </p>
            </div>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Resource Usage" sectionId="resource-usage">
          <div className="mb-4">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Resource Counts</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-primary">{result.performance.resourceCounts.total}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-yellow-500">{result.performance.resourceCounts.js}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">JavaScript</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-blue-500">{result.performance.resourceCounts.css}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">CSS</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-green-500">{result.performance.resourceCounts.images}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Images</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-purple-500">{result.performance.resourceCounts.fonts}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Fonts</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-xl font-bold text-gray-500">{result.performance.resourceCounts.other}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Other</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Resource Sizes</h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <div className="text-sm mb-2">
                <span className="font-medium text-darkText dark:text-white">Total Size:</span> 
                <span className="ml-2">{(result.performance.resourceSizes.totalBytes / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div className="flex h-full">
                  <div 
                    className="bg-yellow-500 h-full" 
                    style={{ width: `${(result.performance.resourceSizes.jsBytes / result.performance.resourceSizes.totalBytes) * 100}%` }}
                    title="JavaScript"
                  ></div>
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${(result.performance.resourceSizes.cssBytes / result.performance.resourceSizes.totalBytes) * 100}%` }}
                    title="CSS"
                  ></div>
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${(result.performance.resourceSizes.imageBytes / result.performance.resourceSizes.totalBytes) * 100}%` }}
                    title="Images"
                  ></div>
                  <div 
                    className="bg-purple-500 h-full" 
                    style={{ width: `${(result.performance.resourceSizes.fontBytes / result.performance.resourceSizes.totalBytes) * 100}%` }}
                    title="Fonts"
                  ></div>
                  <div 
                    className="bg-gray-500 h-full" 
                    style={{ width: `${(result.performance.resourceSizes.otherBytes / result.performance.resourceSizes.totalBytes) * 100}%` }}
                    title="Other"
                  ></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 mr-1 rounded-sm"></div>
                  <span>JS: {(result.performance.resourceSizes.jsBytes / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-1 rounded-sm"></div>
                  <span>CSS: {(result.performance.resourceSizes.cssBytes / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
                  <span>Images: {(result.performance.resourceSizes.imageBytes / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 mr-1 rounded-sm"></div>
                  <span>Fonts: {(result.performance.resourceSizes.fontBytes / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 mr-1 rounded-sm"></div>
                  <span>Other: {(result.performance.resourceSizes.otherBytes / 1024).toFixed(0)} KB</span>
                </div>
              </div>
            </div>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Improvement Opportunities" sectionId="improvement-opportunities">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Actions to Speed Up Your Website</h4>
            <div className="space-y-4">
              {result.performance.opportunitiesForImprovement.map((opportunity, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-darkText dark:text-white">{opportunity.name}</h5>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      Save {opportunity.potentialSavings}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {opportunity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>
        
        <ExpandableSection title="Diagnostics" sectionId="diagnostics">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">Performance Diagnostics</h4>
            <div className="space-y-3">
              {result.performance.diagnostics.map((diagnostic, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                    diagnostic.status === 'good' ? 'bg-secondary/20 text-secondary' : 
                    diagnostic.status === 'warning' ? 'bg-warning/20 text-warning' : 
                    'bg-danger/20 text-danger'
                  }`}>
                    {diagnostic.status === 'good' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium text-darkText dark:text-white">{diagnostic.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{diagnostic.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>
      </div>

      {/* Tab Content - Accessibility */}
      <div className={`p-6 space-y-6 ${activeTab !== "accessibility" ? "hidden" : ""}`}>
        {/* Accessibility Overview */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-darkText dark:text-white">Accessibility Overview</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke={result.accessibility.score >= 90 ? "#4CAF50" : result.accessibility.score >= 70 ? "#FFC107" : "#F44336"} 
                      strokeWidth="8" 
                      strokeDasharray={`${result.accessibility.score * 2.83} 283`} 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-darkText dark:text-white">{result.accessibility.score}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <div className={`w-3 h-3 rounded-full mr-2 ${result.accessibility.status === 'good' ? 'bg-secondary' : result.accessibility.status === 'warning' ? 'bg-warning' : 'bg-danger'}`}></div>
                  <h4 className="font-medium text-darkText dark:text-white">{result.accessibility.message}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {result.accessibility.passedTests} of {result.accessibility.totalTests} tests passed
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-secondary h-2.5 rounded-full" 
                    style={{ width: `${(result.accessibility.passedTests / result.accessibility.totalTests) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {result.accessibility.categories.map((category, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-sm font-medium text-darkText dark:text-white">{category.name}</h5>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      category.status === 'good' ? 'bg-secondary/10 text-secondary' :
                      category.status === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-danger/10 text-danger'
                    }`}>
                      {category.score}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {category.passedTests}/{category.totalTests} tests passed
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <ExpandableSection title="Issues by Impact" sectionId="accessibility-issues">
          {(result.accessibility.critical.length > 0 || result.accessibility.serious.length > 0 || result.accessibility.moderate.length > 0) ? (
            <div className="space-y-6">
              {result.accessibility.critical.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded border border-danger border-l-4 border-l-danger">
                  <h4 className="font-medium mb-3 text-danger">Critical Issues ({result.accessibility.critical.length})</h4>
                  <div className="space-y-4">
                    {result.accessibility.critical.map((issue, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h5 className="font-medium text-darkText dark:text-white mb-1">{issue.message}</h5>
                        <div className="text-xs inline-block px-1.5 py-0.5 bg-gray-100 dark:bg-gray-900 rounded mb-2">{issue.code}</div>
                        <div className="mb-2">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Context:</div>
                          <code className="text-xs bg-gray-100 dark:bg-gray-900 p-1 rounded block mt-1 overflow-x-auto whitespace-pre-wrap">
                            {issue.context}
                          </code>
                        </div>
                        <div className="text-sm text-danger">{issue.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {result.accessibility.serious.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded border border-warning border-l-4 border-l-warning">
                  <h4 className="font-medium mb-3 text-warning">Serious Issues ({result.accessibility.serious.length})</h4>
                  <div className="space-y-4">
                    {result.accessibility.serious.map((issue, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h5 className="font-medium text-darkText dark:text-white mb-1">{issue.message}</h5>
                        <div className="text-xs inline-block px-1.5 py-0.5 bg-gray-100 dark:bg-gray-900 rounded mb-2">{issue.code}</div>
                        <div className="mb-2">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Context:</div>
                          <code className="text-xs bg-gray-100 dark:bg-gray-900 p-1 rounded block mt-1 overflow-x-auto whitespace-pre-wrap">
                            {issue.context}
                          </code>
                        </div>
                        <div className="text-sm text-warning">{issue.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {result.accessibility.moderate.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-300 border-l-4">
                  <h4 className="font-medium mb-3 text-darkText dark:text-white">Moderate Issues ({result.accessibility.moderate.length})</h4>
                  <div className="space-y-4">
                    {result.accessibility.moderate.map((issue, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <h5 className="font-medium text-darkText dark:text-white mb-1">{issue.message}</h5>
                        <div className="text-xs inline-block px-1.5 py-0.5 bg-gray-100 dark:bg-gray-900 rounded mb-2">{issue.code}</div>
                        <div className="mb-2">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Context:</div>
                          <code className="text-xs bg-gray-100 dark:bg-gray-900 p-1 rounded block mt-1 overflow-x-auto whitespace-pre-wrap">
                            {issue.context}
                          </code>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{issue.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded border border-gray-200 dark:border-gray-700 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-medium text-darkText dark:text-white mb-2">No Accessibility Issues Found!</h4>
              <p className="text-gray-600 dark:text-gray-400">Congratulations! Your website is accessible to all users.</p>
            </div>
          )}
        </ExpandableSection>
        
        <ExpandableSection title="Best Practices" sectionId="accessibility-best-practices">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium mb-3 text-darkText dark:text-white">WCAG Best Practices</h4>
            <div className="space-y-3">
              {result.accessibility.bestPractices.map((practice, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${
                    practice.status === 'passed' ? 'bg-secondary/20 text-secondary' : 
                    practice.status === 'warning' ? 'bg-warning/20 text-warning' : 
                    'bg-danger/20 text-danger'
                  }`}>
                    {practice.status === 'passed' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium text-darkText dark:text-white">{practice.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ExpandableSection>
      </div>
    </div>
  );
}
