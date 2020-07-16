<template>
  <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-todo"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a @click="homeBtn('home')" style="cursor: pointer;" class="navbar-brand">KANBAN</a>
                <div class="collapse navbar-collapse" id="navbar-todo">
                    <div class="my-2 mx-auto">
                        <button @click="addCategoryBtn('addForm')" class="btn btn-primary my-2 my-sm-0">Add Category</button>
                    </div>
                    <div class="my-2 my-lg-0">
                        <button @click="logoutBtn('login')" class="btn btn-light my-2 my-sm-0">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        addCategoryBtn(payload){
            // console.log(payload)
            this.$emit('addCategory', payload)
        },
        homeBtn(payload){
            // console.log(payload)
            this.$emit('homePage', payload)
        },
        logoutBtn(payload){
            //console.log(payload)
            this.$emit('logout', payload)
        }
    }
}
</script>

<style>

</style>