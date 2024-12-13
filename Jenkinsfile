pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io/luckydg' // Cambia 'tu_usuario' por tu nombre de usuario de Docker Hub
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
                    // Construir las imágenes para cada servicio en el docker-compose.yml
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }
        stage('Etiquetar y Subir Imágenes') {
            steps {
                script {
                    // Autenticación con las credenciales configuradas en Jenkins
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Aquí usamos las credenciales directamente sin necesidad de definir las variables 'DOCKER_USER' y 'DOCKER_PASS'
                        sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"

                        // Etiquetar y subir las imágenes al registro
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
        stage('Crear Artefacto del Proyecto') {
            steps {
                script {
                    // Empaquetar los archivos importantes del proyecto
                    sh 'tar -czf proyecto-flotas.tar.gz docker-compose.yml README.md'
                }
            }
        }
    }

    post {
        always {
            // Guardar el artefacto comprimido para futuras descargas
            archiveArtifacts artifacts: 'proyecto-flotas.tar.gz', fingerprint: true
        }
    }
}
