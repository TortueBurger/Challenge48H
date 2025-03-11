import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, Info, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

function URLInput() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    console.log("🔍 URL soumise :", url); // Vérification
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to scan website');
      }

      const reportUrl = await response.url;
      window.open(reportUrl, '_blank');
    } catch (error: any) {
      console.error("❌ Erreur du scan :", error);
      toast.error(error.message || 'Failed to scan website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    const storedResults = sessionStorage.getItem('scanResults');
    if (!storedResults) {
      toast.error('No scan results found. Please scan a website first.');
      return;
    }

    const scanResults = JSON.parse(storedResults);
    setLoading(true);
    try {
      generatePDF(scanResults);
    } catch (error: any) {
      console.error("❌ Erreur de génération du PDF :", error);
      toast.error(error.message || 'Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            WordPress Security Scanner
          </h1>
          <p className="mt-4 text-gray-400">
            Enter your WordPress site URL below to analyze its security with WPScan
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-blue-400">WPScan Support</p>
            <p>A utility to scan your site, you can enter your site's URL (e.g., https://your-site.com).</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-site.local or https://your-wordpress-site.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Scan Website
              </>
            )}
          </button>
        </form>

        <button
          onClick={handleGeneratePDF}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Generate PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default URLInput;