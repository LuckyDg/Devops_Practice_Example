pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        PROJECT_ROOT = "${env.WORKSPACE}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Clonando el código desde Git"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def services = ['api-gateway', 'ms-auth', 'ms-ship']
                    for (service in services) {
                        echo "Instalando dependencias en ${service}"
                        dir("${service}") {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    def services = ['api-gateway', 'ms-auth', 'ms-ship']
                    for (service in services) {
                        echo "Construyendo la imagen Docker para ${service}"
                        sh "docker build -t ${service}:latest ${service}/"
                    }
                }
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                echo "Levantando todos los servicios con Docker Compose"
                sh "docker-compose up -d"
            }
        }

        stage('Run Tests') {
            steps {
                echo "Ejecutando pruebas"
                // Deshabilitado para evitar el error
                sh "docker-compose exec -T ms-auth npm test"
            }
        }

        stage('Deploy to AWS (Optional)') {
            steps {
                echo "Desplegando en AWS (Pendiente de implementar)"
            }
        }
    }

    post {
        always {
            echo "Pipeline terminado"
            sh "docker-compose down"
        }
        failure {
            echo "Pipeline fallido. Revisa los logs para más detalles."
        }
    }
}
