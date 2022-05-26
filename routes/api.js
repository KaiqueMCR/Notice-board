const express = require('express')
const router = express.Router()
const posts = require('../model/posts')

router.get('/all', (req, res) => {
  res.json(posts)
})

router.post('/newPost', (req, res) => {
  const title = req.body.title
  const description = req.body.description

  posts.newPost(title, description)
  res.send('Post created succesfully')
})

router.delete('/deletePost', (req, res) => {
  const idToDelete = req.body.id

  posts.deletePost(idToDelete)
  res.send('Post deleted succesfully')
})

module.exports = router
