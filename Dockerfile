<<<<<<< HEAD
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
RUN npm run build 

# Étape 2 : Servir l'application
FROM nginx:alpine

# Copier les fichiers de l'étape de construction vers le répertoire NGINX
COPY --from=builder /app/dist/projet_libre_frontend /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
=======

# Étape 1 : Construction de l'application
FROM node:20.14.0 AS builder

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de package et installe les dépendances
COPY package*.json ./ 
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Construire l'application Angular (assure-toi que cela place bien index.html dans dist)
RUN npm run build 

# Étape 2 : Exécution de l'application
FROM node:20.14.0

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers construits depuis l'étape de construction
# Modifie si index.html reste dans /src, sinon il devrait être dans dist/<project>

COPY --from=builder /app/dist/projet-libre-frontend/browser /app

# Installe http-server pour servir les fichiers statiques
RUN npm install -g http-server

# Expose le port
EXPOSE 4200

# Démarre le serveur
CMD ["http-server", "-p", "4200"]
>>>>>>> 3a1a9771991d229517e02c32674e0bcd5381dc11
