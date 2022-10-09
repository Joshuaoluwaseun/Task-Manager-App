require('dotenv').config()
const express = require('express');
const app = express()
const tasks = require('./routes/tasksroutes')
const connectDB = require('./database/db')
const notFound = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/error')


app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)
app.use(notFound);
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000

const startServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        
        app.listen(port, () => console.log(`Server is up and running on ${port}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()