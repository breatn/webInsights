
import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

export async function getSearchResults(query: string) {
  try {
    if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
      throw new Error('Google API credentials not configured');
    }

    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: query,
        num: 10,
        gl: 'us', // Set geographic location to US for consistent results
        safe: 'active' // Enable safe search
      }
    });

    if (!response.data.items) {
      return [];
    }

    return response.data.items.map((item: any, index: number) => ({
      position: index + 1,
      url: item.link,
      title: item.title,
      description: item.snippet,
      isSponsored: Boolean(item.pagemap?.metatags?.[0]?.['og:type'] === 'paid_listing')
    }));
  } catch (error: any) {
    console.error('Error fetching search results:', error.response?.data || error.message);
    throw error;
  }
}
