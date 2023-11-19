const Blog = require('./blog.js')
const User = require('./user.js')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: false })
User.sync({ alter: false })

module.exports = {
  Blog,
  User,
}