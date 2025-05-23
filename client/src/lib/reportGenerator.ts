import { ScanResult } from "@/types";
import { formatDate } from "@/lib/utils";

/**
 * Generates an HTML report from scan results
 * @param result The scan result object
 * @returns HTML string containing the formatted report
 */
export function generateHtmlReport(result: ScanResult): string {
  const scoreColorClass = (score: number) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FFC107";
    return "#F44336";
  };

  const statusColorClass = (status: 'good' | 'warning' | 'danger') => {
    if (status === 'good') return "#4CAF50";
    if (status === 'warning') return "#FFC107";
    return "#F44336";
  };

  const statusIcon = (status: 'good' | 'warning' | 'danger') => {
    if (status === 'good') return "✓";
    return "⚠";
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebInsight Scan Report for ${result.url}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #2196F3;
      --secondary: #4CAF50;
      --warning: #FFC107;
      --danger: #F44336;
      --neutral: #F5F5F5;
      --darkText: #333333;
    }

    body {
      font-family: 'Roboto', sans-serif;
      background-color: #F5F5F5;
      color: #333333;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      background-color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .header-content {
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-logo {
      color: var(--primary);
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      color: var(--darkText);
    }

    .card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      margin-bottom: 1.5rem;
      overflow: hidden;
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-body {
      padding: 1rem;
    }

    .scores-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .score-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
    }

    .score-circle {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }

    .score-circle svg {
      transform: rotate(-90deg);
    }

    .score-circle-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      font-weight: bold;
    }

    .score-label {
      margin-top: 0.5rem;
      font-weight: bold;
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-good {
      background-color: rgba(76, 175, 80, 0.1);
      color: var(--secondary);
    }

    .status-warning {
      background-color: rgba(255, 193, 7, 0.1);
      color: var(--warning);
    }

    .status-danger {
      background-color: rgba(244, 67, 54, 0.1);
      color: var(--danger);
    }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .overview-item {
      border: 1px solid #eee;
      border-radius: 0.5rem;
      padding: 1rem;
    }

    .overview-item h4 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      color: #666;
    }

    .status-indicator {
      display: inline-block;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    .code-block {
      font-family: 'Source Code Pro', monospace;
      background-color: #f5f5f5;
      padding: 0.5rem;
      border-radius: 0.25rem;
      margin: 0.5rem 0;
      font-size: 0.85rem;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 500;
      background-color: #f9f9f9;
    }

    .section {
      margin-bottom: 2rem;
    }

    footer {
      text-align: center;
      margin-top: 3rem;
      padding: 1rem;
      color: #666;
      font-size: 0.875rem;
    }

    @media print {
      body {
        background: white;
      }
      .container {
        max-width: 100%;
        padding: 0;
      }
      .card {
        box-shadow: none;
        border: 1px solid #eee;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-content">
      <div class="header-logo">WebInsight Scanner</div>
      <h1>Website Analysis Report</h1>
    </div>
  </header>

  <div class="container">
    <div class="card">
      <div class="card-header">
        <div>
          <h2 style="margin:0">Analysis Results for ${result.url}</h2>
          <p style="margin:0;color:#666">Scan completed on ${formatDate(result.scanDate)}</p>
        </div>
      </div>
      
      <div class="card-body" style="background-color:#f9f9f9">
        <div class="scores-grid">
          <div class="score-card">
            <h3>Overall Score</h3>
            <div class="score-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="${scoreColorClass(result.scores.overall)}" stroke-width="12" 
                  stroke-dasharray="339.3" stroke-dashoffset="${((100 - result.scores.overall) / 100) * 339.3}" />
              </svg>
              <div class="score-circle-text">
                <span>${result.scores.overall}</span>
                <span style="font-size:0.875rem;color:#666">/100</span>
              </div>
            </div>
            <div class="score-label">
              <span class="status-badge ${result.scores.overall >= 80 ? 'status-good' : result.scores.overall >= 60 ? 'status-warning' : 'status-danger'}">
                ${result.scores.overall >= 80 ? 'Good' : result.scores.overall >= 60 ? 'Needs Improvement' : 'Critical'}
              </span>
            </div>
          </div>
          
          <div class="score-card">
            <h3>SEO Health</h3>
            <div class="score-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="${scoreColorClass(result.scores.seo)}" stroke-width="12" 
                  stroke-dasharray="339.3" stroke-dashoffset="${((100 - result.scores.seo) / 100) * 339.3}" />
              </svg>
              <div class="score-circle-text">
                <span>${result.scores.seo}</span>
                <span style="font-size:0.875rem;color:#666">/100</span>
              </div>
            </div>
            <div class="score-label">
              <span class="status-badge ${result.scores.seo >= 80 ? 'status-good' : result.scores.seo >= 60 ? 'status-warning' : 'status-danger'}">
                ${result.scores.seo >= 80 ? 'Good' : result.scores.seo >= 60 ? 'Needs Improvement' : 'Critical'}
              </span>
            </div>
          </div>
          
          <div class="score-card">
            <h3>Security Rating</h3>
            <div class="score-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="${scoreColorClass(result.scores.security)}" stroke-width="12" 
                  stroke-dasharray="339.3" stroke-dashoffset="${((100 - result.scores.security) / 100) * 339.3}" />
              </svg>
              <div class="score-circle-text">
                <span>${result.scores.security}</span>
                <span style="font-size:0.875rem;color:#666">/100</span>
              </div>
            </div>
            <div class="score-label">
              <span class="status-badge ${result.scores.security >= 80 ? 'status-good' : result.scores.security >= 60 ? 'status-warning' : 'status-danger'}">
                ${result.scores.security >= 80 ? 'Good' : result.scores.security >= 60 ? 'Needs Improvement' : 'Critical'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Section -->
    <div class="section">
      <h2>SEO Analysis</h2>
      
      <div class="overview-grid">
        <div class="overview-item">
          <h4>Meta Title</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.seo.metaTitle.status)}"></span>
            <span>${result.seo.metaTitle.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>Meta Description</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.seo.metaDescription.status)}"></span>
            <span>${result.seo.metaDescription.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>Headings</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.seo.headings.status)}"></span>
            <span>${result.seo.headings.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>Images</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.seo.images.status)}"></span>
            <span>${result.seo.images.message}</span>
          </div>
        </div>
      </div>
      
      ${result.seo.competitorAnalysis ? `
      <!-- Search Comparison Section -->
      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">Search Rankings Comparison</h3>
          <span class="status-badge status-warning">
            Your Position: #${result.seo.competitorAnalysis.searchResults.find(r => r.url === result.url)?.position || "Not found"}
          </span>
        </div>
        <div class="card-body">
          <h4>Search Results for "${result.seo.competitorAnalysis.keyword}"</h4>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Website</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${result.seo.competitorAnalysis.searchResults
                .filter(r => !r.isSponsored)
                .map(searchResult => `
                <tr${searchResult.url === result.url ? ' style="background-color:#f0f7ff"' : ''}>
                  <td><strong>#${searchResult.position}</strong></td>
                  <td style="color:var(--primary)">${new URL(searchResult.url).hostname}</td>
                  <td>${searchResult.title}</td>
                  <td>
                    ${searchResult.url === result.url ? 
                      '<span class="status-badge" style="background-color:rgba(33, 150, 243, 0.1);color:var(--primary)">Your Site</span>' : 
                      searchResult.position <= 3 ? 
                      '<span class="status-badge status-good">Top Result</span>' : 
                      '<span class="status-badge" style="background-color:#f5f5f5;color:#666">Competitor</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <h4 style="margin-top:2rem">Key Ranking Factors</h4>
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Importance</th>
                <th>Your Status</th>
                <th>Top Sites</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              ${result.seo.competitorAnalysis.keyFactors.map(factor => `
                <tr>
                  <td><strong>${factor.factor}</strong><br><span style="font-size:0.85rem;color:#666">${factor.description}</span></td>
                  <td>
                    <span class="status-badge" style="background-color:${
                      factor.importance === 'high' ? 'rgba(244, 67, 54, 0.1)' : 
                      factor.importance === 'medium' ? 'rgba(255, 193, 7, 0.1)' : 
                      'rgba(33, 150, 243, 0.1)'
                    };color:${
                      factor.importance === 'high' ? 'var(--danger)' : 
                      factor.importance === 'medium' ? 'var(--warning)' : 
                      'var(--primary)'
                    }">${factor.importance}</span>
                  </td>
                  <td>
                    <span class="status-indicator" style="background-color:${statusColorClass(factor.yourStatus)}"></span>
                  </td>
                  <td>
                    <span class="status-indicator" style="background-color:${statusColorClass(factor.competitorStatus)}"></span>
                  </td>
                  <td>${factor.improvement}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2rem">
            <div>
              <h4>Content Gap Analysis</h4>
              <div style="margin-bottom:1rem">
                <h5 style="color:#666;font-size:0.9rem;margin-bottom:0.5rem">Missing Keywords</h5>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
                  ${result.seo.competitorAnalysis.contentGap.missingKeywords.map(keyword => 
                    `<span style="padding:0.25rem 0.5rem;background:#f5f5f5;border-radius:0.25rem;font-size:0.85rem">${keyword}</span>`
                  ).join('')}
                </div>
              </div>
              <div>
                <h5 style="color:#666;font-size:0.9rem;margin-bottom:0.5rem">Missing Topics</h5>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
                  ${result.seo.competitorAnalysis.contentGap.missingTopics.map(topic => 
                    `<span style="padding:0.25rem 0.5rem;background:#f5f5f5;border-radius:0.25rem;font-size:0.85rem">${topic}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
            
            <div>
              <h4>Technical Comparison</h4>
              <table>
                <tr>
                  <td style="width:30%"><strong>Load Speed</strong></td>
                  <td>
                    <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem">
                      <span>Your site: ${result.seo.competitorAnalysis.technicalComparison.loadSpeed.yours}</span>
                      <span style="color:var(--danger)">${result.seo.competitorAnalysis.technicalComparison.loadSpeed.difference}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                      <span>Top site: ${result.seo.competitorAnalysis.technicalComparison.loadSpeed.competitor}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Backlinks</strong></td>
                  <td>
                    <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem">
                      <span>Your site: ${result.seo.competitorAnalysis.technicalComparison.backlinks.yours}</span>
                      <span style="color:var(--warning)">${result.seo.competitorAnalysis.technicalComparison.backlinks.competitor - result.seo.competitorAnalysis.technicalComparison.backlinks.yours} more</span>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                      <span>Top site: ${result.seo.competitorAnalysis.technicalComparison.backlinks.competitor}</span>
                    </div>
                    <div style="font-size:0.85rem;color:#666;margin-top:0.5rem">
                      ${result.seo.competitorAnalysis.technicalComparison.backlinks.qualityAssessment}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          
          <div style="margin-top:2rem">
            <h4>Recommendations</h4>
            <ul style="padding-left:1.5rem">
              ${result.seo.competitorAnalysis.contentGap.recommendations.map(recommendation => 
                `<li style="margin-bottom:0.5rem">${recommendation}</li>`
              ).join('')}
            </ul>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">Meta Tags Analysis</h3>
        </div>
        <div class="card-body">
          <div style="margin-bottom:1.5rem">
            <h4>Title Tag</h4>
            <div class="code-block">${result.seo.metaTitle.value}</div>
            <div>
              <span class="status-indicator" style="background-color:${statusColorClass(result.seo.metaTitle.status)}"></span>
              <span>Length: ${result.seo.metaTitle.value.length} characters (Recommended: 50-60)</span>
            </div>
            ${result.seo.metaTitle.suggestion ? `<div style="margin-top:0.5rem;font-weight:500">Suggestion: ${result.seo.metaTitle.suggestion}</div>` : ''}
          </div>
          
          <div style="margin-bottom:1.5rem">
            <h4>Meta Description</h4>
            <div class="code-block">${result.seo.metaDescription.value}</div>
            <div>
              <span class="status-indicator" style="background-color:${statusColorClass(result.seo.metaDescription.status)}"></span>
              <span>Length: ${result.seo.metaDescription.value.length} characters (Recommended: 120-158)</span>
            </div>
            ${result.seo.metaDescription.suggestion ? `<div style="margin-top:0.5rem;font-weight:500">Suggestion: ${result.seo.metaDescription.suggestion}</div>` : ''}
          </div>
          
          <div style="margin-bottom:1.5rem">
            <h4>Canonical URL</h4>
            <div class="code-block">${result.seo.canonical.value || 'No canonical URL found'}</div>
            <div>
              <span class="status-indicator" style="background-color:${statusColorClass(result.seo.canonical.status)}"></span>
              <span>${result.seo.canonical.message}</span>
            </div>
          </div>
          
          <div>
            <h4>Viewport Meta Tag</h4>
            <div class="code-block">${result.seo.viewport.value || 'No viewport meta tag found'}</div>
            <div>
              <span class="status-indicator" style="background-color:${statusColorClass(result.seo.viewport.status)}"></span>
              <span>${result.seo.viewport.message}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">Heading Structure</h3>
          <span class="status-badge ${result.seo.headings.status === 'good' ? 'status-good' : result.seo.headings.status === 'warning' ? 'status-warning' : 'status-danger'}">
            ${result.seo.headings.message}
          </span>
        </div>
        <div class="card-body">
          <div style="margin-bottom:1.5rem">
            <h4>Heading Hierarchy</h4>
            <ul style="list-style:none;padding:0;margin:0">
              ${result.seo.headings.h1.length > 0 ? `<li style="margin-bottom:0.5rem">
                <span style="color:var(--primary);font-family:'Source Code Pro',monospace;display:inline-block;width:50px">H1:</span>
                <span style="font-family:'Source Code Pro',monospace">${result.seo.headings.h1.join(', ')}</span>
              </li>` : ''}
              
              ${result.seo.headings.h2.length > 0 ? `<li style="margin-bottom:0.5rem">
                <span style="color:var(--primary);font-family:'Source Code Pro',monospace;display:inline-block;width:50px">H2:</span>
                <span style="font-family:'Source Code Pro',monospace">${result.seo.headings.h2.join(', ')}</span>
              </li>` : ''}
              
              ${result.seo.headings.h3.length > 0 ? `<li style="margin-bottom:0.5rem">
                <span style="color:var(--primary);font-family:'Source Code Pro',monospace;display:inline-block;width:50px">H3:</span>
                <span style="font-family:'Source Code Pro',monospace">${result.seo.headings.h3.join(', ')}</span>
              </li>` : ''}
            </ul>
          </div>
          
          <div>
            <h4>Analysis</h4>
            <ul style="list-style:none;padding:0;margin:0">
              ${result.seo.headingsAnalysis.map(item => `
              <li style="margin-bottom:0.5rem;display:flex;align-items:flex-start">
                <span style="color:${item.type === 'success' ? 'var(--secondary)' : item.type === 'warning' ? 'var(--warning)' : 'var(--danger)'};margin-right:0.5rem">
                  ${item.type === 'success' ? '✓' : '⚠'}
                </span>
                <span>${item.message}</span>
              </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">Image Optimization</h3>
          ${result.seo.imagesWithoutAlt.length > 0 ? `
          <span class="status-badge status-danger">
            ${result.seo.imagesWithoutAlt.length} ${result.seo.imagesWithoutAlt.length === 1 ? 'Issue' : 'Issues'}
          </span>
          ` : `
          <span class="status-badge status-good">
            No Issues
          </span>
          `}
        </div>
        <div class="card-body">
          ${result.seo.imagesWithoutAlt.length > 0 ? `
          <div style="margin-bottom:1.5rem">
            <h4>Images Without Alt Text</h4>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>File</th>
                  <th>Suggested Alt Text</th>
                </tr>
              </thead>
              <tbody>
                ${result.seo.imagesWithoutAlt.map(img => `
                <tr>
                  <td>[Thumbnail]</td>
                  <td style="font-family:'Source Code Pro',monospace">${img.src.split('/').pop()}</td>
                  <td>"${img.suggestedAlt}"</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : `
          <p>All images have proper alt text. Good job!</p>
          `}
          
          <div>
            <h4>Image Optimization Tips</h4>
            <ul style="list-style:none;padding:0;margin:0">
              ${result.seo.imageOptimizationTips.map(tip => `
              <li style="margin-bottom:0.5rem;display:flex;align-items:flex-start">
                <span style="color:var(--primary);margin-right:0.5rem">✓</span>
                <span>${tip}</span>
              </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Section -->
    <div class="section">
      <h2>Security Assessment</h2>
      
      <div class="overview-grid">
        <div class="overview-item">
          <h4>SSL Certificate</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.security.ssl.status)}"></span>
            <span>${result.security.ssl.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>HTTP Headers</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.security.headers.status)}"></span>
            <span>${result.security.headers.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>Content Security</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.security.contentSecurity.status)}"></span>
            <span>${result.security.contentSecurity.message}</span>
          </div>
        </div>
        
        <div class="overview-item">
          <h4>HTTPS Redirect</h4>
          <div>
            <span class="status-indicator" style="background-color:${statusColorClass(result.security.httpsRedirect.status)}"></span>
            <span>${result.security.httpsRedirect.message}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">SSL Certificate</h3>
          <span class="status-badge ${result.security.ssl.status === 'good' ? 'status-good' : result.security.ssl.status === 'warning' ? 'status-warning' : 'status-danger'}">
            ${result.security.ssl.status === 'good' ? 'Valid' : result.security.ssl.status === 'warning' ? 'Warning' : 'Invalid'}
          </span>
        </div>
        <div class="card-body">
          <div style="margin-bottom:1.5rem">
            <h4>Certificate Details</h4>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(250px, 1fr));gap:1rem">
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Common Name</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${result.security.ssl.commonName}</p>
              </div>
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Issuer</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${result.security.ssl.issuer}</p>
              </div>
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Valid From</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${formatDate(result.security.ssl.validFrom)}</p>
              </div>
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Valid Until</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${formatDate(result.security.ssl.validUntil)} (${result.security.ssl.daysRemaining} days remaining)</p>
              </div>
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Key Strength</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${result.security.ssl.keyStrength}</p>
              </div>
              <div>
                <p style="color:#666;margin-bottom:0.25rem">Signature Algorithm</p>
                <p style="font-family:'Source Code Pro',monospace;margin-top:0">${result.security.ssl.signatureAlgorithm}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4>SSL/TLS Configuration</h4>
            <table>
              <thead>
                <tr>
                  <th>Protocol</th>
                  <th>Status</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                ${result.security.ssl.protocols.map(protocol => `
                <tr>
                  <td style="font-family:'Source Code Pro',monospace">${protocol.name}</td>
                  <td>
                    <span class="status-indicator" style="background-color:${protocol.enabled ? (protocol.secure ? 'var(--secondary)' : 'var(--danger)') : 'var(--secondary)'}"></span>
                    <span>${protocol.enabled ? 'Enabled' : 'Disabled'}</span>
                  </td>
                  <td style="color:#666">${protocol.recommendation}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 style="margin:0">Security Headers</h3>
          ${result.security.missingHeaders.length > 0 ? `
          <span class="status-badge status-warning">
            ${result.security.missingHeaders.length} Missing ${result.security.missingHeaders.length === 1 ? 'Header' : 'Headers'}
          </span>
          ` : `
          <span class="status-badge status-good">
            All Security Headers Present
          </span>
          `}
        </div>
        <div class="card-body">
          <p>HTTP response headers can help enhance the security of your web application.</p>
          
          <table>
            <thead>
              <tr>
                <th>Header</th>
                <th>Status</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${result.security.headers.all.map(header => `
              <tr>
                <td style="font-family:'Source Code Pro',monospace">${header.name}</td>
                <td>
                  <span class="status-indicator" style="background-color:${header.implemented ? 'var(--secondary)' : header.severity === 'high' ? 'var(--danger)' : 'var(--warning)'}"></span>
                  <span>${header.implemented ? 'Implemented' : 'Missing'}</span>
                </td>
                <td style="font-family:'Source Code Pro',monospace;font-size:0.75rem">
                  ${header.implemented ? header.value : '<span style="color:#666;font-style:italic">Not implemented</span>'}
                </td>
              </tr>
              `).join('')}
            </tbody>
          </table>
          
          ${result.security.missingHeaders.length > 0 ? `
          <div style="margin-top:1.5rem">
            <h4>Recommended Implementations</h4>
            <div style="display:flex;flex-direction:column;gap:1rem">
              ${result.security.missingHeaders.map(header => `
              <div>
                <h5 style="margin-top:0;margin-bottom:0.25rem;color:${header.severity === 'high' ? 'var(--danger)' : 'var(--warning)'}">${header.name}</h5>
                <p style="margin-top:0;margin-bottom:0.5rem;color:#666">${header.description}</p>
                <div class="code-block">${header.recommendedValue}</div>
              </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </div>

    <footer>
      <p>Report generated by WebInsight Scanner on ${formatDate(new Date())}</p>
      <p>© ${new Date().getFullYear()} WebInsight Scanner. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;
}
