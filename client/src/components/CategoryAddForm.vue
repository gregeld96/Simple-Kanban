<template>
    <div id="add-form" class="my-5">
        <div id="add-container">
            <h1 class="title-header text-center">Add Your Category</h1>
            <div class="message"></div>
            <form class="my-4" @submit.prevent="addCategory">
                <div class="form-group">
                    <input type="text" class="form-control w-75 pl-3 mx-auto border-0" v-model="name" />
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary w-75 rounded-lg">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'category-add-form',
    data() {
        return {
            name: ' '
        }
    },
    methods: {
        addCategory(){
            let payload = {
                name: this.name
            }
            this.$emit('addNewCategory', payload)
        }
    }
}
</script>

<style>
#add-form {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    overflow: auto;
}

#add-container {
    background-color: rgba(5, 6, 100, 0.76);
    padding: 40px;
    border-radius: 10px;
    color: white;
    width: 500px;
}
</style>