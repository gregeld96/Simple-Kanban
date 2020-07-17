<template>
    <div id="login-form">
        <div id="login-container">
            <h1 class="title-header text-center">Welcome at Kanban</h1>
            <div class="message"></div>
            <form  class="my-4" @submit.prevent="login">
                <div class="form-group">
                    <input type="email" class="form-control w-75 pl-3 mx-auto border-0" v-model="email" placeholder="example@email.com" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control pl-3 w-75 mx-auto border-0" v-model="password" placeholder="password" />
                </div>
                <div class="d-flex justify-content-center">
                    <button id="btn-login" type="submit" class="btn btn-primary w-75 rounded-lg">Login</button>
                </div>
            </form>
            <p class="text-center">OR</p>
            <div class="d-flex justify-content-center">
                <div id="my-signin2">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login-page',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('loginUser', payload)
        },
        onSuccess(googleUser) {
            // console.log(googleUser)
            let id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token)
            this.$emit('google', id_token)
        },
        onFailure(error) {
            console.log(error);
        },
        renderButton() {
            gapi.signin2.render('my-signin2', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.onSuccess,
                'onfailure': this.onFailure
            });
            // console.log(gapi.signin2.render)
        }
    },
    mounted(){
        console.log("Ini mounted login form")
        this.renderButton()
    }
}
</script>
<style>
#login-form {
    display: flex;
    justify-content: center;
    align-items: center;
}

#login-container {
    background-color: rgba(5, 6, 100, 0.76);
    padding: 40px;
    border-radius: 10px;
    color: white;
    width: 500px;
}
</style>