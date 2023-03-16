const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5700;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(cors());
const taskRoute = require('./routes/todoItems');

mongoose.connect(process.env.MasoudDB)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))

app.use('/', taskRoute);

app.listen(PORT, ()=> console.log(`Server connected on port ${PORT}`) );
