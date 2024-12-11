pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-angular-app' // Nom de l'image Docker
        DOCKER_PORT = '80'              // Port pour exposer le conteneur
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/HAJAR759/gestion-de-laboratoire.git' // Remplacez par votre dépôt Git
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install' // Utilisation de bat au lieu de sh sous Windows
            }
        }
        stage('Build Angular App') {
            steps {
                bat 'npm run build --prod' // Utilisation de bat au lieu de sh sous Windows
            }
        }
        stage('Docker Build') {
            steps {
                bat 'docker build -t ${DOCKER_IMAGE} .' // Utilisation de bat pour Docker sous Windows
            }
        }
        stage('Docker Run') {
            steps {
                bat 'docker run -d -p ${DOCKER_PORT}:80 ${DOCKER_IMAGE}' // Utilisation de bat pour Docker sous Windows
            }
        }
    }
}
