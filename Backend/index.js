const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/Userroutes.js');

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("Error in DB connection:", err);
    });

app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('you are at root route');
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log(`Server is running at http://localhost:${PORT}`);
    }
});
