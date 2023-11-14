const { PORT } = require('./util/config.js');
const express = require('express')
require('express-async-errors')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.log('errorHandler:', error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ errors: [ 'malformatted id' ] })
  }

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ errors: error.errors.map(err => err.message) })
  }

  next(error)
}

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
}

start()