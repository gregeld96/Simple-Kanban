import axios from 'axios'
const instace = axios.create({
    baseURL: 'https://kanban-simple-app.herokuapp.com/'
})

export default instace