// Status types
export type Status = 'good' | 'warning' | 'danger';
export type ResultsTab = 'seo' | 'security' | 'performance' | 'accessibility';

// Interface for URL check results
export interface StatusCheckResult {
  success: boolean;
  status: number;
  url: string;
}

// SEO data types
export interface SeoMetaTag {
  value: string;
  status: Status;
  message: string;
  suggestion?: string;
}

export interface SeoHeadings {
  status: Status;
  message: string;
  h1: string[];
  h2: string[];
  h3: string[];
}

export interface HeadingAnalysisItem {
  type: 'success' | 'warning' | 'error';
  message: string;
}

export interface ImageWithoutAlt {
  src: string;
  dimensions?: string;
  suggestedAlt: string;
}

export interface SeoImages {
  status: Status;
  message: string;
  total: number;
  withAlt: number;
  withoutAlt: number;
}

// Security data types
export interface SecuritySsl {
  status: Status;
  message: string;
  commonName: string;
  issuer: string;
  validFrom: Date;
  validUntil: Date;
  daysRemaining: number;
  keyStrength: string;
  signatureAlgorithm: string;
  protocols: {
    name: string;
    enabled: boolean;
    secure: boolean;
    recommendation: string;
  }[];
}

export interface SecurityHeader {
  name: string;
  implemented: boolean;
  value: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendedValue: string;
}

export interface SecurityHeaders {
  status: Status;
  message: string;
  all: SecurityHeader[];
}

export interface SecurityStatus {
  status: Status;
  message: string;
}

// Missing header recommendations
export interface MissingHeader {
  name: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendedValue: string;
}

// Combined security data
export interface SecurityData {
  ssl: SecuritySsl;
  headers: SecurityHeaders;
  contentSecurity: SecurityStatus;
  httpsRedirect: SecurityStatus;
  missingHeaders: MissingHeader[];
}

// Combined SEO data
export interface CompetitorAnalysis {
  keyword: string;
  searchResults: Array<{
    position: number;
    url: string;
    title: string;
    description: string;
    isSponsored: boolean;
  }>;
  keyFactors: Array<{
    factor: string;
    description: string;
    importance: 'high' | 'medium' | 'low';
    yourStatus: Status;
    competitorStatus: Status;
    improvement: string;
  }>;
  contentGap: {
    missingKeywords: string[];
    missingTopics: string[];
    recommendations: string[];
  };
  technicalComparison: {
    loadSpeed: {
      yours: string;
      competitor: string;
      difference: string;
    };
    mobileOptimization: {
      yours: Status;
      competitor: Status;
    };
    backlinks: {
      yours: number;
      competitor: number;
      qualityAssessment: string;
    };
  };
}

export interface SeoData {
  metaTitle: SeoMetaTag;
  metaDescription: SeoMetaTag;
  headings: SeoHeadings;
  headingsAnalysis: HeadingAnalysisItem[];
  images: SeoImages;
  canonical: SeoMetaTag;
  viewport: SeoMetaTag;
  imagesWithoutAlt: ImageWithoutAlt[];
  imageOptimizationTips: string[];
  competitorAnalysis?: CompetitorAnalysis;
}

// Performance data types
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: Status;
  description: string;
}

export interface PerformanceData {
  status: Status;
  message: string;
  loadTime: PerformanceMetric;
  firstContentfulPaint: PerformanceMetric;
  speedIndex: PerformanceMetric;
  largestContentfulPaint: PerformanceMetric;
  totalBlockingTime: PerformanceMetric;
  cumulativeLayoutShift: PerformanceMetric;
  resourceCounts: {
    total: number;
    js: number;
    css: number;
    images: number;
    fonts: number;
    other: number;
  };
  resourceSizes: {
    totalBytes: number;
    jsBytes: number;
    cssBytes: number;
    imageBytes: number;
    fontBytes: number;
    otherBytes: number;
  };
  opportunitiesForImprovement: Array<{
    name: string;
    description: string;
    potentialSavings: string;
  }>;
  diagnostics: Array<{
    name: string; 
    status: Status;
    message: string;
  }>;
}

// Accessibility data types
export interface AccessibilityIssue {
  code: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  message: string;
  context: string;
  selector: string;
  recommendation: string;
}

export interface AccessibilityData {
  status: Status;
  message: string;
  score: number;
  passedTests: number;
  totalTests: number;
  critical: AccessibilityIssue[];
  serious: AccessibilityIssue[];
  moderate: AccessibilityIssue[];
  minor: AccessibilityIssue[];
  categories: {
    name: string;
    score: number;
    passedTests: number;
    totalTests: number;
    status: Status;
  }[];
  bestPractices: {
    name: string;
    description: string;
    status: 'passed' | 'failed' | 'warning';
  }[];
}

// Overall scores
export interface Scores {
  overall: number;
  security: number;
  seo: number;
  performance: number;
  accessibility: number;
}

// Complete scan result
export interface ScanResult {
  url: string;
  scanDate: Date;
  scores: Scores;
  security: SecurityData;
  seo: SeoData;
  performance: PerformanceData;
  accessibility: AccessibilityData;
}
