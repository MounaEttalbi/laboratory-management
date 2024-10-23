
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
