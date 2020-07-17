<template>
  <div>
    <div v-show="seen" class="text-center my-5">
      <button @click="transitionBtn('login')" type="button" class="btn btn-primary">Login</button>
      <button @click="transitionBtn('register')" type="button" class="btn btn-primary">Register</button>
    </div>
    <Login v-if="pageName == 'login'" @loginUser="login" @google='google'></Login>
    <Register v-else-if="pageName == 'register'" @registerUser='register'></Register>
    <Main v-else @logout='logout'></Main>
  </div>
</template>

<script>
import Main from './pages/Main'
import Login from './pages/LoginForm'
import Register from './pages/Register'
import axios from './config/axios'
export default {
  name: 'App',
  components: {
    Main,
    Login,
    Register
  },
  data() {
    return {
      pageName: 'login',
      seen: true
    }
  },
  methods: {
    transitionBtn(name){
      this.pageName = name
    },
    login(payload){
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password 
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          this.pageName = ''
          this.seen = false
        })
        .catch(err => {
          bootbox.alert(err.response.data.msg)
        })
    },
    register(payload){
      axios({
        method: 'POST',
        url: '/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(data => {
          this.pageName = 'login'
        })
        .catch(err => {
          bootbox.alert(err.response.data.msg)
        })
    },
    logout(payload){
      this.signOut().then(() => {
        console.log('User signed out.');
        this.pageName = payload
        this.seen = true
        localStorage.clear()
        sessionStorage.clear()
      });
    },
    google(payload){
      axios({
        method: 'POST',
        url: '/google',
        data: {
          id_token: payload
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          this.pageName = ''
          this.seen = false
        })
        .catch(err => {
          bootbox.alert(err.response.data.msg)
        })
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      return auth2.signOut()
    },
  }
};
</script>

<style>

</style>