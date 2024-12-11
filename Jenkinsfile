pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-angular-app' // Nom de l'image Docker
        DOCKER_PORT = '80'             // Port pour exposer le conteneur
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/HAJAR759/gestion-de-laboratoire.git' // Remplacez par votre dépôt Git
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Angular App') {
            steps {
                sh 'npm run build --prod'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        stage('Docker Run') {
            steps {
                sh 'docker run -d -p ${DOCKER_PORT}:80 ${DOCKER_IMAGE}'
            }
        }
    }
}
