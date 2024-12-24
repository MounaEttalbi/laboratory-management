# Étape 1 : Image de construction avec Maven et OpenJDK
FROM maven:3.8.8-eclipse-temurin-21 AS build

# Étape 2 : Répertoire de travail
WORKDIR /app

# Étape 3 : Copie des fichiers du projet
COPY . .

# Étape 4 : Construction du projet Maven
RUN mvn clean package -DskipTests

# Étape 5 : Image de runtime avec OpenJDK
FROM eclipse-temurin:21-jdk-alpine

# Étape 6 : Répertoire de travail
WORKDIR /app

# Étape 7 : Copie du fichier JAR généré
COPY --from=build /app/target/adresse-service-0.0.1-SNAPSHOT.jar /app/adresse-service.jar

# Étape 8 : Commande d'exécution
ENTRYPOINT ["java", "-jar", "/app/adresse-service.jar"]

# Expose le port 8090
EXPOSE 8090

# Commande pour démarrer l'application Spring Boot
# CMD ["java", "-jar", "ProjetLibre.jar"]