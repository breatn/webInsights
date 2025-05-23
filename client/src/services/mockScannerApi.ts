import { ScanResult, StatusCheckResult, Status } from "@/types";

// This is a demonstration scanner that generates realistic results
// without making any external API calls

export async function analyzeSecurity(url: string): Promise<any> {
  return createMockSecurityResponse(url);
}

export async function analyzeSeo(url: string): Promise<any> {
  return createMockSeoResponse(url);
}

export async function analyzePerformance(url: string): Promise<any> {
  return createMockPerformanceResponse(url);
}

export async function analyzeAccessibility(url: string): Promise<any> {
  return createMockAccessibilityResponse(url);
}

export async function checkUrl(url: string): Promise<StatusCheckResult> {
  // For demo purposes, we'll simulate a successful response
  return {
    success: true,
    status: 200,
    url: url
  };
}

// Helper function to generate consistent mock data for the demo
function createMockSecurityResponse(url: string) {
  const isHttps = url.startsWith('https://');
  const domain = new URL(url).hostname;
  
  return {
    url: url,
    ssl: {
      valid: isHttps,
      certificate: {
        subject: domain,
        issuer: "Let's Encrypt Authority X3",
        validFrom: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),  // 90 days from now
        daysRemaining: 90
      },
      protocols: {
        tlsv1: false,
        tlsv11: true,
        tlsv12: true,
        tlsv13: true
      }
    },
    headers: {
      'Strict-Transport-Security': isHttps ? 'max-age=31536000; includeSubDomains' : null,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': null,
      'Referrer-Policy': null,
      'X-XSS-Protection': '1; mode=block',
      'Feature-Policy': null,
      'Permissions-Policy': null,
      'Cross-Origin-Embedder-Policy': null,
      'Cross-Origin-Opener-Policy': null,
      'Cross-Origin-Resource-Policy': null,
      'Clear-Site-Data': null
    },
    redirectToHttps: isHttps,
    vulnerabilities: {
      outdatedLibraries: [
        { 
          name: 'jQuery', 
          version: '1.11.3', 
          latestVersion: '3.6.3',
          severity: 'high',
          description: 'Using an outdated version of jQuery with known vulnerabilities'
        }
      ],
      xssVulnerabilities: {
        found: Math.random() > 0.7,
        count: Math.floor(Math.random() * 3),
        examples: [
          {
            location: '/search?q=',
            type: 'Reflective XSS',
            severity: 'high',
            details: 'User input is reflected without proper sanitization'
          }
        ]
      },
      sqlInjection: {
        found: Math.random() > 0.8,
        count: Math.floor(Math.random() * 2),
        examples: [
          {
            location: '/products?id=',
            severity: 'critical',
            details: 'Database query is vulnerable to SQL injection'
          }
        ]
      },
      openPorts: {
        count: Math.floor(Math.random() * 5) + 1,
        list: [
          { port: 80, service: 'HTTP', secure: false },
          { port: 443, service: 'HTTPS', secure: true }
        ]
      },
      misconfigurations: {
        directoryListing: Math.random() > 0.7,
        adminPanelExposed: Math.random() > 0.8,
        serverInfoLeakage: Math.random() > 0.5
      }
    }
  };
}

function createMockSeoResponse(url: string) {
  const domain = new URL(url).hostname;
  
  return {
    url: url,
    meta: {
      title: `${domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '')} | Home Page`,
      description: `${domain} offers a wide range of services including web development, digital marketing, and SEO optimization. Visit our website to learn more about our solutions.`,
      canonical: url,
      viewport: 'width=device-width, initial-scale=1.0',
      robots: 'index, follow',
      ogTitle: `${domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '')} - Official Website`,
      ogDescription: 'Learn more about our professional services and solutions',
      ogImage: `${url}/images/og-banner.jpg`,
      twitterCard: 'summary_large_image',
      twitterTitle: `${domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '')} | Official Site`,
      structuredData: Math.random() > 0.5
    },
    competitorAnalysis: {
      keyword: domain.includes('music') ? 'music app' : 'website scanner',
      searchResults: [
        {
          position: 1,
          url: 'https://www.topcompetitor.com',
          title: 'Industry Leading Solution | Professional Services',
          description: 'The most comprehensive solution for your needs with advanced features and excellent customer support.',
          isSponsored: false
        },
        {
          position: 2,
          url: 'https://www.competitor2.com',
          title: 'Award-Winning Services | Expert Solutions',
          description: 'Trusted by thousands of clients worldwide. Get started today and see the difference.',
          isSponsored: false
        },
        {
          position: 3,
          url: 'https://www.sponsored-site.com',
          title: 'Premium Solutions | Limited Time Offer',
          description: 'Special promotional rates for new customers. Sign up now and save 50%.',
          isSponsored: true
        },
        {
          position: domain.includes('music') ? 18 : 12,
          url: url,
          title: `${domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '')} | Home Page`,
          description: `${domain} offers a wide range of services including web development, digital marketing, and SEO optimization.`,
          isSponsored: false
        }
      ],
      keyFactors: [
        {
          factor: 'Content Quality',
          description: 'Top competitors have more comprehensive and in-depth content that addresses user intent.',
          importance: 'high',
          yourStatus: 'warning' as Status,
          competitorStatus: 'good' as Status,
          improvement: 'Create more comprehensive content with expert insights and detailed explanations.'
        },
        {
          factor: 'Backlink Profile',
          description: 'Leading sites have more high-quality backlinks from authoritative domains.',
          importance: 'high',
          yourStatus: 'danger' as Status,
          competitorStatus: 'good' as Status,
          improvement: 'Build relationships with industry publications and earn quality backlinks.'
        },
        {
          factor: 'Page Speed',
          description: 'Your site loads slower than top competitors, affecting user experience and rankings.',
          importance: 'medium',
          yourStatus: 'warning' as Status,
          competitorStatus: 'good' as Status,
          improvement: 'Optimize images, reduce JavaScript, and implement browser caching.'
        },
        {
          factor: 'Mobile Optimization',
          description: 'Your mobile experience is good but could be improved to match top competitors.',
          importance: 'medium',
          yourStatus: 'good' as Status,
          competitorStatus: 'good' as Status,
          improvement: 'Ensure touch elements are properly sized and spaced for mobile users.'
        },
        {
          factor: 'Keyword Optimization',
          description: 'Top pages use keywords more strategically in titles, headings, and content.',
          importance: 'medium',
          yourStatus: 'warning' as Status,
          competitorStatus: 'good' as Status,
          improvement: 'Improve keyword placement in title tags, H1s, and early in your content.'
        }
      ],
      contentGap: {
        missingKeywords: ['professional', 'expert', 'advanced', 'comprehensive', 'solution'],
        missingTopics: ['Case Studies', 'Success Stories', 'Industry Insights', 'Expert Guides'],
        recommendations: [
          'Add detailed case studies showcasing successful client outcomes',
          'Create expert guides addressing common industry challenges',
          'Develop a resources section with downloadable tools and templates',
          'Include customer testimonials and reviews prominently on the site'
        ]
      },
      technicalComparison: {
        loadSpeed: {
          yours: '3.8s',
          competitor: '1.9s',
          difference: '1.9s slower'
        },
        mobileOptimization: {
          yours: 'good' as Status,
          competitor: 'good' as Status
        },
        backlinks: {
          yours: 45,
          competitor: 870,
          qualityAssessment: 'Your backlinks are primarily from lower authority domains'
        }
      }
    },
    headings: {
      h1: [`${domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '')} - Professional Services`],
      h2: ['Our Services', 'About Us', 'Client Testimonials'],
      h3: ['Web Development', 'Digital Marketing', 'SEO']
    },
    images: {
      total: 12,
      withAlt: 8,
      withoutAlt: [
        { src: `${url}/images/hero-banner.jpg`, dimensions: '1200x600' },
        { src: `${url}/images/service-1.png`, dimensions: '400x300' },
        { src: `${url}/images/service-2.png`, dimensions: '400x300' },
        { src: `${url}/images/logo-footer.png`, dimensions: '150x50' }
      ]
    },
    links: {
      total: 32,
      internal: 24,
      external: 8,
      broken: Math.floor(Math.random() * 3),
      nofollow: 5
    },
    keywords: {
      density: {
        'service': 4.2,
        'professional': 3.8,
        'solutions': 2.9,
        'quality': 2.1,
        'expert': 1.8
      },
      metaKeywords: Math.random() > 0.6,
      titleIncludes: Math.random() > 0.3,
      h1Includes: Math.random() > 0.4
    },
    textToHtmlRatio: Math.floor(Math.random() * 20) + 25,
    readabilityScore: Math.floor(Math.random() * 30) + 60,
    loadSpeed: {
      googlePageSpeed: Math.floor(Math.random() * 30) + 60,
      serverResponseTime: Math.floor(Math.random() * 400) + 100
    },
    mobileOptimization: {
      viewport: true,
      responsiveDesign: Math.random() > 0.3,
      tapTargets: Math.random() > 0.4,
      fontSizes: Math.random() > 0.5
    },
    schema: {
      present: Math.random() > 0.4,
      types: ['Organization', 'WebPage'],
      errors: Math.random() > 0.7 ? ['Missing required field: url in WebPage'] : []
    }
  };
}

function createMockPerformanceResponse(url: string) {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(2);
  
  // Simulate different performance for different domains
  const domain = new URL(url).hostname;
  const isPopularDomain = domain.includes('google') || domain.includes('facebook') || domain.includes('amazon');
  
  // Generate metrics based on domain "quality"
  const loadTime = isPopularDomain ? randomFloat(1.2, 2.5) : randomFloat(2.5, 5.5);
  const fcp = isPopularDomain ? randomFloat(0.8, 1.5) : randomFloat(1.5, 3.0);
  const lcp = isPopularDomain ? randomFloat(1.5, 2.5) : randomFloat(2.5, 4.5);
  const cls = isPopularDomain ? randomFloat(0.01, 0.05) : randomFloat(0.05, 0.25);
  const tbt = isPopularDomain ? randomFloat(50, 150) : randomFloat(150, 600);
  const speedIndex = isPopularDomain ? randomFloat(1.5, 3) : randomFloat(3, 7);
  
  // Resource counts based on site "complexity"
  const jsCount = isPopularDomain ? randomInt(15, 25) : randomInt(5, 15);
  const cssCount = isPopularDomain ? randomInt(3, 8) : randomInt(2, 5);
  const imageCount = isPopularDomain ? randomInt(20, 40) : randomInt(5, 20);
  const fontCount = randomInt(1, 4);
  const otherCount = randomInt(2, 10);
  const totalCount = jsCount + cssCount + imageCount + fontCount + otherCount;
  
  // Resource sizes in bytes
  const jsBytes = jsCount * randomInt(50000, 200000);
  const cssBytes = cssCount * randomInt(10000, 50000);
  const imageBytes = imageCount * randomInt(20000, 100000);
  const fontBytes = fontCount * randomInt(20000, 80000);
  const otherBytes = otherCount * randomInt(5000, 20000);
  const totalBytes = jsBytes + cssBytes + imageBytes + fontBytes + otherBytes;
  
  // Create opportunities for improvement based on metrics
  const opportunities = [];
  if (imageBytes > 500000) {
    opportunities.push({
      name: 'Properly size images',
      description: 'Serve images that are appropriately-sized to save cellular data and improve load time.',
      potentialSavings: `${Math.round(imageBytes * 0.6 / 1024)}KB`
    });
  }
  
  if (jsBytes > 1000000) {
    opportunities.push({
      name: 'Reduce JavaScript execution time',
      description: 'Consider reducing the time spent parsing, compiling, and executing JS.',
      potentialSavings: `${Math.round(tbt * 0.7)}ms`
    });
  }
  
  if (cssBytes > 100000) {
    opportunities.push({
      name: 'Eliminate render-blocking resources',
      description: 'Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.',
      potentialSavings: `${Math.round(fcp * 0.4 * 1000)}ms`
    });
  }
  
  if (!isPopularDomain) {
    opportunities.push({
      name: 'Serve images in next-gen formats',
      description: 'Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.',
      potentialSavings: `${Math.round(imageBytes * 0.4 / 1024)}KB`
    });
  }
  
  if (tbt > 300) {
    opportunities.push({
      name: 'Minimize main-thread work',
      description: 'Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this.',
      potentialSavings: `${Math.round(tbt * 0.5)}ms`
    });
  }
  
  // Create diagnostics based on metrics
  const diagnostics = [];
  
  diagnostics.push({
    name: 'First Contentful Paint',
    status: fcp < 2 ? 'good' as Status : fcp < 4 ? 'warning' as Status : 'danger' as Status,
    message: `${fcp}s - ${fcp < 2 ? 'Good' : fcp < 4 ? 'Needs Improvement' : 'Poor'}`
  });
  
  diagnostics.push({
    name: 'First Meaningful Paint',
    status: fcp < 2.5 ? 'good' as Status : fcp < 4.5 ? 'warning' as Status : 'danger' as Status,
    message: `${(fcp * 1.2).toFixed(1)}s - ${fcp < 2.5 ? 'Good' : fcp < 4.5 ? 'Needs Improvement' : 'Poor'}`
  });
  
  diagnostics.push({
    name: 'Resources Size',
    status: (totalBytes / 1024 / 1024) < 2 ? 'good' as Status : (totalBytes / 1024 / 1024) < 5 ? 'warning' as Status : 'danger' as Status,
    message: `Total size of ${(totalBytes / 1024 / 1024).toFixed(1)}MB may ${(totalBytes / 1024 / 1024) < 2 ? 'be reasonable' : 'slow down page loads'}`
  });
  
  diagnostics.push({
    name: 'Resource Requests',
    status: totalCount < 50 ? 'good' as Status : totalCount < 80 ? 'warning' as Status : 'danger' as Status,
    message: `${totalCount} requests - ${totalCount < 50 ? 'Good' : totalCount < 80 ? 'Consider reducing' : 'Too many requests'}`
  });
  
  return {
    url: url,
    loadTime: {
      value: loadTime,
      unit: 's',
      status: loadTime < 2.5 ? 'good' as Status : loadTime < 4 ? 'warning' as Status : 'danger' as Status,
      description: 'Total time to fully load and render the page'
    },
    firstContentfulPaint: {
      value: fcp,
      unit: 's',
      status: fcp < 2 ? 'good' as Status : fcp < 4 ? 'warning' as Status : 'danger' as Status,
      description: 'Time when the first text or image is painted'
    },
    largestContentfulPaint: {
      value: lcp,
      unit: 's',
      status: lcp < 2.5 ? 'good' as Status : lcp < 4 ? 'warning' as Status : 'danger' as Status,
      description: 'Time when the largest text or image is painted'
    },
    cumulativeLayoutShift: {
      value: cls.toFixed(2),
      unit: '',
      status: cls < 0.1 ? 'good' as Status : cls < 0.25 ? 'warning' as Status : 'danger' as Status,
      description: 'Measures visual stability as page elements move around during loading'
    },
    totalBlockingTime: {
      value: tbt,
      unit: 'ms',
      status: tbt < 200 ? 'good' as Status : tbt < 600 ? 'warning' as Status : 'danger' as Status,
      description: 'Sum of all time periods when the main thread was blocked'
    },
    speedIndex: {
      value: speedIndex,
      unit: 's',
      status: speedIndex < 3.4 ? 'good' as Status : speedIndex < 5.8 ? 'warning' as Status : 'danger' as Status,
      description: 'How quickly the contents of a page are visibly populated'
    },
    resourceCounts: {
      total: totalCount,
      js: jsCount,
      css: cssCount,
      images: imageCount,
      fonts: fontCount,
      other: otherCount
    },
    resourceSizes: {
      totalBytes: totalBytes,
      jsBytes: jsBytes,
      cssBytes: cssBytes,
      imageBytes: imageBytes,
      fontBytes: fontBytes,
      otherBytes: otherBytes
    },
    opportunitiesForImprovement: opportunities,
    diagnostics: diagnostics
  };
}

function createMockAccessibilityResponse(url: string) {
  // Simulate different accessibility scores for different domains
  const domain = new URL(url).hostname;
  const isSeriousDomain = domain.includes('gov') || domain.includes('edu') || domain.includes('org');
  
  // Generate better scores for "serious" domains
  const score = isSeriousDomain ? randomInt(85, 97) : randomInt(55, 85);
  const totalTests = randomInt(80, 100);
  const passedTests = Math.floor(totalTests * (score / 100));
  
  // Generate random critical issues
  const critical = isSeriousDomain ? [] : generateRandomIssues(randomInt(0, 2), 'critical');
  
  // Generate other issues with varying severity
  const serious = generateRandomIssues(isSeriousDomain ? randomInt(0, 3) : randomInt(2, 5), 'serious');
  const moderate = generateRandomIssues(randomInt(3, 8), 'moderate');
  const minor = generateRandomIssues(randomInt(4, 10), 'minor');
  
  // Generate categories with scores
  const categories = [
    {
      name: 'Perceivable',
      score: isSeriousDomain ? randomInt(85, 95) : randomInt(60, 85),
      passedTests: isSeriousDomain ? randomInt(20, 25) : randomInt(15, 20),
      totalTests: 25,
      status: (isSeriousDomain ? 'good' : (Math.random() > 0.5 ? 'good' : 'warning')) as Status
    },
    {
      name: 'Operable',
      score: isSeriousDomain ? randomInt(80, 95) : randomInt(55, 80),
      passedTests: isSeriousDomain ? randomInt(18, 22) : randomInt(12, 18),
      totalTests: 22,
      status: (isSeriousDomain ? 'good' : (Math.random() > 0.5 ? 'warning' : 'danger')) as Status
    },
    {
      name: 'Understandable',
      score: isSeriousDomain ? randomInt(90, 98) : randomInt(70, 90),
      passedTests: isSeriousDomain ? randomInt(15, 18) : randomInt(12, 15),
      totalTests: 18,
      status: (isSeriousDomain ? 'good' : (Math.random() > 0.7 ? 'good' : 'warning')) as Status
    },
    {
      name: 'Robust',
      score: isSeriousDomain ? randomInt(85, 95) : randomInt(60, 85),
      passedTests: isSeriousDomain ? randomInt(9, 12) : randomInt(6, 9),
      totalTests: 12,
      status: (isSeriousDomain ? 'good' : (Math.random() > 0.6 ? 'warning' : 'danger')) as Status
    }
  ];
  
  // Generate best practices
  const bestPractices = [
    {
      name: 'Language of Page',
      description: 'Specify the language of the page',
      status: 'passed'
    },
    {
      name: 'Focus Order',
      description: 'Focusable components receive focus in an order that preserves meaning',
      status: 'warning'
    },
    {
      name: 'Consistent Navigation',
      description: 'Navigation patterns are consistent across the site',
      status: 'passed'
    },
    {
      name: 'Error Identification',
      description: 'Form errors are clearly identified and described to users',
      status: isSeriousDomain ? 'failed' : 'warning'
    }
  ];
  
  return {
    url: url,
    score: score,
    passedTests: passedTests,
    totalTests: totalTests,
    status: score >= 90 ? 'good' as Status : score >= 70 ? 'warning' as Status : 'danger' as Status,
    message: score >= 90 
      ? 'Good accessibility practices' 
      : score >= 70 
        ? 'Some accessibility issues found' 
        : 'Significant accessibility concerns',
    critical: critical,
    serious: serious,
    moderate: moderate,
    minor: minor,
    categories: categories,
    bestPractices: bestPractices
  };
  
  // Helper function to generate random accessibility issues
  function generateRandomIssues(count: number, impact: 'critical' | 'serious' | 'moderate' | 'minor') {
    const issues = [];
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const possibleIssues = {
      critical: [
        {
          code: 'keyboard-trap',
          message: 'Keyboard trap found in custom widget',
          context: '<div id="custom-widget" class="interactive-element">Interactive Element</div>',
          selector: '#custom-widget',
          recommendation: 'Ensure users can navigate away from all focusable elements using keyboard only'
        },
        {
          code: 'missing-alt-text',
          message: 'Critical information conveyed by image with no alternative text',
          context: '<img src="/images/emergency-exit.png">',
          selector: 'img[src="/images/emergency-exit.png"]',
          recommendation: 'Add descriptive alt text to all informational images, especially those containing critical information'
        },
        {
          code: 'color-contrast-critical',
          message: 'Text has extremely poor contrast against background',
          context: '<div style="background-color: #e4e4e4;"><span style="color: #fafafa;">Very light text</span></div>',
          selector: 'div > span',
          recommendation: 'Ensure text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text'
        }
      ],
      serious: [
        {
          code: 'form-label-missing',
          message: 'Form input has no associated label',
          context: '<input type="text" name="username" placeholder="Username">',
          selector: 'input[name="username"]',
          recommendation: 'Add explicit labels for all form controls using <label> elements with for attributes'
        },
        {
          code: 'aria-hidden-focus',
          message: 'Focusable element contained in element with aria-hidden="true"',
          context: '<div aria-hidden="true"><button>Click me</button></div>',
          selector: 'div[aria-hidden="true"] > button',
          recommendation: 'Remove focusable elements from within aria-hidden containers'
        },
        {
          code: 'heading-order',
          message: 'Heading levels should only increase by one',
          context: '<h2>Section Title</h2><h4>Subsection</h4>',
          selector: 'h4',
          recommendation: 'Maintain proper heading hierarchy by using h1-h6 in sequential order'
        },
        {
          code: 'color-contrast',
          message: 'Insufficient contrast between text and background',
          context: '<div style="background-color: #f1f1f1;"><span style="color: #a3a3a3;">Low contrast text</span></div>',
          selector: 'div > span',
          recommendation: 'Increase contrast to meet WCAG AA standards (4.5:1 for normal text)'
        }
      ],
      moderate: [
        {
          code: 'link-name',
          message: 'Link has no discernible text',
          context: '<a href="/page"><img src="icon.png"></a>',
          selector: 'a[href="/page"]',
          recommendation: 'Ensure all links have descriptive text content or aria-label attributes'
        },
        {
          code: 'html-lang-missing',
          message: 'HTML element does not have a lang attribute',
          context: '<html>',
          selector: 'html',
          recommendation: 'Add a lang attribute to the HTML element (e.g., lang="en")'
        },
        {
          code: 'duplicate-id',
          message: 'Document contains multiple elements with the same id attribute',
          context: '<div id="nav-menu">...</div> ... <div id="nav-menu">...</div>',
          selector: '[id="nav-menu"]',
          recommendation: 'Ensure all id attributes are unique within the document'
        },
        {
          code: 'autocomplete-valid',
          message: 'Form field has invalid autocomplete attribute',
          context: '<input type="text" autocomplete="invalid-value">',
          selector: 'input[autocomplete="invalid-value"]',
          recommendation: 'Use valid values for the autocomplete attribute following the HTML specification'
        }
      ],
      minor: [
        {
          code: 'link-in-text-block',
          message: 'Links in blocks of text should be clearly distinguishable',
          context: '<p>Read more about our <a href="/services">services</a> here.</p>',
          selector: 'p > a',
          recommendation: 'Ensure links are distinguished from surrounding text by more than just color'
        },
        {
          code: 'meta-viewport',
          message: 'Meta viewport does not allow user scaling',
          context: '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
          selector: 'meta[name="viewport"]',
          recommendation: 'Allow users to scale content by removing user-scalable=no and fixed maximum-scale values'
        },
        {
          code: 'region',
          message: 'Some content is not contained within landmark regions',
          context: '<div>Content outside landmark</div>',
          selector: 'body > div',
          recommendation: 'Ensure all content is contained within appropriate landmark regions (header, nav, main, etc.)'
        },
        {
          code: 'target-size',
          message: 'Interactive elements should be large enough to touch',
          context: '<button style="width: 24px; height: 24px;">+</button>',
          selector: 'button',
          recommendation: 'Ensure interactive elements have touch targets of at least 44×44 pixels'
        }
      ]
    };
    
    for (let i = 0; i < count; i++) {
      if (possibleIssues[impact].length > 0) {
        const randomIndex = randomInt(0, possibleIssues[impact].length - 1);
        issues.push({...possibleIssues[impact][randomIndex], impact});
        // Remove the used issue to avoid duplicates
        possibleIssues[impact].splice(randomIndex, 1);
      }
    }
    
    return issues;
  }
  
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Performs a comprehensive scan of the provided URL
 * @param url URL to analyze
 * @returns Complete scan results with scores and detailed findings
 */
export async function performFullScan(url: string): Promise<ScanResult> {
  try {
    // First check if URL is valid and accessible
    await checkUrl(url);
    
    // Perform each analysis in parallel
    const [securityResults, seoResults, performanceResults, accessibilityResults] = await Promise.all([
      analyzeSecurity(url),
      analyzeSeo(url),
      analyzePerformance(url),
      analyzeAccessibility(url)
    ]);
    
    // Process results into a unified format
    return processResults(url, securityResults, seoResults, performanceResults, accessibilityResults);
  } catch (error) {
    console.error("Error during website scan:", error);
    throw error;
  }
}

/**
 * Processes the individual scan results into a unified format
 */
function processResults(url: string, securityResults: any, seoResults: any, performanceResults: any, accessibilityResults: any): ScanResult {
  // Calculate scores
  const securityScore = calculateSecurityScore(securityResults);
  const seoScore = calculateSeoScore(seoResults);
  // Calculate performance score based on key metrics
  const performanceScore = Math.round(
    (performanceResults.loadTime.status === 'good' ? 30 : performanceResults.loadTime.status === 'warning' ? 20 : 10) +
    (performanceResults.firstContentfulPaint.status === 'good' ? 25 : performanceResults.firstContentfulPaint.status === 'warning' ? 15 : 5) +
    (performanceResults.largestContentfulPaint.status === 'good' ? 25 : performanceResults.largestContentfulPaint.status === 'warning' ? 15 : 5) +
    (performanceResults.cumulativeLayoutShift.status === 'good' ? 20 : performanceResults.cumulativeLayoutShift.status === 'warning' ? 10 : 5)
  );
  const accessibilityScore = accessibilityResults.score;
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (securityScore * 0.25) + 
    (seoScore * 0.25) + 
    (performanceScore * 0.25) + 
    (accessibilityScore * 0.25)
  );
  
  // Process detailed results for each category
  const securityData = {
    ssl: processSslResults(securityResults),
    headers: processHeaderResults(securityResults),
    contentSecurity: {
      status: securityResults.headers['Content-Security-Policy'] ? 'good' as Status : 'warning' as Status,
      message: securityResults.headers['Content-Security-Policy'] ? 
        'Content Security Policy implemented' : 
        'No Content Security Policy found'
    },
    httpsRedirect: {
      status: securityResults.redirectToHttps ? 'good' as Status : 'danger' as Status,
      message: securityResults.redirectToHttps ? 
        'Site properly redirects to HTTPS' : 
        'Site does not redirect to HTTPS'
    },
    missingHeaders: getMissingSecurityHeaders(securityResults)
  };
  
  // Process SEO data
  const seoData = {
    metaTitle: {
      value: seoResults.meta.title || '',
      status: (seoResults.meta.title && seoResults.meta.title.length > 10 && seoResults.meta.title.length < 70 ? 'good' : 'warning') as Status,
      message: seoResults.meta.title && seoResults.meta.title.length > 10 && seoResults.meta.title.length < 70 ? 
        'Good title length' : 
        'Title length issue',
      suggestion: seoResults.meta.title && seoResults.meta.title.length > 10 && seoResults.meta.title.length < 70 ? 
        undefined : 
        seoResults.meta.title.length <= 10 ? 'Title is too short' : 'Title is too long'
    },
    metaDescription: {
      value: seoResults.meta.description || '',
      status: (seoResults.meta.description && seoResults.meta.description.length > 50 && seoResults.meta.description.length < 160 ? 'good' : 'warning') as Status,
      message: seoResults.meta.description && seoResults.meta.description.length > 50 && seoResults.meta.description.length < 160 ? 
        'Good description length' : 
        'Description length issue',
      suggestion: seoResults.meta.description && seoResults.meta.description.length > 50 && seoResults.meta.description.length < 160 ? 
        undefined : 
        seoResults.meta.description.length <= 50 ? 'Description is too short' : 'Description is too long'
    },
    headings: {
      status: (seoResults.headings.h1 && seoResults.headings.h1.length === 1 ? 'good' : 'warning') as Status,
      message: seoResults.headings.h1 && seoResults.headings.h1.length === 1 ? 
        'Proper heading structure' : 
        seoResults.headings.h1.length === 0 ? 'Missing H1 heading' : 'Multiple H1 headings found',
      h1: seoResults.headings.h1,
      h2: seoResults.headings.h2,
      h3: seoResults.headings.h3
    },
    headingsAnalysis: generateHeadingsAnalysis(seoResults.headings),
    images: {
      status: (seoResults.images.withoutAlt.length === 0 ? 'good' : 'warning') as Status,
      message: seoResults.images.withoutAlt.length === 0 ? 
        'All images have alt text' : 
        `${seoResults.images.withoutAlt.length} image${seoResults.images.withoutAlt.length === 1 ? '' : 's'} missing alt text`,
      total: seoResults.images.total,
      withAlt: seoResults.images.withAlt,
      withoutAlt: seoResults.images.withoutAlt.length
    },
    canonical: {
      value: seoResults.meta.canonical || '',
      status: (seoResults.meta.canonical ? 'good' : 'warning') as Status,
      message: seoResults.meta.canonical ? 'Canonical URL specified' : 'No canonical URL found'
    },
    viewport: {
      value: seoResults.meta.viewport || '',
      status: (seoResults.meta.viewport ? 'good' : 'warning') as Status,
      message: seoResults.meta.viewport ? 'Viewport meta tag specified' : 'No viewport meta tag found'
    },
    imagesWithoutAlt: seoResults.images.withoutAlt.map((img: any) => ({
      src: img.src,
      dimensions: img.dimensions,
      suggestedAlt: img.dimensions ? `Image of ${url.replace(/^https?:\/\//, '').split('/')[0]} with dimensions ${img.dimensions}` : `Image from ${url.replace(/^https?:\/\//, '').split('/')[0]}`
    })),
    imageOptimizationTips: [
      'Use descriptive file names for images',
      'Compress images to reduce file size',
      'Use responsive image attributes (srcset, sizes)',
      'Consider using WebP or AVIF formats for better compression'
    ],
    competitorAnalysis: seoResults.competitorAnalysis
  };
  
  return {
    url,
    scanDate: new Date(),
    scores: {
      overall: overallScore,
      security: securityScore,
      seo: seoScore,
      performance: performanceScore,
      accessibility: accessibilityScore
    },
    security: securityData,
    seo: seoData,
    performance: processPerformanceResults(performanceResults),
    accessibility: processAccessibilityResults(accessibilityResults)
  };
}

/**
 * Calculate security score based on security results
 */
function calculateSecurityScore(securityResults: any): number {
  let score = 100;
  
  // Deduct for missing security headers
  const headerWeights: Record<string, number> = {
    'Strict-Transport-Security': 15,
    'Content-Security-Policy': 15,
    'X-Content-Type-Options': 5,
    'X-Frame-Options': 10,
    'Referrer-Policy': 5,
    'Permissions-Policy': 5
  };
  
  Object.entries(headerWeights).forEach(([header, weight]) => {
    if (!securityResults.headers[header]) {
      score -= weight;
    }
  });
  
  // Deduct if no HTTPS
  if (!securityResults.ssl.valid) {
    score -= 30;
  }
  
  // Deduct for vulnerabilities
  if (securityResults.vulnerabilities) {
    if (securityResults.vulnerabilities.xssVulnerabilities && securityResults.vulnerabilities.xssVulnerabilities.found) {
      score -= 10 + (securityResults.vulnerabilities.xssVulnerabilities.count * 5);
    }
    
    if (securityResults.vulnerabilities.sqlInjection && securityResults.vulnerabilities.sqlInjection.found) {
      score -= 15 + (securityResults.vulnerabilities.sqlInjection.count * 7);
    }
    
    if (securityResults.vulnerabilities.outdatedLibraries) {
      score -= securityResults.vulnerabilities.outdatedLibraries.length * 5;
    }
    
    if (securityResults.vulnerabilities.misconfigurations) {
      if (securityResults.vulnerabilities.misconfigurations.directoryListing) score -= 8;
      if (securityResults.vulnerabilities.misconfigurations.adminPanelExposed) score -= 12;
      if (securityResults.vulnerabilities.misconfigurations.serverInfoLeakage) score -= 5;
    }
  }
  
  // Ensure score is within bounds
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculate SEO score based on SEO results
 */
function calculateSeoScore(seoResults: any): number {
  let score = 100;
  
  // Deduct for issues with meta tags
  const metaTitle = seoResults.meta.title || '';
  if (!metaTitle) {
    score -= 20;
  } else if (metaTitle.length < 10 || metaTitle.length > 70) {
    score -= metaTitle.length < 10 ? 15 : 10;
  }
  
  const metaDescription = seoResults.meta.description || '';
  if (!metaDescription) {
    score -= 15;
  } else if (metaDescription.length < 50 || metaDescription.length > 160) {
    score -= metaDescription.length < 50 ? 10 : 8;
  }
  
  // Deduct for heading structure issues
  const h1s = seoResults.headings.h1;
  if (!h1s || h1s.length === 0) {
    score -= 15;
  } else if (h1s.length > 1) {
    score -= 8;
  }
  
  // Deduct for images without alt text
  if (seoResults.images.total > 0) {
    const altTextPercentage = seoResults.images.withAlt / seoResults.images.total;
    if (altTextPercentage < 1) {
      score -= Math.round((1 - altTextPercentage) * 15);
    }
  }
  
  // Deduct for missing canonical URL
  if (!seoResults.meta.canonical) {
    score -= 5;
  }
  
  // Deduct for missing viewport meta tag
  if (!seoResults.meta.viewport) {
    score -= 10;
  }
  
  // Deduct for missing or low keyword density
  if (!seoResults.keywords || Object.keys(seoResults.keywords.density).length < 3) {
    score -= 5;
  }
  
  // Deduct for text-to-HTML ratio
  if (seoResults.textToHtmlRatio < 10) {
    score -= 8;
  }
  
  // Ensure score is within bounds
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Process SSL results into a standardized format
 */
function processSslResults(securityResults: any) {
  const result = {
    status: 'danger' as Status,
    message: 'No HTTPS detected',
    commonName: 'None',
    issuer: 'None',
    validFrom: new Date(),
    validUntil: new Date(),
    daysRemaining: 0,
    keyStrength: 'None',
    signatureAlgorithm: 'None',
    protocols: [] as any[]
  };
  
  if (securityResults.ssl.valid) {
    const cert = securityResults.ssl.certificate;
    const daysRemaining = cert.daysRemaining;
    
    // Determine status
    let status: Status = 'good';
    let message = 'Valid SSL certificate';
    
    if (daysRemaining < 30) {
      status = 'danger';
      message = `Certificate expires in ${daysRemaining} days`;
    } else if (daysRemaining < 90) {
      status = 'warning';
      message = `Certificate expires in ${daysRemaining} days`;
    }
    
    result.status = status;
    result.message = message;
    result.commonName = cert.subject;
    result.issuer = cert.issuer;
    result.validFrom = new Date(cert.validFrom);
    result.validUntil = new Date(cert.validTo);
    result.daysRemaining = daysRemaining;
    result.keyStrength = 'RSA 2048-bit'; // Simulated value
    result.signatureAlgorithm = 'SHA-256 with RSA'; // Simulated value
    
    // Process protocol information
    result.protocols = [
      {
        name: 'TLSv1.0',
        enabled: securityResults.ssl.protocols.tlsv1 || false,
        secure: false,
        recommendation: 'Should be disabled for security'
      },
      {
        name: 'TLSv1.1',
        enabled: securityResults.ssl.protocols.tlsv11 || false,
        secure: false,
        recommendation: 'Should be disabled for security'
      },
      {
        name: 'TLSv1.2',
        enabled: securityResults.ssl.protocols.tlsv12 || false,
        secure: true,
        recommendation: 'Recommended secure protocol'
      },
      {
        name: 'TLSv1.3',
        enabled: securityResults.ssl.protocols.tlsv13 || false,
        secure: true,
        recommendation: 'Best available secure protocol'
      }
    ];
  }
  
  return result;
}

/**
 * Process security headers into a standardized format
 */
function processHeaderResults(securityResults: any) {
  const headersData = securityResults.headers;
  const headersList = [
    {
      name: 'Strict-Transport-Security',
      implemented: !!headersData['Strict-Transport-Security'],
      value: headersData['Strict-Transport-Security'] || '',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'HSTS helps protect your website against protocol downgrade attacks and cookie hijacking.',
      recommendedValue: 'max-age=31536000; includeSubDomains'
    },
    {
      name: 'X-Content-Type-Options',
      implemented: !!headersData['X-Content-Type-Options'],
      value: headersData['X-Content-Type-Options'] || '',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Prevents browsers from MIME-sniffing a response from the declared content-type.',
      recommendedValue: 'nosniff'
    },
    {
      name: 'X-Frame-Options',
      implemented: !!headersData['X-Frame-Options'],
      value: headersData['X-Frame-Options'] || '',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'Protects your visitors against clickjacking attacks.',
      recommendedValue: 'SAMEORIGIN'
    },
    {
      name: 'Content-Security-Policy',
      implemented: !!headersData['Content-Security-Policy'],
      value: headersData['Content-Security-Policy'] || '',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'CSP helps prevent XSS attacks by specifying which dynamic resources are allowed to load.',
      recommendedValue: "default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' https://trusted-cdn.com; img-src 'self' data: https://*; font-src 'self' https://trusted-font-cdn.com;"
    },
    {
      name: 'Referrer-Policy',
      implemented: !!headersData['Referrer-Policy'],
      value: headersData['Referrer-Policy'] || '',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Controls how much referrer information should be included with requests.',
      recommendedValue: 'strict-origin-when-cross-origin'
    },
    {
      name: 'Permissions-Policy',
      implemented: !!headersData['Permissions-Policy'],
      value: headersData['Permissions-Policy'] || '',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Provides a mechanism to allow or deny the use of browser features in its own frame or in iframes.',
      recommendedValue: 'camera=(), microphone=(), geolocation=()'
    },
    {
      name: 'Cross-Origin-Resource-Policy',
      implemented: !!headersData['Cross-Origin-Resource-Policy'],
      value: headersData['Cross-Origin-Resource-Policy'] || '',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Prevents other websites from embedding your resources.',
      recommendedValue: 'same-origin'
    }
  ];
  
  // Calculate status based on missing headers
  const missingCount = headersList.filter(h => !h.implemented).length;
  let status: Status = 'good';
  let message = 'All security headers implemented';
  
  if (missingCount > 0) {
    const missingHighSeverity = headersList.filter(h => !h.implemented && h.severity === 'high').length;
    
    if (missingHighSeverity > 0) {
      status = 'danger';
      message = `Missing ${missingCount} security ${missingCount === 1 ? 'header' : 'headers'}, including critical ones`;
    } else {
      status = 'warning';
      message = `Missing ${missingCount} security ${missingCount === 1 ? 'header' : 'headers'}`;
    }
  }
  
  return {
    status,
    message,
    all: headersList
  };
}

/**
 * Get list of missing security headers
 */
function getMissingSecurityHeaders(securityResults: any) {
  const headersData = securityResults.headers;
  const missingHeaders = [];
  
  // Define important security headers to check
  const importantHeaders = [
    {
      name: 'Strict-Transport-Security',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'HSTS helps protect your website against protocol downgrade attacks and cookie hijacking.',
      recommendedValue: 'max-age=31536000; includeSubDomains'
    },
    {
      name: 'Content-Security-Policy',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'CSP helps prevent XSS attacks by specifying which dynamic resources are allowed to load.',
      recommendedValue: "default-src 'self'; script-src 'self' https://trusted-cdn.com;"
    },
    {
      name: 'X-Content-Type-Options',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Prevents browsers from MIME-sniffing a response from the declared content-type.',
      recommendedValue: 'nosniff'
    },
    {
      name: 'X-Frame-Options',
      severity: 'high' as 'high' | 'medium' | 'low',
      description: 'Protects your visitors against clickjacking attacks.',
      recommendedValue: 'SAMEORIGIN'
    },
    {
      name: 'Referrer-Policy',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Controls how much referrer information should be included with requests.',
      recommendedValue: 'strict-origin-when-cross-origin'
    },
    {
      name: 'Permissions-Policy',
      severity: 'medium' as 'high' | 'medium' | 'low',
      description: 'Provides a mechanism to allow or deny the use of browser features in its own frame or in iframes.',
      recommendedValue: 'camera=(), microphone=(), geolocation=()'
    }
  ];
  
  // Check which headers are missing
  importantHeaders.forEach(header => {
    if (!headersData[header.name]) {
      missingHeaders.push(header);
    }
  });
  
  return missingHeaders;
}

/**
 * Process performance results into a standardized format
 */
function processPerformanceResults(performanceResults: any): any {
  // performanceResults already has the correct structure from our mock
  return performanceResults;
}

/**
 * Process accessibility results into a standardized format
 */
function processAccessibilityResults(accessibilityResults: any): any {
  // accessibilityResults already has the correct structure from our mock
  return accessibilityResults;
}

/**
 * Generate analysis of heading structure
 */
function generateHeadingsAnalysis(headings: any) {
  const analysis = [];
  
  // Check for H1
  if (!headings.h1 || headings.h1.length === 0) {
    analysis.push({
      type: 'error',
      message: 'No H1 heading found. Each page should have exactly one H1 heading.'
    });
  } else if (headings.h1.length > 1) {
    analysis.push({
      type: 'warning',
      message: `${headings.h1.length} H1 headings found. Consider using only one H1 per page.`
    });
  } else {
    analysis.push({
      type: 'success',
      message: 'Page has exactly one H1 heading as recommended.'
    });
  }
  
  // Check H1 length
  if (headings.h1 && headings.h1.length > 0) {
    const h1Length = headings.h1[0].length;
    if (h1Length < 20 || h1Length > 70) {
      analysis.push({
        type: 'warning',
        message: `H1 is ${h1Length < 20 ? 'too short' : 'too long'} (${h1Length} characters). Aim for 20-70 characters.`
      });
    } else {
      analysis.push({
        type: 'success',
        message: 'H1 length is good (20-70 characters).'
      });
    }
  }
  
  // Check for H2
  if (!headings.h2 || headings.h2.length === 0) {
    analysis.push({
      type: 'warning',
      message: 'No H2 headings found. Consider adding H2 headings to structure your content.'
    });
  } else {
    analysis.push({
      type: 'success',
      message: `${headings.h2.length} H2 heading${headings.h2.length === 1 ? '' : 's'} found, which helps structure content.`
    });
  }
  
  // Check heading hierarchy
  if (headings.h3 && headings.h3.length > 0 && (!headings.h2 || headings.h2.length === 0)) {
    analysis.push({
      type: 'warning',
      message: 'H3 headings found but no H2 headings. This breaks proper heading hierarchy.'
    });
  }
  
  return analysis;
}