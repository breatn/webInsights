/**
 * Validates if a string is a properly formatted URL
 * @param url URL string to validate
 * @returns boolean indicating if URL is valid
 */
export function validateUrl(url: string): boolean {
  // Basic URL validation
  if (!url || url.trim() === '') {
    return false;
  }
  
  try {
    // Check if URL is parseable
    const parsedUrl = new URL(url);
    
    // Make sure it's http or https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return false;
    }
    
    // Make sure there's a hostname
    if (!parsedUrl.hostname) {
      return false;
    }
    
    // Additional validation using regex
    // This pattern checks for a valid domain with TLD
    const domainPattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!domainPattern.test(parsedUrl.host)) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Normalizes a URL by ensuring it has a protocol and removing trailing slashes
 * @param url URL to normalize
 * @returns normalized URL
 */
export function normalizeUrl(url: string): string {
  let normalizedUrl = url.trim();
  
  // Add protocol if missing
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  // Remove trailing slash
  if (normalizedUrl.endsWith('/')) {
    normalizedUrl = normalizedUrl.slice(0, -1);
  }
  
  return normalizedUrl;
}
