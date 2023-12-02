pipeline{
  agent {label 'agentLinux'}

  stages{
    stage('Check Version'){
      steps {
        sh "node --version"
        sh "npm --version"
      }
    }
  }
}
