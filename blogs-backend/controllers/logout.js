const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {

  await Session.destroy({
    where: {
      userId: req.loggedInUser.id
    }
  })

  return res.status(204).json({
    message: 'you have successfully logged out'
  });
})

module.exports = router