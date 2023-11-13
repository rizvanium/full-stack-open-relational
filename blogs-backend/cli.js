require('dotenv').config()
const Blog = require('./models/Blog.js')
const sequelize = require('./sequilize.js')

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const blogs = await Blog.findAll()
    blogs.forEach(({dataValues: { author, title, likes }}) => console.log(`${author}: '${title}', ${likes} likes`))
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()