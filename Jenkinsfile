pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-angular-app:latest'
        DOCKER_PORT = '8080'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/HAJAR759/gestion-de-laboratoire.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }
        stage('Build Angular App') {
            steps {
                bat 'npm run build --prod'
            }
        }
        stage('Prepare Dockerfile') {
            steps {
                writeFile file: 'Dockerfile', text: '''
                # Étape 1 : Construire l'application Angular
                FROM node:18 AS builder
                WORKDIR /app
                COPY package*.json ./
                RUN npm install --legacy-peer-deps
                COPY . .
                RUN npm run build --prod

                # Étape 2 : Servir l'application avec NGINX
                FROM nginx:alpine
                COPY --from=builder /app/dist/projet-libre-frontend /usr/share/nginx/html
                EXPOSE 80
                CMD ["nginx", "-g", "daemon off;"]
                '''
            }
        }
        stage('Docker Build') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }
        stage('Docker Run') {
            steps {
                bat 'docker run -d -p %DOCKER_PORT%:80 %DOCKER_IMAGE%'
            }
        }
    }
}
