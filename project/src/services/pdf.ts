import { jsPDF } from 'jspdf';

export function generatePDF(data: any) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('WPScan Security Report', 20, 20);
  
  // Add scan information
  doc.setFontSize(12);
  doc.text(`URL: ${data.target_url}`, 20, 40);
  doc.text(`Scan Date: ${new Date(data.scan_time).toLocaleString()}`, 20, 50);
  
  // Add WordPress version info
  if (data.version) {
    doc.text('WordPress Version', 20, 70);
    doc.text(`Version: ${data.version.number}`, 30, 80);
    doc.text(`Status: ${data.version.status}`, 30, 90);
  }
  
  // Add vulnerabilities
  if (data.vulnerabilities && data.vulnerabilities.length > 0) {
    doc.text('Vulnerabilities Found:', 20, 110);
    let yPos = 120;
    
    data.vulnerabilities.forEach((vuln: any) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(11);
      doc.text(vuln.title, 30, yPos);
      
      doc.setFontSize(10);
      const descLines = doc.splitTextToSize(vuln.description, 150);
      descLines.forEach((line: string) => {
        yPos += 10;
        doc.text(line, 30, yPos);
      });
      
      yPos += 20;
    });
  }
  
  // Save the PDF
  doc.save('wpscan-report.pdf');
}