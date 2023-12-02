pipeline{
  agent {label 'agentlinux'}

  stages{
    stage('Check Version'){
      steps {
        sh "node --version"
        sh "npm --version"
      }
    }
  }
}
