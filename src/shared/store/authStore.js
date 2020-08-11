import React from 'react'
import axios from 'axios'

export function authStore() {
  // note the use of this which refers to observable instance of the this
  return {
    isNewUser: false,
    userId: !!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).userId : "",
    token: !!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : "",
    expirationDate: !!localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).expirationDate : null,
    loginError: "",
    signUpError: "",
    openLoginError: false,
    openSignUpError: false,
    isLoading: false,
    isLoggedIn(){
      return !!this.token && !!this.userId && (new Date(this.expirationDate) > new Date())
    },
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/signin`,{
          email,
          password
        })
        this.isLoading = false
        if(response.statusText === 'OK'){
          this.handleLogin(response)
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
          url: `${process.env.REACT_APP_API_URL}/api/users/signup`,
          data: userFormData,
          headers: {
          'Content-Type': 'multipart/form-data;'
          }
        })
        this.handleLogin(response)
        this.isLoading = false
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
    handleLogin(response){
      this.userId = response.data.userId
      this.token = response.data.token
      this.expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
      localStorage.setItem('userData', JSON.stringify({userId: this.userId, token: this.token, expirationDate: this.expirationDate.toISOString()}))
    },
    logout(){
      this.userId = null
      this.token = null
      localStorage.removeItem('userData')
    }
  }
}

