import { useState } from "react";
import Header from "@/components/Header";
import ScanForm from "@/components/ScanForm";
import FeatureHighlights from "@/components/FeatureHighlights";
import ScanningProcess from "@/components/ScanningProcess";
import ResultsPanel from "@/components/ResultsPanel";
import Marketing from "@/components/Marketing";
import Footer from "@/components/Footer";
import { useScan } from "@/hooks/useScan";

export default function Home() {
  const {
    isScanning,
    progress,
    scanUrl,
    scanResult,
    startScan,
    resetScan
  } = useScan();

  const handleScanSubmit = (url: string) => {
    startScan(url);
  };

  const handleNewScan = () => {
    resetScan();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-12 flex-grow">
        {/* Hero Section with Scan Form */}
        <section className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-darkText dark:text-white">
              Comprehensive Website Analysis
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Get detailed SEO insights and security assessments for any website in seconds.
            </p>
            
            {/* Only show scan form if not already scanning or showing results */}
            {!isScanning && !scanResult && (
              <ScanForm onSubmit={handleScanSubmit} isScanning={isScanning} />
            )}
          </div>
        </section>
        
        {/* Scanning Process - show only when actively scanning */}
        {isScanning && (
          <ScanningProcess url={scanUrl} progress={progress} />
        )}
        
        {/* Results Panel - show only when scan is completed */}
        {scanResult && (
          <ResultsPanel result={scanResult} onNewScan={handleNewScan} />
        )}
        
        {/* Feature Highlights - only show when not displaying results */}
        {!scanResult && (
          <FeatureHighlights />
        )}
        
        {/* Marketing Section - only show when not scanning */}
        {!isScanning && (
          <Marketing />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
