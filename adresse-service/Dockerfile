# Étape 1 : Image de base
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app

# Étape 2 : Copier les fichiers nécessaires
COPY . .

# Étape 3 : Construire l'application
RUN ./mvnw clean package -DskipTests

# Étape 4 : Image exécutable
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/adresse-service-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port de l'application
EXPOSE 8090

# Commande d'exécution
ENTRYPOINT ["java", "-jar", "app.jar"]
