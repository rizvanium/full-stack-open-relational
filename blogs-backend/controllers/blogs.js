const { Op } = require('sequelize')
const router = require('express').Router()
const { Blog, User, ReadingLists } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const blogMiddleware = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

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

  const blogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ['userId'] },
      }
    ],
    where,
    order: [
      ['likes', 'DESC']
    ]
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.loggedInUser.id,
    date: new Date()
  })

  res.json(blog)
})

router.put('/:id', blogMiddleware, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json({ likes: req.blog.likes })
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, blogMiddleware, async (req, res) => {
  if (req.loggedInUser.id !== req.blog.userId) {
    return res.status(401).json({ error: 'not your blog' })
  } else {
    if (req.blog) {
      await ReadingLists.destroy({
        where: {
          blogId: req.blog.id,
        }
      })/
      await req.blog.destroy()
      
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  }
})

module.exports = router