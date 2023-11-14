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
  const blog = await Blog.create(req.body)
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

router.delete('/:id', blogMiddleware, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router