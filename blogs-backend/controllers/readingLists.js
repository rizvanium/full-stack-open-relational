const router = require('express').Router()
const { ReadingLists, Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingLists.findByPk(req.params.id)
  if (req.decodedToken.id !== readingList.userId) {
    return res.status(401).json({ error: 'not your reading list' })
  } else {
    readingList.isRead = req.body.read
    await readingList.save()
  }
  
  res.json(readingList)
})

module.exports = router