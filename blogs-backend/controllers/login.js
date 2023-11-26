const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  
  if (user.disabled) {
    return response.status(401).json({
      error: 'you\'ve been banned'
    })
  }

  const token = jwt.sign({}, SECRET)

  await Session.create({
    userId: user.id,
    token,
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router