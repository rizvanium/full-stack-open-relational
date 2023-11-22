const Blog = require('./blog.js')
const User = require('./user.js')
const ReadingList = require('./readingList.js')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsToMany(User, { through: ReadingList })

module.exports = {
  Blog,
  User,
  ReadingList,
}