pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-angular-app:latest'  // Nom de l'image Docker
        DOCKER_PORT = '4200'                    // Port pour exposer l'application Angular
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
        stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'  // Construction de l'image Docker à partir du Dockerfile
            }
        }
        stage('Docker Run') {
            steps {
                bat 'docker run -d -p 4200:4200 %DOCKER_IMAGE%'  // Expose l'application sur le port 4200
            }
        }
    }
}
