const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}

  if (req.query.read) {
    where = {
      isRead: req.query.read === 'true'
    }
  }

  console.log(where);

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: {
          attributes: ['id', 'isRead'],
          where,
        },
      }
    ],
  })

  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (user) {
    user.username = req.body.username
    await user.save();
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router