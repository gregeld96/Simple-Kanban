<template>
    <div>
        <Navbar @homePage='homeBtn' @addCategory='addForm' @logout='logoutUser'></Navbar>
        <div v-if="pageName == 'home'" class="row justify-content-around">
                <Category 
                    v-for="category in categories" 
                    :key="category.id" 
                    :category="category" 
                    :task="task"
                    :user='users'
                    @addNewTask='addTask'
                    @deleteDetailTask='deleteTask'
                    @editDetailTask='editTask'>
                </Category>
        </div>
        <AddCategory v-if="pageName == 'addForm'" @addNewCategory="newCategory"></AddCategory>
        <EditTask v-if="pageName == 'editForm'" @updatedTask='updateTask' :categories='categories' :taskDetail='taskDetail'></EditTask>
    </div>
</template>

<script>
import Category from '../components/Category'
import AddCategory from '../components/CategoryAddForm'
import EditTask from '../components/EditTaskForm'
import Navbar from '../components/Navbar'
import axios from '../config/axios'
export default {
    name: 'Main',
    data() {
        return {
            categories: [],
            task: [],
            users: [],
            taskDetail: {},
            pageName: 'home'
        }
    },
    methods: {
        fetchCategory(){
            axios({
                method: 'GET',
                url: '/categories/',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.categories = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTask(){
            axios({
                method: 'GET',
                url: '/tasks/',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.task = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchUser(){
            axios({
                method: 'GET',
                url: '/',
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.users = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTask(payload){
            axios({
                method: 'POST',
                url: '/tasks/add',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: payload.title,
                    categoryId: payload.categoryId
                }
            })
            .then(data => {
                this.task.push(data.data.data)
            })
            .catch(err => {
                    bootbox.alert(err.response.data.msg)
                })
        },
        addForm(payload){
            this.pageName = payload
            this.seen = false
        },
        newCategory(payload){
            axios({
                method: 'POST',
                url: '/categories/add',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    name: payload.name
                }
            })
            .then(({data}) => {
                this.categories.push(data.data)
                this.pageName = "home"
            })
            .catch(err => {
                bootbox.alert(err.response.data.msg)
            })
        },
        homeBtn(payload){
            this.pageName = payload;
        },
        logoutUser(payload){
            this.$emit('logout', payload)
        },
        deleteTask(payload){
            bootbox.confirm("Are you sure?", (result) => {
                if(result){
                    axios({
                        method: 'DELETE',
                        url: `/tasks/${payload}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })
                    .then(_=> {
                        let index = this.task.findIndex(el => el.id == payload)
                        this.task.splice(index, 1)
                        this.pageName = 'home'
                    })
                    .catch(err => {
                        bootbox.alert(err.response.data.msg)
                    })
                }
            })
            
        }, 
        editTask(payload){
            this.pageName = payload.pageName
            this.taskDetail = payload.data
        },
        updateTask(payload){
            axios({
                method: 'PUT',
                url: `/tasks/${payload.id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: payload.title,
                    categoryId: payload.selected
                }
            })
                .then(({data}) => {
                    let index = this.task.findIndex(el => el.id == payload.id)
                    this.task.splice(index, 1, data.task)
                    this.pageName = 'home'
                })
                .catch(err => {
                    bootbox.alert(err.response.data.msg)
                })
        }
    },
    created() {
        this.fetchCategory()
        this.fetchTask()
        this.fetchUser()
    },
    components: {
        Category,
        Navbar,
        AddCategory,
        EditTask
    }
}
</script>

<style>

</style>