const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
})

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
const Post = mongoose.model('Post', postSchema)

module.exports = { db, Post }
