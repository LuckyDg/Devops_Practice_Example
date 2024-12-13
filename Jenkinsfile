pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io/luckydg'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/luckydg/Devops_Practice_Example.git'
            }
        }
        stage('Construir Imágenes Docker') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }
        stage('Etiquetar y Subir Imágenes') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"

                        sh """
                        docker tag ms-auth:latest ${DOCKER_REGISTRY}/ms-auth:${IMAGE_TAG}
                        docker push ${DOCKER_REGISTRY}/ms-auth:${IMAGE_TAG}

                        docker tag ms-ship:latest ${DOCKER_REGISTRY}/ms-ship:${IMAGE_TAG}
                        docker push ${DOCKER_REGISTRY}/ms-ship:${IMAGE_TAG}

                        docker tag api-gateway:latest ${DOCKER_REGISTRY}/api-gateway:${IMAGE_TAG}
                        docker push ${DOCKER_REGISTRY}/api-gateway:${IMAGE_TAG}
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "La pipeline se completó correctamente. Imágenes Docker subidas con éxito."
        }
        failure {
            echo "Hubo un error en la pipeline. Revisa los logs para más detalles."
        }
        always {
            echo "Proceso completado."
        }
    }
}
