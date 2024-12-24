# Étape 1 : Image de construction avec Maven et OpenJDK
FROM maven:3.8.8-openjdk-17 AS build

# Étape 2 : Répertoire de travail
WORKDIR /app

# Étape 3 : Copie des fichiers du projet
COPY . .

# Étape 4 : Construction du projet Maven
RUN mvn clean package -DskipTests

# Étape 5 : Image de runtime avec OpenJDK
FROM openjdk:17-jdk-slim

# Étape 6 : Répertoire de travail
WORKDIR /app

# Étape 7 : Copie du fichier JAR généré
COPY --from=build /app/target/*.jar /app/adresse-service.jar

# Étape 8 : Commande d'exécution
ENTRYPOINT ["java", "-jar", "/app/adresse-service.jar"]

# Expose le port 8090
EXPOSE 8090
