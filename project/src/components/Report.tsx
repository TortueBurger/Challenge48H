import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { generatePDF } from '../services/pdf';

function Report() {
  const navigate = useNavigate();
  const [scanResults, setScanResults] = useState<any>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('scanResults');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      console.log("Données récupérées dans Report :", parsedResults); // 🔍 Vérification
      setScanResults(parsedResults);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!scanResults) {
    return <p className="text-gray-400 text-center">Chargement des résultats...</p>;
  }

  const handleDownload = () => {
    generatePDF(scanResults);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Scanner
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold">Scan Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-emerald-400">Site Information</h3>
            <p>URL: {scanResults.target_url}</p>
            <p>Scan Time: {new Date(scanResults.scan_time).toLocaleString()}</p>
          </div>
          {scanResults.version && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-400">WordPress Version</h3>
              <p>Version: {scanResults.version.number}</p>
              <p>Status: {scanResults.version.status}</p>
            </div>
          )}
        </div>

        {scanResults.vulnerabilities?.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Vulnerabilities</h3>
            <div className="space-y-4">
              {scanResults.vulnerabilities.map((vuln: any, index: number) => (
                <div key={index} className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
                  <h4 className="font-semibold">{vuln.title}</h4>
                  <p className="text-sm text-gray-400">{vuln.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Aucune vulnérabilité détectée.</p>
        )}
      </div>
    </div>
  );
}

export default Report;