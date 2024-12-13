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

        stage('Crear Imagen Docker con la Estructura del Proyecto') {
            steps {
                script {
                    sh '''
                    mkdir -p fleet-management/api-gateway
                    mkdir -p fleet-management/ms-ships
                    mkdir -p fleet-management/ms-auth
                    
                    # Copiar todas las carpetas y archivos del repositorio a las carpetas correspondientes
                    cp -r api-gateway/* fleet-management/api-gateway/
                    cp -r ms-ships/* fleet-management/ms-ships/
                    cp -r ms-auth/* fleet-management/ms-auth/

                    # Copiar docker-compose.yml a la raíz del proyecto
                    cp docker-compose.yml fleet-management/
                    '''
                }
            }
        }


        stage('Construir Imagen Docker') {
            steps {
                script {
                    // Construir la imagen Docker que contiene solo la estructura del proyecto
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
