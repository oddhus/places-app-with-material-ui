export function uiStore(){
  return {
    isLoading: false,
    setIsLoading(value){
      this.isLoading = value
    },

    showStatus: false,
    statusMessage: "",
    setStatusMessage(message){
      this.statusMessage = message
    },
    setShowStatus(value){
      this.showStatus = value
    },
    startShowStatus(){
      this.isLoading = false
      this.showStatus = true
      setTimeout(() => {
        this.showStatus = false
        this.statusMessage = ""
      }, 5000)
    },

    showError: false,
    errorMessage: "",
    setErrorMessage(message){
      this.errorMessage = message
    },
    setShowError(value){
      this.showError = value
    },
    startShowError(){
      this.isLoading = false
      this.showError = true
      setTimeout(() => {
        this.showError = false
        this.errorMessage = ""
      }, 5000)
    }
  }
}