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
                @deleteDetailTask='deleteTask'>
            </Category>
        </div>
        <AddCategory v-if="pageName == 'addForm'" @addNewCategory="newCategory"></AddCategory>
    </div>
</template>

<script>
import Category from '../components/Category'
import AddCategory from '../components/CategoryAddForm'
import Navbar from '../components/Navbar'
import axios from 'axios'
export default {
    name: 'Main',
    data() {
        return {
            categories: [],
            task: [],
            users: [],
            pageName: 'home'
        }
    },
    methods: {
        fetchCategory(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/categories/',
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
                url: 'http://localhost:3000/tasks/',
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
                url: 'http://localhost:3000/',
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
                url: 'http://localhost:3000/tasks/add',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: payload.title,
                    categoryId: payload.categoryId
                }
            })
            .then(data => {
                console.log(data.data.data)
                this.task.push(data.data.data)
            })
            .catch(err => {
                    console.log(err)
                })
        },
        addForm(payload){
            this.pageName = payload
        },
        newCategory(payload){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/categories/add',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    name: payload.title,
                }
            })
            .then(({data}) => {
                this.categories.push(data.data)
                this.pageName = "home"
            })
            .catch(err => {
                    console.log(err)
            })
        },
        homeBtn(payload){
            this.pageName = payload;
        },
        logoutUser(payload){
            this.$emit('logout', payload)
        },
        deleteTask(payload){
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/tasks/${payload}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(_=> {
                let index = this.task.findIndex(el => el.id == payload)
                this.task.splice(index, 1)
            })
            .catch(err => {
                    console.log(err)
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
        AddCategory
    }
}
</script>

<style>

</style>