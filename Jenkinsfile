properties([pipelineTriggers([githubPush()])])
pipeline{
  agent {label 'agentLinux'}

  stages{
    stage('Install Dependencies'){
      steps {
        sh "npm install"
        sh "npm cache clean -f"
      }
    }
    stage('Stop Node'){
      steps{
        sh "pm2 stop all"
      }
    }
    // stage('Start Node'){
    //     sh "pm2 start"
    // }
  }
}
