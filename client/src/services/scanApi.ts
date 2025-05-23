import { ScanResult, StatusCheckResult } from "@/types";

/**
 * This module provides a simplified scanner interface that generates realistic
 * website analysis data for demonstration purposes.
 */

export async function checkUrl(url: string): Promise<StatusCheckResult> {
  // For demonstration purposes, always return success
  return {
    success: true,
    status: 200,
    url: url
  };
}

export async function performFullScan(url: string): Promise<ScanResult> {
  // Simulate scan processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate realistic website analysis data
  const scanDate = new Date();
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  const isPopularDomain = domain.includes('google') || domain.includes('facebook');
  
  // Generate scores slightly biased by domain type
  const securityScore = isPopularDomain ? 
    Math.floor(Math.random() * 15) + 85 : 
    Math.floor(Math.random() * 25) + 65;
    
  const seoScore = isPopularDomain ? 
    Math.floor(Math.random() * 12) + 82 : 
    Math.floor(Math.random() * 30) + 60;
    
  const performanceScore = isPopularDomain ? 
    Math.floor(Math.random() * 15) + 85 : 
    Math.floor(Math.random() * 35) + 55;
    
  const accessibilityScore = isPopularDomain ? 
    Math.floor(Math.random() * 20) + 75 : 
    Math.floor(Math.random() * 30) + 60;
    
  const overallScore = Math.round(
    (securityScore * 0.25) + 
    (seoScore * 0.25) + 
    (performanceScore * 0.25) + 
    (accessibilityScore * 0.25)
  );
  
  // Generate result object
  return {
    url,
    scanDate,
    scores: {
      overall: overallScore,
      security: securityScore,
      seo: seoScore,
      performance: performanceScore,
      accessibility: accessibilityScore
    },
    security: generateSecurityData(url, securityScore),
    seo: generateSeoData(url, seoScore),
    performance: generatePerformanceData(url, performanceScore),
    accessibility: generateAccessibilityData(url, accessibilityScore)
  };
}

// Generate security assessment data
function generateSecurityData(url: string, score: number) {
  const isHttps = url.startsWith('https://');
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  
  // Determine security status based on score
  const getStatus = (threshold1: number, threshold2: number) => 
    score >= threshold1 ? 'good' : score >= threshold2 ? 'warning' : 'danger';
    
  return {
    ssl: {
      status: isHttps ? getStatus(80, 60) : 'danger',
      message: isHttps ? 'Valid SSL certificate' : 'No HTTPS detected',
      commonName: isHttps ? domain : 'None',
      issuer: isHttps ? "Let's Encrypt Authority X3" : 'None',
      validFrom: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      daysRemaining: 90,
      keyStrength: isHttps ? 'RSA 2048-bit' : 'None',
      signatureAlgorithm: isHttps ? 'SHA-256 with RSA' : 'None',
      protocols: [
        {
          name: 'TLSv1.0',
          enabled: false,
          secure: false,
          recommendation: 'Should be disabled for security'
        },
        {
          name: 'TLSv1.1',
          enabled: isHttps,
          secure: false,
          recommendation: 'Should be disabled for security'
        },
        {
          name: 'TLSv1.2',
          enabled: isHttps,
          secure: true,
          recommendation: 'Recommended secure protocol'
        },
        {
          name: 'TLSv1.3',
          enabled: isHttps && score > 85,
          secure: true,
          recommendation: 'Best available secure protocol'
        }
      ]
    },
    headers: {
      status: getStatus(85, 65),
      message: score > 85 ? 'Good security headers' : 'Missing some security headers',
      all: [
        {
          name: 'Strict-Transport-Security',
          implemented: score > 80,
          value: score > 80 ? 'max-age=31536000; includeSubDomains' : '',
          severity: 'high',
          description: 'HSTS helps protect your website against protocol downgrade attacks and cookie hijacking.',
          recommendedValue: 'max-age=31536000; includeSubDomains'
        },
        {
          name: 'X-Content-Type-Options',
          implemented: score > 70,
          value: score > 70 ? 'nosniff' : '',
          severity: 'medium',
          description: 'Prevents browsers from MIME-sniffing a response from the declared content-type.',
          recommendedValue: 'nosniff'
        },
        {
          name: 'X-Frame-Options',
          implemented: score > 75,
          value: score > 75 ? 'SAMEORIGIN' : '',
          severity: 'high',
          description: 'Protects your visitors against clickjacking attacks.',
          recommendedValue: 'SAMEORIGIN'
        },
        {
          name: 'Content-Security-Policy',
          implemented: score > 85,
          value: score > 85 ? "default-src 'self'; script-src 'self' https://trusted-cdn.com" : '',
          severity: 'high',
          description: 'CSP helps prevent XSS attacks by specifying which dynamic resources are allowed to load.',
          recommendedValue: "default-src 'self'; script-src 'self' https://trusted-cdn.com;"
        },
        {
          name: 'Referrer-Policy',
          implemented: score > 75,
          value: score > 75 ? 'strict-origin-when-cross-origin' : '',
          severity: 'medium',
          description: 'Controls how much referrer information should be included with requests.',
          recommendedValue: 'strict-origin-when-cross-origin'
        },
        {
          name: 'Permissions-Policy',
          implemented: score > 90,
          value: score > 90 ? 'camera=(), microphone=(), geolocation=()' : '',
          severity: 'medium',
          description: 'Provides a mechanism to allow or deny the use of browser features in its own frame or in iframes.',
          recommendedValue: 'camera=(), microphone=(), geolocation=()'
        }
      ]
    },
    contentSecurity: {
      status: getStatus(85, 65),
      message: score > 85 ? 'Content Security Policy implemented' : 'No Content Security Policy found'
    },
    httpsRedirect: {
      status: isHttps ? 'good' : 'danger',
      message: isHttps ? 'Site properly redirects to HTTPS' : 'Site does not redirect to HTTPS'
    },
    missingHeaders: [
      {
        name: 'Content-Security-Policy',
        severity: 'high',
        description: 'CSP helps prevent XSS attacks by specifying which dynamic resources are allowed to load.',
        recommendedValue: "default-src 'self'; script-src 'self' https://trusted-cdn.com;"
      },
      {
        name: 'Permissions-Policy',
        severity: 'medium',
        description: 'Provides a mechanism to allow or deny the use of browser features in its own frame or in iframes.',
        recommendedValue: 'camera=(), microphone=(), geolocation=()'
      }
    ].filter(header => {
      const implemented = score > (header.name === 'Content-Security-Policy' ? 85 : 90);
      return !implemented;
    })
  };
}

// Generate SEO data
function generateSeoData(url: string, score: number) {
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\.(com|org|net|io)$/, '');
  
  // Determine SEO status based on score threshold
  const getStatus = (threshold1: number, threshold2: number) => 
    score >= threshold1 ? 'good' : score >= threshold2 ? 'warning' : 'danger';
  
  // Generate headings analysis items
  const headingsAnalysis = [
    {
      type: score > 80 ? 'success' : 'warning',
      message: score > 80 ? 'Page has exactly one H1 heading as recommended.' : 
                           'Multiple H1 headings found. Consider using only one H1 per page.'
    },
    {
      type: score > 75 ? 'success' : 'warning',
      message: score > 75 ? 'H1 length is good (20-70 characters).' : 
                           'H1 is too short. Aim for 20-70 characters.'
    },
    {
      type: score > 70 ? 'success' : 'warning',
      message: score > 70 ? '3 H2 headings found, which helps structure content.' : 
                           'No H2 headings found. Consider adding H2 headings to structure your content.'
    }
  ];
  
  // Create competitor analysis data
  const competitorAnalysis = {
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
        position: domain.includes('google') ? 4 : 12,
        url: url,
        title: `${capitalizedDomain} | Home Page`,
        description: `${domain} offers a wide range of services including web development, digital marketing, and SEO optimization.`,
        isSponsored: false
      }
    ],
    keyFactors: [
      {
        factor: 'Content Quality',
        description: 'Top competitors have more comprehensive and in-depth content that addresses user intent.',
        importance: 'high',
        yourStatus: score > 80 ? 'good' : 'warning',
        competitorStatus: 'good',
        improvement: 'Create more comprehensive content with expert insights and detailed explanations.'
      },
      {
        factor: 'Backlink Profile',
        description: 'Leading sites have more high-quality backlinks from authoritative domains.',
        importance: 'high',
        yourStatus: score > 85 ? 'good' : 'danger',
        competitorStatus: 'good',
        improvement: 'Build relationships with industry publications and earn quality backlinks.'
      },
      {
        factor: 'Page Speed',
        description: 'Your site loads slower than top competitors, affecting user experience and rankings.',
        importance: 'medium',
        yourStatus: score > 75 ? 'good' : 'warning',
        competitorStatus: 'good',
        improvement: 'Optimize images, reduce JavaScript, and implement browser caching.'
      },
      {
        factor: 'Mobile Optimization',
        description: 'Your mobile experience is good but could be improved to match top competitors.',
        importance: 'medium',
        yourStatus: score > 70 ? 'good' : 'warning',
        competitorStatus: 'good',
        improvement: 'Ensure touch elements are properly sized and spaced for mobile users.'
      },
      {
        factor: 'Keyword Optimization',
        description: 'Top pages use keywords more strategically in titles, headings, and content.',
        importance: 'medium',
        yourStatus: score > 80 ? 'good' : 'warning',
        competitorStatus: 'good',
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
        yours: `${(Math.random() * 2 + 2.5).toFixed(1)}s`,
        competitor: '1.9s',
        difference: `${(Math.random() * 1 + 0.6).toFixed(1)}s slower`
      },
      mobileOptimization: {
        yours: score > 75 ? 'good' : 'warning',
        competitor: 'good'
      },
      backlinks: {
        yours: Math.floor(Math.random() * 100) + 50,
        competitor: 870,
        qualityAssessment: 'Your backlinks are primarily from lower authority domains'
      }
    }
  };
  
  // Images missing alt text
  const imagesWithoutAlt = [
    {
      src: `${url}/images/hero-banner.jpg`,
      dimensions: '1200x600',
      suggestedAlt: `${capitalizedDomain} services banner image`
    },
    {
      src: `${url}/images/service-1.png`,
      dimensions: '400x300',
      suggestedAlt: `${capitalizedDomain} service illustration`
    },
    {
      src: `${url}/images/logo-footer.png`,
      dimensions: '150x50',
      suggestedAlt: `${capitalizedDomain} logo`
    }
  ];
  
  return {
    metaTitle: {
      value: `${capitalizedDomain} | Home Page`,
      status: score > 75 ? 'good' : 'warning',
      message: score > 75 ? 'Good title length' : 'Title length issue',
      suggestion: score > 75 ? undefined : 'Title could be more descriptive'
    },
    metaDescription: {
      value: `${domain} offers a wide range of services including web development, digital marketing, and SEO optimization. Visit our website to learn more about our solutions.`,
      status: score > 70 ? 'good' : 'warning',
      message: score > 70 ? 'Good description length' : 'Description could be improved',
      suggestion: score > 70 ? undefined : 'Make the description more compelling with a call to action'
    },
    headings: {
      status: score > 80 ? 'good' : 'warning',
      message: score > 80 ? 'Proper heading structure' : 'Heading structure could be improved',
      h1: [`${capitalizedDomain} - Professional Services`],
      h2: ['Our Services', 'About Us', 'Client Testimonials'],
      h3: ['Web Development', 'Digital Marketing', 'SEO']
    },
    headingsAnalysis: headingsAnalysis,
    images: {
      status: score > 85 ? 'good' : 'warning',
      message: score > 85 ? 'All images have alt text' : `${imagesWithoutAlt.length} images missing alt text`,
      total: 12,
      withAlt: 9,
      withoutAlt: 3
    },
    canonical: {
      value: url,
      status: 'good',
      message: 'Canonical URL specified'
    },
    viewport: {
      value: 'width=device-width, initial-scale=1.0',
      status: 'good',
      message: 'Viewport meta tag specified'
    },
    imagesWithoutAlt: imagesWithoutAlt,
    imageOptimizationTips: [
      'Use descriptive file names for images',
      'Compress images to reduce file size',
      'Use responsive image attributes (srcset, sizes)',
      'Consider using WebP or AVIF formats for better compression'
    ],
    competitorAnalysis: competitorAnalysis
  };
}

// Generate performance data
function generatePerformanceData(url: string, score: number) {
  // Calculate metrics based on score
  const loadTime = score > 80 ? 
    (Math.random() * 1.2 + 1.3).toFixed(1) : 
    (Math.random() * 2 + 2.5).toFixed(1);
    
  const fcp = score > 80 ? 
    (Math.random() * 0.7 + 0.8).toFixed(1) : 
    (Math.random() * 1.5 + 1.5).toFixed(1);
    
  const lcp = score > 80 ? 
    (Math.random() * 1.0 + 1.5).toFixed(1) : 
    (Math.random() * 2.0 + 2.5).toFixed(1);
    
  const cls = score > 80 ? 
    (Math.random() * 0.04 + 0.01).toFixed(2) : 
    (Math.random() * 0.15 + 0.05).toFixed(2);
    
  const tbt = score > 80 ? 
    Math.round(Math.random() * 100 + 50) : 
    Math.round(Math.random() * 300 + 150);
    
  const speedIndex = score > 80 ? 
    (Math.random() * 1.5 + 1.5).toFixed(1) : 
    (Math.random() * 3 + 3.0).toFixed(1);
    
  // Resource counts  
  const jsCount = Math.floor(Math.random() * 10) + 5;
  const cssCount = Math.floor(Math.random() * 5) + 2;
  const imageCount = Math.floor(Math.random() * 15) + 5;
  const fontCount = Math.floor(Math.random() * 3) + 1;
  const otherCount = Math.floor(Math.random() * 5) + 2;
  const totalCount = jsCount + cssCount + imageCount + fontCount + otherCount;
  
  // Resource sizes
  const jsBytes = jsCount * (Math.floor(Math.random() * 100000) + 50000);
  const cssBytes = cssCount * (Math.floor(Math.random() * 30000) + 10000);
  const imageBytes = imageCount * (Math.floor(Math.random() * 50000) + 20000);
  const fontBytes = fontCount * (Math.floor(Math.random() * 30000) + 20000);
  const otherBytes = otherCount * (Math.floor(Math.random() * 10000) + 5000);
  const totalBytes = jsBytes + cssBytes + imageBytes + fontBytes + otherBytes;
  
  // Status helper
  const getStatus = (value: number, good: number, warning: number, isLower = true) => {
    if (isLower) {
      return value <= good ? 'good' : value <= warning ? 'warning' : 'danger';
    } else {
      return value >= good ? 'good' : value >= warning ? 'warning' : 'danger';
    }
  };
  
  // Generate opportunities
  const opportunities = [];
  
  if (imageBytes > 500000) {
    opportunities.push({
      name: 'Properly size images',
      description: 'Serve images that are appropriately-sized to save cellular data and improve load time.',
      potentialSavings: `${Math.round(imageBytes * 0.6 / 1024)}KB`
    });
  }
  
  if (jsBytes > 800000) {
    opportunities.push({
      name: 'Reduce JavaScript execution time',
      description: 'Consider reducing the time spent parsing, compiling, and executing JS.',
      potentialSavings: `${Math.round(tbt * 0.7)}ms`
    });
  }
  
  if (parseFloat(cls) > 0.1) {
    opportunities.push({
      name: 'Avoid large layout shifts',
      description: 'Minimize layout shifts to improve user experience and visual stability.',
      potentialSavings: `CLS reduced by ${(parseFloat(cls) * 0.7).toFixed(2)}`
    });
  }
  
  // Generate diagnostics
  const diagnostics = [
    {
      name: 'First Contentful Paint',
      status: getStatus(parseFloat(fcp), 2, 4, true),
      message: `${fcp}s - ${parseFloat(fcp) < 2 ? 'Good' : parseFloat(fcp) < 4 ? 'Needs Improvement' : 'Poor'}`
    },
    {
      name: 'Largest Contentful Paint',
      status: getStatus(parseFloat(lcp), 2.5, 4, true),
      message: `${lcp}s - ${parseFloat(lcp) < 2.5 ? 'Good' : parseFloat(lcp) < 4 ? 'Needs Improvement' : 'Poor'}`
    },
    {
      name: 'Total Blocking Time',
      status: getStatus(tbt, 200, 600, true),
      message: `${tbt}ms - ${tbt < 200 ? 'Good' : tbt < 600 ? 'Needs Improvement' : 'Poor'}`
    },
    {
      name: 'Cumulative Layout Shift',
      status: getStatus(parseFloat(cls), 0.1, 0.25, true),
      message: `${cls} - ${parseFloat(cls) < 0.1 ? 'Good' : parseFloat(cls) < 0.25 ? 'Needs Improvement' : 'Poor'}`
    }
  ];
  
  return {
    status: getStatus(score, 80, 60, false),
    message: score > 80 ? 'Good performance metrics' : score > 60 ? 'Performance needs improvement' : 'Poor performance',
    loadTime: {
      value: parseFloat(loadTime),
      unit: 's',
      status: getStatus(parseFloat(loadTime), 2.5, 4, true),
      description: 'Total time to fully load and render the page'
    },
    firstContentfulPaint: {
      value: parseFloat(fcp),
      unit: 's', 
      status: getStatus(parseFloat(fcp), 2, 4, true),
      description: 'Time when the first text or image is painted'
    },
    speedIndex: {
      value: parseFloat(speedIndex),
      unit: 's',
      status: getStatus(parseFloat(speedIndex), 3.4, 5.8, true),
      description: 'How quickly the contents of a page are visibly populated'
    },
    largestContentfulPaint: {
      value: parseFloat(lcp),
      unit: 's',
      status: getStatus(parseFloat(lcp), 2.5, 4, true),
      description: 'Time when the largest text or image is painted'
    },
    totalBlockingTime: {
      value: tbt,
      unit: 'ms',
      status: getStatus(tbt, 200, 600, true),
      description: 'Sum of all time periods when the main thread was blocked'
    },
    cumulativeLayoutShift: {
      value: parseFloat(cls),
      unit: '',
      status: getStatus(parseFloat(cls), 0.1, 0.25, true),
      description: 'Measures visual stability as elements move during loading'
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

// Generate accessibility data
function generateAccessibilityData(url: string, score: number) {
  const totalTests = Math.floor(Math.random() * 20) + 80;
  const passedTests = Math.floor(totalTests * (score / 100));
  
  // Helper to create random accessibility issues
  const createIssues = (count: number, impact: 'critical' | 'serious' | 'moderate' | 'minor') => {
    const issues = [];
    const contextElements = [
      '<div role="button" tabindex="-1">',
      '<a href="#" onclick="return false;">',
      '<img src="/image.jpg">',
      '<div class="button" onclick="doSomething()">',
      '<input type="text">',
      '<select id="dropdown">',
      '<table>',
      '<div style="color: #aaa; background-color: #eee">'
    ];
    
    const messages = [
      'Element has insufficient color contrast',
      'Form element has no label',
      'Interactive element has no accessible name',
      'Element has invalid ARIA attribute',
      'Image has no alt text',
      'Heading elements not in sequential order',
      'Link has no discernible text',
      'ID attribute not unique'
    ];
    
    const selectors = [
      '.header nav a:first-child',
      '#main-content > div:nth-child(3)',
      'form input[type="text"]',
      '.footer .social-links a',
      '.banner img',
      'section h3:first-child',
      '.sidebar .menu-item',
      '#content article:first-child'
    ];
    
    const recommendations = [
      'Add a proper label to the form control',
      'Increase color contrast to at least 4.5:1 for normal text',
      'Add descriptive alt text to images',
      'Use ARIA attributes according to specification',
      'Ensure all interactive elements are keyboard accessible',
      'Maintain proper heading hierarchy',
      'Provide text alternatives for non-text content',
      'Ensure all IDs are unique on the page'
    ];
    
    for (let i = 0; i < count; i++) {
      issues.push({
        code: `${impact}-issue-${i + 1}`,
        impact: impact,
        message: messages[Math.floor(Math.random() * messages.length)],
        context: contextElements[Math.floor(Math.random() * contextElements.length)],
        selector: selectors[Math.floor(Math.random() * selectors.length)],
        recommendation: recommendations[Math.floor(Math.random() * recommendations.length)]
      });
    }
    
    return issues;
  };
  
  // Generate issues based on score
  const criticalCount = score > 90 ? 0 : score > 80 ? 1 : 2;
  const seriousCount = score > 85 ? 1 : score > 75 ? 2 : 4;
  const moderateCount = score > 80 ? 2 : score > 70 ? 4 : 6;
  const minorCount = score > 85 ? 3 : score > 75 ? 5 : 8;
  
  // Generate categories with scores
  const categories = [
    {
      name: 'Perceivable',
      score: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10) - 5)),
      passedTests: Math.floor(Math.random() * 5) + 20,
      totalTests: 25,
      status: score > 80 ? 'good' : score > 60 ? 'warning' : 'danger'
    },
    {
      name: 'Operable',
      score: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10) - 5)),
      passedTests: Math.floor(Math.random() * 4) + 18,
      totalTests: 22,
      status: score > 80 ? 'good' : score > 60 ? 'warning' : 'danger'
    },
    {
      name: 'Understandable',
      score: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10) - 5)),
      passedTests: Math.floor(Math.random() * 3) + 15,
      totalTests: 18,
      status: score > 80 ? 'good' : score > 60 ? 'warning' : 'danger'
    },
    {
      name: 'Robust',
      score: Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10) - 5)),
      passedTests: Math.floor(Math.random() * 3) + 9,
      totalTests: 12,
      status: score > 80 ? 'good' : score > 60 ? 'warning' : 'danger'
    }
  ];
  
  return {
    status: score > 90 ? 'good' : score > 70 ? 'warning' : 'danger',
    message: score > 90 
      ? 'Good accessibility practices'
      : score > 70 
        ? 'Some accessibility issues found'
        : 'Significant accessibility concerns',
    score: score,
    passedTests: passedTests,
    totalTests: totalTests,
    critical: createIssues(criticalCount, 'critical'),
    serious: createIssues(seriousCount, 'serious'),
    moderate: createIssues(moderateCount, 'moderate'),
    minor: createIssues(minorCount, 'minor'),
    categories: categories,
    bestPractices: [
      {
        name: 'Language of Page',
        description: 'Specify the language of the page',
        status: 'passed'
      },
      {
        name: 'Focus Order',
        description: 'Focusable components receive focus in an order that preserves meaning',
        status: score > 85 ? 'passed' : 'warning'
      },
      {
        name: 'Consistent Navigation',
        description: 'Navigation patterns are consistent across the site',
        status: 'passed'
      },
      {
        name: 'Error Identification',
        description: 'Form errors are clearly identified and described to users',
        status: score > 80 ? 'passed' : 'warning'
      }
    ]
  };
}