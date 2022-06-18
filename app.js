require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const routes = require('./routes/routes')
const funFridayroutes = require('./routes/funFridayRoutes')
const gameRoutes = require('./routes/gameRoutes')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use('/api', routes)
app.use('/app', funFridayroutes)
app.use('/game', gameRoutes)

app.listen(8080, () => {
    console.log(`Server Started at `)
})