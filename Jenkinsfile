pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-angular-app:latest'  // Nom de l'image Docker
        DOCKER_PORT = '80'                      // Port pour exposer le conteneur
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/HAJAR759/gestion-de-laboratoire.git'  // Remplacez par votre dépôt Git
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'  // Utilisation de --legacy-peer-deps pour ignorer les conflits de dépendances
            }
        }
        stage('Build Angular App') {
            steps {
                bat 'npm run build --prod'  // Utilisation de npm run build --prod pour construire l'application en mode production
            }
        }
         stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'  // Utilisation de %DOCKER_IMAGE% pour la syntaxe sous Windows
            }
        }
        stage('Docker Run') {
            steps {
                bat 'docker run -d -p 8080:80 %DOCKER_IMAGE%'  // Exposez l'application sur le port 80
            }
        }
        stage('Clean Docker Images') {
            steps {
                bat 'docker system prune -af'  // Nettoie les anciennes images Docker
            }
        }
    }
}
