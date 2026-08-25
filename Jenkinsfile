pipeline {
    agent any

    stages {
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo "installing the dependencies...."
                    sh 'npm install'
                    echo "dependencies installed"
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    echo "testing stage initiated...."
                    sh 'npm test'
                    echo "testing phase completed"
                }
            }
        }
        stage('validating docker') {
            steps {
                sh 'docker --version'
                sh 'docker compose --version'
                echo "docker validation success"
            }
        }
        stage('building the image and containers') {
            steps {
                sh 'docker compose up -d'
                sh 'docker compose ps'
                echo "image and containers build and ran succesfully"
            }
        }
    }
}