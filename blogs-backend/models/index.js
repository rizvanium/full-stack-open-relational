const Blog = require('./blog.js')
const User = require('./user.js')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Blog,
  User
}