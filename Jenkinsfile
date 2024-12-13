pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io/luckydg' // Cambia 'tu_usuario' por tu nombre de usuario de Docker Hub
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                // Clonamos el repositorio del proyecto tal como está
                git branch: 'main', url: 'https://github.com/luckydg/Devops_Practice_Example.git'
            }
        }

        stage('Crear Imagen Docker con la Estructura del Proyecto') {
            steps {
                script {
                    // Crear la estructura del proyecto sin ejecutar dependencias
                    sh '''
                    mkdir -p fleet-management/api-gateway
                    mkdir -p fleet-management/ms-chips
                    mkdir -p fleet-management/ms-out
                    
                    # Copiar los archivos del repositorio a sus respectivas carpetas
                    cp -r api-gateway/* fleet-management/api-gateway/
                    cp -r ms-chips/* fleet-management/ms-chips/
                    cp -r ms-out/* fleet-management/ms-out/

                    # Asegurarnos de que el docker-compose.yml está en la raíz de la estructura
                    cp docker-compose.yml fleet-management/
                    '''
                }
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                script {
                    // Construir la imagen Docker que contiene solo la estructura del proyecto sin dependencias
                    sh 'docker build -t ${DOCKER_REGISTRY}/fleet-management:${IMAGE_TAG} ./fleet-management'
                }
            }
        }

        stage('Subir Imagen Docker') {
            steps {
                script {
                    // Autenticación con las credenciales configuradas en Jenkins
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"

                        // Subir la imagen Docker al registro
                        sh "docker push ${DOCKER_REGISTRY}/fleet-management:${IMAGE_TAG}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Opcional: Archivar cualquier artefacto que necesites (en este caso, no estamos generando ningún artefacto extra)
            echo "Proceso completado."
        }
    }
}
