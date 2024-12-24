# Étape 1 : Utilisation de l'image Java comme base
FROM openjdk:17-jdk-slim as build

# Étape 2 : Répertoire de travail
WORKDIR /app

# Étape 3 : Copie des fichiers de votre projet
COPY . /app

# Étape 4 : Construction du projet
RUN mvn clean package -DskipTests

# Étape 5 : Image de runtime
FROM openjdk:17-jdk-slim

# Étape 6 : Répertoire de travail
WORKDIR /app

# Étape 7 : Copie du fichier JAR généré
COPY --from=build /app/target/adresse-service.jar /app/adresse-service.jar

# Étape 8 : Commande d'exécution du service
ENTRYPOINT ["java", "-jar", "/app/adresse-service.jar"]

# Expose le port 8090 par défaut
EXPOSE 8090
