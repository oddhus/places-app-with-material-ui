import axios from 'axios'

export function authStore() {
  // note the use of this which refers to observable instance of the this
  return {
    isLoggedIn: false,
    isNewUser: false,
    userId: "",
    token: "",
    loginError: "",
    signUpError: "",
    openLoginError: false,
    openSignUpError: false,
    isLoading: false,
    setOpenLoginError(value){
      this.openLoginError = value
    },
    setOpenSignUpError(value){
      this.signUpError = value
    },
    async login(email, password){
      this.openLoginError = false
      this.isLoading = true
      try {
        const response = await axios.post('http://localhost:5000/api/users/signin',{
          email,
          password
        })
        this.isLoading = false
        if(response.statusText === 'OK'){
          this.isLoggedIn = !!response.data.token
          this.userId = response.data.userId
          this.token = response.data.token
        }
      } catch (error) {
        this.isLoading = false
        this.loginError = error.response ? error.response.data.message : "Ops.. Something went wrong!"
        this.openLoginError = true
      }
    },
    async signup(firstName, lastName, email, password, image){
      this.openLoginError = false
      this.isLoading = true
      const userFormData = new FormData();
      userFormData.append("image", image ? image[0] : null)
      userFormData.append("name", `${firstName} ${lastName}`);
      userFormData.append("email", email);
      userFormData.append("password", password);
      try {
        const response = await axios({
          method: "POST",
          url: 'http://localhost:5000/api/users/signup',
          data: userFormData,
          headers: {
          'Content-Type': 'multipart/form-data;'
          }
        })
        this.isLoading = false
        this.userId = response.data.userId
        this.token = response.data.token
        this.isLoggedIn = !!response.data.token
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
      this.userId = null
      this.token = null
    }
  }
}

