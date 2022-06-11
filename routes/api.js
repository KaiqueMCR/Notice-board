const express = require('express')
const router = express.Router()
const { db, Post } = require('../schemas/mongooseSchema')

db.on('error', () => {
  console.log('Something wet wrong...')
})

db.once('open', () => {
  router.get('/all', async (req, res) => {
    try {
      const docs = await Post.find()
      res.json({ posts: docs })
    } catch (error) {
      console.error(error)
    }
  })

  router.post('/newPost', async (req, res) => {
    try {
      const { title, description } = req.body
      const post = new Post({
        title: title,
        description: description,
      })
      post
        .save()
        .then(doc => res.json(doc))
        .catch(error => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)
    }
  })

  router.delete('/deletePost/:id', async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id })
      res.send('Post deleted succesfully')
    } catch (error) {
      console.error(error)
    }
  })

  router.put('/editPost', async (req, res) => {
    const { title, description, id } = req.body
    await Post.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
      }
    )
    res.send('Post updated succesfully')
  })
})

module.exports = router
