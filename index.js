require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const studentRoute = require('./routes/studentroute')
const cors = require('cors')
const authRoute = require('./routes/auth')
const cookieParser = require('cookie-parser')
app.use(cors())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('database connection done successfully')
    })
    .catch((err) => {
        console.log(`Error in connecting the database. n${err}`);
    })
app.use(express.json())
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/studentroute', studentRoute)
app.use('/', authRoute)