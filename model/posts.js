module.exports = {
  posts: [],

  getAll() {
    return this.posts
  },

  newPost(title, description) {
    this.posts.push({ id: generateID(), title, description })
  },
}

function generateID() {
  return Math.random().toString(16).substring(2)
}
