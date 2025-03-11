import axios from 'axios';

const API_TOKEN = 'i1KYtsLdYQUX55C5ZTU3i6zUTa61c0xNizE5odNyTlgvsa95NZcmeWQr8xJcbIf2rqJWvy2okBwB6SPYka2Tfki1KYtsLdYQUX55C5ZTU3i6zUTa61c0xNizE5odNyTlg'; // Votre token

// Helper function to validate Local WP URL
function isLocalWPUrl(url: string): boolean {
  return url.includes('.local') || url.includes('localhost');
}

// Helper function to format Local WP URL
function formatLocalUrl(url: string): string {
  url = url.replace('http://', 'https://');
  if (!url.includes(':443')) {
    url = url.replace('.local', '.local:443');
  }
  return url;
}

// Fonction pour scanner un site (exemple avec une version WordPress spécifique)
export async function scanWebsite(url: string) {
  if (!API_TOKEN) {
    throw new Error('WPScan API token is not configured.');
  }

  console.log('URL initiale:', url);

  let formattedUrl = url;
  if (isLocalWPUrl(url)) {
    formattedUrl = formatLocalUrl(url);
    console.warn(
      'Attention : Les URL locales ne peuvent pas être scannées directement par l\'API WPScan. ' +
      'Utilisez ngrok pour rendre le site accessible publiquement ou l\'outil CLI WPScan.'
    );
  }

  // Exemple : On suppose que vous voulez vérifier une version WordPress (par ex. 5.9.9)
  // Remplacez cette logique par une détection réelle si nécessaire
  const wordpressVersion = '599'; // Format sans points, comme requis par l'API (5.9.9 -> 599)
  const apiEndpoint = `https://wpscan.com/api/v3/wordpresses/${wordpressVersion}`;

  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        'Authorization': `Token token=${API_TOKEN}` // Format correct selon la doc
      }
    });
    console.log('Réponse de l\'API pour WordPress version', wordpressVersion, ':', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Erreur de l\'API WPScan:', error.response.status, error.response.data);
      throw new Error(`Erreur ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.error('Aucune réponse reçue de l\'API:', error.message);
      throw new Error('Problème de connexion à l\'API WPScan.');
    } else {
      console.error('Erreur inattendue:', error.message);
      throw error;
    }
  }
}

// Testez la fonction
scanWebsite('https://cyberphiles.fr')
  .then(data => console.log('Succès:', data))
  .catch(err => console.error('Erreur:', err));