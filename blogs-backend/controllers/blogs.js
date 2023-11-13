const router = require('express').Router()
const { Blog } = require('../models')

const blogMiddleware = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    res.status(400).json({error })
  }
})

router.delete('/:id', blogMiddleware, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy()
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router