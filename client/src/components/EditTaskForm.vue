<template>
      <div id="edit-form" class="my-5">
        <div id="edit-container">
            <h1 class="title-header text-center">Edit Your Task</h1>
            <div class="message"></div>
            <form class="my-4" @submit.prevent="editTask">
                <div class="form-group">
                    <input type="text" class="form-control w-75 pl-3 mx-auto border-0" v-model="title" />
                </div>
                <select class="custom-select mb-4" v-model="selected">
                      <option v-for="category in categories" :key="category.id" :value='category.id'>{{category.name}}</option>
                </select>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary w-75 rounded-lg">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'edit-task-form',
    props: ["categories", "taskDetail"],
    data() {
        return {
            title: '',
            selected: ''
        }
    },
    methods: {
        editTask() {
            let payload = {
                id: this.taskDetail.id,
                title: this.title,
                selected: this.selected
            }
            this.$emit('updatedTask', payload)
        }
    },
    created(){
        this.title = this.taskDetail.title
        this.selected = this.taskDetail.categoryId
    }
}
</script>

<style>
#edit-form {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    overflow: auto;
}

#edit-container {
    background-color: rgba(5, 6, 100, 0.76);
    padding: 40px;
    border-radius: 10px;
    color: white;
    width: 500px;
}
</style>