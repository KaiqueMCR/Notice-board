const URL = 'http://localhost:8080/api/all'
const postURL = 'http://localhost:8080/api/newPost'
const postsContainer = document.getElementById('postsContainer')

document.addEventListener('DOMContentLoaded', () => {
  getPosts()
})

function getPosts() {
  fetch(URL)
    .then(res => {
      return res.json()
    })
    .then(response => {
      if (response) {
        if (!response.posts[0]) {
          postsContainer.innerHTML =
            '<p class="text-white" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">No posts found :(</p>'
        } else {
          buildPostElements(response.posts)
        }
      }
    })
}

function buildPostElements(posts) {
  let postElements = ''
  let random = 0

  posts.forEach(post => {
    postElements += `
      <div class="card m-2" style="width: 300px; height: auto" id=${post.id}>
        <img class="card-img-top" src="https://picsum.photos/300/100?random=${random}">

        <div class="card-body">
          <h5 class="card-title text-dark">${post.title}</h5>
          <div class="card-text text-dark">${post.description}</div>
        </div>
      </div>
    `
    random++
  })

  postsContainer.innerHTML = postElements
}

function newPost() {
  let postTitle = document.getElementById('postTitle').value
  let postDescription = document.getElementById('postDescription').value

  const post = { title: postTitle, description: postDescription }

  const options = {
    method: 'POST',
    headers: new Headers({ 'Content-type': 'application/json' }),
    body: JSON.stringify(post),
  }

  if (postTitle != '' && postDescription != '') {
    fetch(postURL, options)
      .then(res => {
        do {
          postsContainer.innerHTML =
            '<span class="spinner-border text-white style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">'
        } while (!res)

        getPosts()
        document.getElementById('postTitle').value = ''
        document.getElementById('postDescription').value = ''
      })
      .catch(error => {
        if (err) {
          console.log(error)
        }
      })
  }
}
