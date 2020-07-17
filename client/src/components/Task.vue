<template>
    <div class="my-2 py-3 px-2 border mx-4 task">
        <p>{{ taskDetail.title}}</p>
        <email v-for="list in userDetail" :key="list.id" :userDetail="list"></email>
        <div class="pt-4 d-flex justify-content-around">
          <img style="cursor: pointer;" @click='editBtn' src="https://img.icons8.com/windows/32/000000/edit-file.png"/>
          <img style="cursor: pointer;" @click='deleteBtn' src="https://img.icons8.com/windows/32/000000/delete-sign.png"/>
        </div>
    </div>
</template>

<script>
import email from './Email'
export default {
    name: 'task-detail',
    props: ['taskDetail', "user"],
    methods: {
        editBtn(){
            let payload = {
                data: this.taskDetail,
                pageName: 'editForm'
            }
            this.$emit('editTask', payload)
        },
        deleteBtn(){
            this.$emit('deleteTask', this.taskDetail.id)
        }
    },
    computed: {
        userDetail() {
            let filter = []
            this.user.forEach(userDetail => {
                if(userDetail.id == this.taskDetail.userId){
                    filter.push(userDetail)
                }
            })
            return filter;
        }
    },
    components: {
        email
    }
}
</script>
    
<style>
.task{
    width: 300px;
}
</style>