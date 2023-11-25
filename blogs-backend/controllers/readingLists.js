const router = require('express').Router()
const { ReadingLists, Blog, User } = require('../models')

router.get('/', async(req, res) => {
  const readingList = await ReadingLists.findAll()
  res.json(readingList)
})

router.get('/:id', async(req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id)
  res.json(readingList)
})

router.post('/', async (req, res) => {
  await Blog.findByPk(req.body.blogId)
  await User.findByPk(req.body.userId)

  const readingList = await ReadingLists.create({
    userId: req.body.userId,
    blogId: req.body.blogId,
    isRead: false,
  })

  res.json(readingList)
})

module.exports = router