<template>
    <div>
        <Navbar @homePage='homeBtn' @addCategory='addForm' @logout='logoutUser'></Navbar>
        <ErrorMessage v-show="seen" :error='error'></ErrorMessage>
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
import ErrorMessage from '../components/ErrorMessage'
import axios from '../config/axios'
export default {
    name: 'Main',
    data() {
        return {
            categories: [],
            task: [],
            users: [],
            taskDetail: {},
            error: '',
            seen: false,
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
                    this.error = err.response.data.msg
                    this.seen = true
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
                console.log(err.response)
                this.error = err.response.data.msg
                this.seen = true
            })
        },
        homeBtn(payload){
            this.pageName = payload;
            this.seen = false
        },
        logoutUser(payload){
            this.$emit('logout', payload)
            this.seen = false
        },
        deleteTask(payload){
            bootbox.confirm("Are you sure?", (result) => {
                console.log(result)
                if(result){
                    axios({
                        method: 'DELETE',
                        url: `/tasks/${payload}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })
                    .then(_=> {
                        console.log(this.task)
                        let index = this.task.findIndex(el => el.id == payload)
                        // for (let i = 0; i < this.task.length; i++){
                        //     console.log(this.task[i])
                        //     if(this.task[i].id == payload){
                        //         index = i
                        //         break
                        //     }
                        // }
                        
                        console.log('Berhasil', '====setelah splice')
                        this.task.splice(index, 1)
                        this.pageName = 'home'
                    })
                    .catch(err => {
                        console.log('error')
                            this.error = err.response.data.msg
                            this.seen = true
                    })
                }
            })
            
        }, 
        editTask(payload){
            this.pageName = payload.pageName
            this.taskDetail = payload.data
            this.seen = false
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
                    console.log(err)
                    this.error = err.response.data.msg
                    this.seen = true
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
        EditTask,
        ErrorMessage
    }
}
</script>

<style>

</style>