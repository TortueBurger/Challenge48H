import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_WPSCAN_API_TOKEN;

// Helper function to validate Local WP URL
function isLocalWPUrl(url: string): boolean {
  return url.includes('.local') || url.includes('localhost');
}

export async function scanWebsite(url: string) {
  if (!API_TOKEN) {
    throw new Error('WPScan API token is not configured. Please add your token to the .env file.');
  }

  // Validate and format Local WP URL
  if (isLocalWPUrl(url)) {
    // Ensure the URL uses HTTPS for Local WP sites
    url = url.replace('http://', 'https://');
    
    // Add port 443 if not specified (Local WP default SSL port)
    if (!url.includes(':443')) {
      url = url.replace('.local', '.local:443');
    }
  }

  try {
    const response = await axios.get(`https://wpscan.com/api/v3/scan`, {
      params: { url },
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error scanning website:', error);
    throw error;
  }
}