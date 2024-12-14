# Étape 1 : Utiliser l'image Node.js
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances avec l'option --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 4200 (port de développement par défaut d'Angular)
EXPOSE 4200

# Commande par défaut pour démarrer l'application Angular en mode développement
CMD ["npm", "start"]
