require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const router = require('../routers');
const error = require('./middlewares/error-handler');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router);
app.use(error);

app.listen(port, () => {
    console.log(`App listen on http://localhost:${port}`)
})