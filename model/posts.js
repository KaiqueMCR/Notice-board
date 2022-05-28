module.exports = {
  posts: [],

  getAll() {
    return this.posts
  },

  newPost(title, description) {
    this.posts.push({ id: generateID(), title, description })
  },

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id != id)
  },

  editPost(id, title, description) {
    indexToEdit = this.posts.findIndex(post => post.id == id)

    this.posts[indexToEdit] = {
      id,
      title,
      description,
    }
  },
}

function generateID() {
  return Math.random().toString(16).substring(2)
}
