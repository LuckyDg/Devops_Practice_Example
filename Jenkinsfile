pipeline {
    agent any

    environment {
        IMAGE_TAG = "latest"
        SERVICES = ["api-gateway", "ms-auth", "ms-ship"]
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm: [
                    $class: 'GitSCM',
                    branches: [[name: 'refs/heads/main']],
                    userRemoteConfigs: [[url: 'https://github.com/LuckyDg/Devops_Practice_Example.git']]
                ]
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    SERVICES.each { service ->
                        dir(service) {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    SERVICES.each { service ->
                        sh "docker build -t ${service}:${IMAGE_TAG} ./${service}/"
                    }
                }
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
