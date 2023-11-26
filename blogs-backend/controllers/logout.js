const router = require('express').Router()
const { Session, User } = require('../models')

router.delete('/', tokenExtractor, async (request, response) => {
  await Session.destroy({
    userId: user.id,
    token,
  })

  
  await Session.destroy({
    where: {
      
    }
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router