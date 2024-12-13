pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/LuckyDg/Devops_Practice_Example.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('api-gateway') {
                    sh 'npm install'
                }
                dir('ms-auth') {
                    sh 'npm install'
                }
                dir('ms-ship') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t api-gateway:latest api-gateway/'
                sh 'docker build -t ms-auth:latest ms-auth/'
                sh 'docker build -t ms-ship:latest ms-ship/'
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}
