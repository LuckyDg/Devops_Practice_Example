pipeline {
    agent any

    environment {
        IMAGE_TAG = "latest"
        DOCKER_IMAGE_NAME = "lucky/float-maritime-container-app"
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        SERVICES = 'api-gateway,ms-auth,ms-ship'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def servicesList = SERVICES.split(',')
                    servicesList.each { service ->
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
                    def servicesList = SERVICES.split(',')
                    servicesList.each { service ->
                        sh "docker build -t ${DOCKER_IMAGE_NAME}-${service}:${IMAGE_TAG} ./${service}/"
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    docker.withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    def servicesList = SERVICES.split(',')
                    servicesList.each { service ->
                        sh "docker push ${DOCKER_IMAGE_NAME}-${service}:${IMAGE_TAG}"
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
