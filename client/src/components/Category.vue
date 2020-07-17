<template>
    <div class="card mt-3">
        <div class="card-header text-center mb-1">
            <h4>{{ category.name }}</h4>
        </div>
        <div style="overflow-y:scroll; height:500px;">
            <Task v-for="list in taskCategory" :key="list.id" :taskDetail="list" :user='user' @editTask='editTask' @deleteTask='deleteTask'></Task>
        </div>
        <div v-if="pageName == 'addForm'">
            <form @submit.prevent="addTask">
                <input type="text" class="my-2 py-3 px-2 border mx-4 task" hidden v-model="category.id" />
                <input type="text" class="my-2 py-3 px-2 border mx-4 task" v-model="title" />
                <div class="card-footer d-flex justify-content-around">
                    <button type="submit"><img src="https://img.icons8.com/emoji/32/000000/check-mark-emoji.png"/></button>
                </div>
            </form>
        </div>
        <div v-if="pageName == 'addBtn'" @click="addBtn('addForm')" class="card-footer d-flex justify-content-around">
            <img style="cursor: pointer;" src="https://img.icons8.com/flat_round/32/000000/plus.png"/>
        </div>
        
    </div>
</template>

<script>
import Task from './Task'
export default {
    name: 'category-task',
    data() {
        return {
            title: '',
            categoryId: '',
            pageName: 'addBtn'
        }
    },
    props: ["category", "task", "user"],
    components: {
        Task
    },
    computed: {
        taskCategory() {
            let filter = []
            this.task.forEach(todo => {
                if(todo.categoryId == this.category.id){
                    filter.push(todo)
                }
            })
            return filter;
        }
    },
    methods: {
        addTask(){
            let payload = {
                title: this.title,
                categoryId: this.category.id
            }
            this.$emit('addNewTask', payload)
            this.title = ''
            this.pageName = 'addBtn'
        },
        addBtn(name){
            this.pageName = name
        },
        editTask(payload){
            this.$emit('editDetailTask', payload)
        },
        deleteTask(payload){
            this.$emit('deleteDetailTask', payload)
        }
    }
}
</script>

<style>
.card {
    width: 360px;
}
.task {
    width: 310px;
}
</style>