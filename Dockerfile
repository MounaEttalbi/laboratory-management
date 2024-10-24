# Étape 1 : Construire l'application Angular
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build --prod  # Assurez-vous que cela génère bien le dossier dist/projet_libre_frontend

# Étape 2 : Servir l'application avec NGINX
FROM nginx:alpine

# Copier les fichiers de l'étape de construction vers le répertoire NGINX
COPY --from=builder /app/dist/projet_libre_frontend /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
