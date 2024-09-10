const express = require("express");
const cors = require('cors');
const connection = require('./db/connection')
const routes = require('./routes/routes')
const port = 8000
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200
  }));

  //routes
  app.use('/api', routes)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })