import { useState } from "react";
import { ScanResult } from "@/types";
import { performFullScan, checkUrl } from "@/services/scanApi";
import { useToast } from "@/hooks/use-toast";

export function useScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanUrl, setScanUrl] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const resetScan = () => {
    setScanResult(null);
    setScanUrl("");
    setProgress(0);
  };

  const startScan = async (url: string) => {
    try {
      // Start scanning process
      setIsScanning(true);
      setScanUrl(url);
      setProgress(0);
      setScanResult(null);

      // Simulate checking URL
      setProgress(10);
      const urlCheck = await checkUrl(url);
      if (!urlCheck.success) {
        throw new Error(`URL is not accessible: ${urlCheck.status}`);
      }
      
      // Simulate progress updates
      setProgress(25);
      
      // Start the scan
      const scanResultPromise = performFullScan(url);
      
      // Simulate progress updates while waiting for scan to complete
      let currentProgress = 25;
      const interval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += 5;
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
        }
      }, 300);
      
      // Wait for scan to complete
      const result = await scanResultPromise;
      
      // Clear interval and set final progress
      clearInterval(interval);
      setProgress(100);
      
      // Set results
      setScanResult(result);
      
      // Toast notification
      toast({
        title: "Scan complete",
        description: `Analysis of ${url} completed successfully.`,
      });
      
      // Reset scanning state
      setTimeout(() => {
        setIsScanning(false);
      }, 500);
      
      return result;
    } catch (error: any) {
      setIsScanning(false);
      
      // Show error toast
      toast({
        title: "Scan failed",
        description: error.message || "Failed to analyze the website. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  };

  return {
    isScanning,
    progress,
    scanUrl,
    scanResult,
    startScan,
    resetScan
  };
}
