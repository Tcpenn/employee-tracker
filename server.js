// dependencies
const db = require('./db/connection');
const express = require('express');
// routes connection will be here

//ports 
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//api route will be here once connected

//Default response for not found requests
app.use((req, res) => {
    res.status(404).end();
});

//connection function to show connection was successful
//starts after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});

