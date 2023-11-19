const { Op, fn, col } = require('sequelize')
const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }

  const authors = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('title')), 'articles'],
      [fn('SUM', col('likes')), 'likes'],
    ],
    group: ['author'],
    where,
    order: [
      ['likes', 'DESC']
    ]
  })

  res.json(authors)
})

module.exports = router