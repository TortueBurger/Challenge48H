# 🛡️ WordPress Security Scanner

## 📌 Description
Ce projet est un **scanner de sécurité pour WordPress** développé en **TypeScript**. Il permet d’analyser un site WordPress et de détecter ses vulnérabilités en fonction des versions de WordPress, PHP, Nginx et de la base de données.

---

## 🚀 Fonctionnalités
✅ Détection automatique si le site tourne sous WordPress  
✅ Extraction des versions de WordPress et des composants serveurs  
✅ Comparaison avec les dernières mises à jour disponibles  
✅ Recherche des vulnérabilités (CVEs) via une base de données de sécurité  
✅ Affichage des résultats sur une interface web stylisée  
✅ Génération et envoi automatique d’un **rapport d’audit** par email  
✅ **(Optionnel)** Automatisation avec un **cron job**  

---

## 📂 Structure du projet

project/
├── src/
│   ├── components/
│   │   ├── Report.tsx
│   │   └── URLInput.tsx
│   ├── services/
│   │   ├── accueil.ts
│   │   ├── pdfts.ts
│   │   └── wpscan.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── node_modules/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
