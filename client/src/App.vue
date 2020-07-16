<template>
  <div>
    <div v-show="seen" class="text-center my-5">
      <button @click="transitionBtn('login')" type="button" class="btn btn-primary">Login</button>
      <button @click="transitionBtn('register')" type="button" class="btn btn-primary">Register</button>
    </div>
    <Login v-if="pageName == 'login'" @loginUser="login"></Login>
    <Register v-else-if="pageName == 'register'" @registerUser='register'></Register>
    <Main v-else @logout='logout'></Main>
  </div>
</template>

<script>
import Main from './pages/Main'
import Login from './pages/LoginForm'
import Register from './pages/Register'
import axios from 'axios'
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
        url: 'http://localhost:3000/login',
        data: {
          email: payload.email,
          password: payload.password 
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          // console.log(data.data)
          this.pageName = ''
          this.seen = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    register(payload){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
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
          console.log(err)
        })
    },
    logout(payload){
      this.pageName = payload
      localStorage.clear()
      this.seen = true
    }
  }
};
</script>

<style>

</style>