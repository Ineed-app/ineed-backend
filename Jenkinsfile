pipeline{
  agent {label 'Built-In Node'}

  stages{
    stage('Check Version'){
      steps {
        sh "node --version"
        sh "npm --version"
      }
    }
  }
}
