const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      jwt.verify(token, SECRET)

      const session = await Session.findOne({
        where: {
          token
        },
        include: {
          model: User,
        }
      })

      if (!session) {
        return res.status(401).json({ error: 'no active sessions found' })
      }

      req.loggedInUser = session.user
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { tokenExtractor }
