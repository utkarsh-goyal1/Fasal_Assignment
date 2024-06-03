const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 8888;
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/Userroutes.js');

mongoose.connect("mongodb://127.0.0.1:27017/Movie-Library")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("Error in DB");
    })


app.listen(PORT, (err) => {
    console.log(`server is running at http://localhost:${PORT}`);
})

app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('you are at root route')
})
