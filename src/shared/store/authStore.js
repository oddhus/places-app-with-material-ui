import axios from 'axios'

export function authStore() {
  // note the use of this which refers to observable instance of the this
  return {
    isLoggedIn: false,
    isNewUser: false,
    userId: "",
    loginError: "",
    signUpError: "",
    openLoginError: false,
    openSignUpError: false,
    isLoading: false,
    setOpenLoginError(value){
      this.openLoginError = value
    },
    async login(email, password, newUser = false){
      this.openLoginError = false
      this.isLoading = true
      try {
        const response = await axios.post('http://localhost:5000/api/users/signin',{
          email,
          password
        })
        this.isLoading = false
        if(response.statusText === 'OK'){
          this.isLoggedIn = true
          this.userId = response.data.user.id
        }
      } catch (error) {
        this.isLoading = false
        this.loginError = error.response ? error.response.data.message : "Ops.. Something went wrong!"
        this.openLoginError = true
      }
    },
    async signup(firstName, lastName, email, password){
      this.openLoginError = false
      this.isLoading = true
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup',{
          name: `${firstName} ${lastName}`,
          email,
          password
        })
        this.isLoading = false
        this.isLoggedIn = true
        this.userId = response.data.user.id
        this.isNewUser = true
        setTimeout(() => {
          this.isNewUser = false
        }, 5000)
      } catch (error) {
        this.isLoading = false
        this.signUpError = error.response ? error.response.data.message : "Ops.. Something went wrong!"
        this.openSignUpError = true
      }
    },
    logout(){
      this.isLoggedIn = false
      this.userId = ""
    }
  }
}

