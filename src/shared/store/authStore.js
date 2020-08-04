export function authStore() {
  // note the use of this which refers to observable instance of the this
  return {
    isLoggedIn: false,
    isNewUser: false,
    userId: "",
    login({userId, newUser}){
      this.isLoggedIn = true
      this.userId = userId
      this.isNewUser = newUser
      if(newUser){
        setTimeout(() => {
          this.isNewUser = false
        }, 5000)
      }
    },
    logout(){
      this.isLoggedIn = false
      this.userId = ""
    }
  }
}

