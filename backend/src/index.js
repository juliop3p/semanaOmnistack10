const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

mongoose.connect(process.env.BD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log('Database connected successfully!'))

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)



app.listen(3333, () => console.log('Server running on port 3333!'))