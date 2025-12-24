// index.js

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

let started = false;

function startApp() {
  if (started) return;      // prevents double running
  started = true;
  fetchPosts();
}

// Run in browser after DOM is ready
document.addEventListener("DOMContentLoaded", startApp);

// ALSO run immediately for mocha/jsdom tests (they often won't fire DOMContentLoaded)
startApp();

async function fetchPosts() {
  try {
    const res = await fetch(POSTS_URL);
    const posts = await res.json();
    displayPosts(posts);
  } catch (error) {
    console.log(error);
  }
}

function displayPosts(posts) {
  const ul = document.getElementById("post-list");
  if (!ul) return;

  ul.innerHTML = "";

  posts.forEach((post) => {
    const li = document.createElement("li");

    const h1 = document.createElement("h1");
    h1.textContent = post.title;

    const p = document.createElement("p");
    p.textContent = post.body;

    li.append(h1, p);
    ul.appendChild(li);
  });
}
