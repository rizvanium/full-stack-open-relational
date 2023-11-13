const express = require('express')
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config.js');
const blogsRouter = require('./controllers/blogs')
const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
}

start()