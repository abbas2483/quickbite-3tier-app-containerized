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
        stage('logging into docker hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'Docker_hub_Password', usernameVariable: 'Docker_hub_Username')]) {
                    sh 'docker login -u $Docker_hub_Username -p $Docker_hub_Password'
                    echo "logging into dockerhub"
}
                        }
        }
        stage ('tagging the images..') {
            steps {
                echo "tagging the image..."
                sh 'docker tag frontend-image:latest quickbite-fe:v1'
                sh 'docker tag backend-image:latest quickbite-be:v1'
            }
        }
        stage ('pushing it to dockerhub'){
            steps {
                echo "pushing the iamges to dockerhub"
                sh 'docker push abbas2483/quickbite-fe:v1'
                sh 'docker push abbas2483/quickbite-be:v1'
            }
        }
        stage ('End') {
            steps {
                echo "congratulation.."
            }
        }
    }
}