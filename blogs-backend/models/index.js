const Blog = require('./blog.js')
const User = require('./user.js')
const ReadingList = require('./readingList.js')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'marked_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'marked_users' })

module.exports = {
  Blog,
  User,
  ReadingList,
}