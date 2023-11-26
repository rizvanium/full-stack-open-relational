const Blog = require('./blog.js')
const User = require('./user.js')
const ReadingLists = require('./readingList.js')
const Session = require('./session.js')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'marked_users' })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingLists,
  Session,
}