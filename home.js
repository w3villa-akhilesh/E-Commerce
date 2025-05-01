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
    renderProducts(products);
  } catch (error) {
    productList.innerHTML = "<p>Error loading products.</p>";
    console.error(error);
  }
}

function addtocart() {
  const cnt = document.getElementById("count");
  count++;
  cnt.innerText = count;
}

function renderProducts(data) {
  productList.innerHTML = "";
  if (data.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <p>${product.description.substring(0, 100)}...</p>
      <button id="addtocart" onclick="addtocart()">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

btn.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});