const API_URL = "https://fakestoreapi.com/products";
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const btn = document.getElementById("btn");
const greet = document.getElementById("greeting");
const addCart = document.getElementById("addtocart");
let products = [];
let count = 0;

window.onload = async function () {
  const token = localStorage.getItem("username");
  if (!token) {
    window.location.href = "signup.html";
  } else {
    greet.classList.add("greet");
    greet.innerHTML = `<p>We're glad to have you here "${token}"<p>`;
    await fetchProducts();
  }
};

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    products = await response.json();
    localStorage.setItem("products", products);
    displayProducts(products, currentPage);
    setupPagination(products);
  } catch (error) {
    productList.innerHTML = "<p>Error loading products.</p>";
    console.error(error);
  }
}

const itemsPerPage = 5;
let currentPage = 1;

function displayProducts(data, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const paginatedItems = data.slice(startIndex, endIndex);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
   if (data.length === 0) {
     productList.innerHTML = "<p>No products found.</p>";
     return;
   }

  paginatedItems.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = `<img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
    <p>$${product.price}</p>
   <p>${product.description.substring(0, 100)}...</p>
    <button id="addtocart" onclick="addtocart()">Add to Cart</button>
  `;
    productList.appendChild(item);
  });
}

function setupPagination(products) {
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("pagination-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", function () {
      currentPage = i;
      displayProducts(products, currentPage);
      setupPagination(products);
    });
    pagination.appendChild(btn);
  }
}


function addtocart() {
  const cnt = document.getElementById("count");
  count++;
  cnt.innerText = count;
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered, currentPage);
  setupPagination(filtered);
}

searchInput.addEventListener("input", debounce(handleSearch, 500));

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

let currentIndex = 0;

function updateSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = "translateX(-" + slideWidth * index + "px)";
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
}, 3000);
