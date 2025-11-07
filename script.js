// 🧾 Lista de produtos (simples de editar)
const products = [
  { id: 1, name: "Camisa Eco", price: 79.90, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 2, name: "Tênis Solar", price: 199.90, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 3, name: "Bolsa Sustentável", price: 149.90, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 4, name: "Garrafa Reutilizável", price: 59.90, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400" },
];

// 🛒 Variáveis do carrinho
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 📦 Seleciona os elementos da página
const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart");

// 🖼️ Mostrar produtos na tela
function renderProducts() {
  productsContainer.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>R$ ${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Adicionar</button>
    </div>
  `).join("");
}

// ➕ Adicionar produto ao carrinho
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
}

// 🗑️ Remover item do carrinho
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

// 💾 Salvar carrinho no navegador
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🧮 Atualizar a interface do carrinho
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity}
      <button onclick="removeItem(${item.id})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// 🧹 Esvaziar carrinho
clearCartBtn.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

// 🚀 Inicializa o app
renderProducts();
renderCart();
