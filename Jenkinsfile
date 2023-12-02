pipeline{
  agent {label 'agentLinux'}
  triggers {
    githubPush()
  }

  stages{
    stage('Check Version'){
      steps {
        sh "node --version"
        sh "npm --version"
      }
    }
  }
}
