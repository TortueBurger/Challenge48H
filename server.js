const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/scan', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const outputFilePath = path.join(__dirname, 'wpscan_report.html');
  const wpscanCommand = `
    if ! command -v wpscan &> /dev/null
    then
        echo "WPScan n'est pas installé. Veuillez l'installer avant d'exécuter ce script."
        exit 1
    fi

    URL="${url}"
    OUTPUT_FILE="${outputFilePath}"

    echo "Analyse de $URL en cours..."

    wpscan --url "$URL" --no-update --random-user-agent > wpscan_result.txt

    cat <<EOF > "$OUTPUT_FILE"
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rapport WPScan</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1>Rapport WPScan pour $URL</h1>
        <pre>$(cat wpscan_result.txt)</pre>
    </body>
    </html>
    EOF
  `;

  exec(wpscanCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution de WPScan: ${error.message}`);
      return res.status(500).send('Erreur lors de l\'exécution de WPScan');
    }

    res.sendFile(outputFilePath);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});