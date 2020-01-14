const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb+srv://julio:32991046@omnisstack-a9vqx.mongodb.net/week10?retryWrites=true&w=majority', {
// mongoose.connect('mongodb://julio:32991046@omnisstack-shard-00-00-a9vqx.mongodb.net:27017,omnisstack-shard-00-01-a9vqx.mongodb.net:27017,omnisstack-shard-00-02-a9vqx.mongodb.net:27017/week10?ssl=true&replicaSet=OmnisStack-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected successfully!'))

app.use(express.json())
app.use(routes)



app.listen(3333, () => console.log('Server running on port 3333!'))