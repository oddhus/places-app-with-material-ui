export function uiStore(){
  return {
    isLoading: false,
    setIsLoading(value){
      this.isLoading = value
    },

    showStatus: false,
    statusMessage: "",
    isError: false,
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
        this.isError = false
        this.showStatus = false
        this.statusMessage = ""
      }, 5000)
    }
  }
}