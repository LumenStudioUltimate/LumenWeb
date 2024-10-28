pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'LYJ_DockerHub', passwordVariable: 'password', usernameVariable: 'username')]) {
                        sh """
                        echo $password | docker login --username $username --password-stdin
                        docker build -f Dockerfile -t $username/lumenWeb .
                        docker push $username/lumenWeb
                        """
                    }
                }
            }
        }

        stage('Deploy to Prod') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'LYJ_DockerHub', passwordVariable: 'password', usernameVariable: 'username')]) {
                        sh """
                        docker ps
                        docker stop lumenWeb || true
                        docker rm lumenWeb || true
                        docker pull $username/lumenWeb
                        docker run -d --name lumenWeb --restart always -p 9006:3000 $username/lumenWeb
                        docker image prune -f
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}