const postsContainer = document.getElementById('posts-container')
const loading = document.getElementById('loader')
const filter = document.getElementById('filter')

let limit = 10;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );

  const data = await res.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    page++
    showPosts();
  }, 300);

  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000)
}

function filterPosts(e) {
  e.preventDefault();
  const searchTerm = e.target.value.toLowerCase();
  posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();
    
    if (title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  })
}

showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    showLoading();
  }
})

filter.addEventListener('input', filterPosts)