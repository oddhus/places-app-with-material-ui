export function uiStore(){
  return {
    updatedPlace: false,
    setUpdatedPlace(isUpdated){
      this.updatedPlace = isUpdated
    },
    resetUpdatedPlace(){
      setTimeout(() => {
        this.updatedPlace = false
      }, 4000)
    }
  }
}