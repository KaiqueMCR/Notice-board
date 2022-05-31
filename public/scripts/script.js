const URL = 'https://notice-board-production.up.railway.app/api/all'
const postURL = 'https://notice-board-production.up.railway.app/api/newPost'
const deleteURL =
  'https://notice-board-production.up.railway.app/api/deletePost'
const editURL = 'https://notice-board-production.up.railway.app/api/editPost'

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

        <button class="btn text-white align-self-end position-absolute" onclick="deletePost(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <button
          class="btn text-white align-self-end mr-4 position-absolute"
          data-toggle="modal"
          data-target="#editPostModal"
          type="button"
          onclick="loadPostInfos(this)"
        >
          <i class="fa-solid fa-pen"></i>
        </button>


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
  postsContainer.innerHTML = '<span class="spinner-border text-white" >'

  let postTitle = document.getElementById('postTitle')
  let postDescription = document.getElementById('postDescription')

  const post = { title: postTitle, description: postDescription }

  const options = {
    method: 'POST',
    headers: new Headers({ 'Content-type': 'application/json' }),
    body: JSON.stringify(post),
  }

  if (postTitle.value != '' && postDescription.value != '') {
    fetch(postURL, options)
      .then(() => {
        getPosts()
        document.getElementById('postTitle').value = ''
        document.getElementById('postDescription').value = ''
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function deletePost(element) {
  element.innerHTML =
    '<span class="spinner-border spinner-border-sm text-white" >'
  const elementID = element.parentNode.getAttribute('id')

  elementIDtoDelete = { id: elementID }

  const options = {
    method: 'DELETE',
    headers: new Headers({ 'Content-type': 'application/json' }),
    body: JSON.stringify(elementIDtoDelete),
  }

  if (elementID) {
    fetch(deleteURL, options)
      .then(() => {
        getPosts()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function editPost() {
  let editPostTitle = document.getElementById('editPostTitle')
  let editPostDescription = document.getElementById('editPostDescription')
  let postId = document.getElementById('postId')

  const editedPost = {
    id: postId.value,
    title: editPostTitle,
    description: editPostDescription,
  }

  const options = {
    method: 'PUT',
    headers: new Headers({ 'Content-type': 'application/json' }),
    body: JSON.stringify(editedPost),
  }

  if (editPostTitle.value != '' && editPostDescription.value != '') {
    fetch(editURL, options)
      .then(() => {
        getPosts()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function loadPostInfos(element) {
  const parentNode = element.parentNode

  let editPostTitle = document.getElementById('editPostTitle')
  let editPostDescription = document.getElementById('editPostDescription')
  let postId = document.getElementById('postId')

  postId.value = parentNode.getAttribute('id')
  postInfos = parentNode.childNodes[7]
  editPostTitle.value = postInfos.childNodes[1].innerHTML
  editPostDescription.value = postInfos.childNodes[3].innerHTML
}
