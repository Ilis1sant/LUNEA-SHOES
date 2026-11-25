/* ==========================================
   LUNEA SHOES
   Sistema de tienda en línea
   ========================================== */

// 1. BASE DE DATOS DE PRODUCTOS
// Fotografías guardadas en la misma carpeta
// que index.html, style.css y script.js.

const products = [

  // DAMAS

  {
    id: 1,
    name: "Air Sport Classic",
    user: "damas",
    type: "deportivos",
    price: 899,
    color: ["Blanco", "Rosa", "Negro"],
    sizes: [22,23,24,25,26],
    stock: 12,
    image: "dama zapatilla de deporte.jpg"
  },
  {
    id: 2,
    name: "Tacón Asimétrico",
    user: "damas",
    type: "formales",
    price: 1099,
    color: ["Negro", "Beige"],
    sizes: [22,23,24,25,26],
    stock: 8,
    image: "dama tacon asimetrico.webp"
  },
  {
    id: 3,
    name: "Tenis Charly",
    user: "damas",
    type: "deportivos",
    price: 999,
    color: ["Según fotografía"],
    sizes: [22,23,24,25,26],
    stock: 10,
    image: "damas tenis charly.jpg"
  },
  {
    id: 4,
    name: "Charly Walking",
    user: "damas",
    type: "casuales",
    price: 1099,
    color: ["Según fotografía"],
    sizes: [22,23,24,25,26],
    stock: 10,
    image: "damas tenis chrly walking.jpg"
  },

  // CABALLEROS

  {
    id: 5,
    name: "Adidas TF Deportivo",
    user: "caballeros",
    type: "deportivos",
    price: 1499,
    color: ["Según fotografía"],
    sizes: [25,26,27,28,29,30],
    stock: 10,
    image: "caballero tenis adidas tf deportivo.webp"
  },
  {
    id: 6,
    name: "New Balance Deportivo",
    user: "caballeros",
    type: "deportivos",
    price: 1599,
    color: ["Según fotografía"],
    sizes: [25,26,27,28,29,30],
    stock: 10,
    image: "caballero tenis new balance deportivo.webp"
  },
  {
    id: 7,
    name: "On Cloud Deportivo",
    user: "caballeros",
    type: "deportivos",
    price: 1699,
    color: ["Según fotografía"],
    sizes: [25,26,27,28,29,30],
    stock: 10,
    image: "caballero tenis on cloud deportivo.webp"
  },

  // NIÑAS

  {
    id: 8,
    name: "Sandalias Suelas Blancas",
    user: "ninas",
    type: "casuales",
    price: 499,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 10,
    image: "niñas sandalias suelas blancas.webp"
  },
  {
    id: 9,
    name: "Tenis para Niña",
    user: "ninas",
    type: "deportivos",
    price: 599,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 9,
    image: "niñas tenis.jpg"
  },
  {
    id: 10,
    name: "Zapato Minnie Mouse",
    user: "ninas",
    type: "casuales",
    price: 649,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 5,
    image: "niñas zapato brillante de minnie mouse.avif"
  },
  {
    id: 11,
    name: "Zapato de Vestir",
    user: "ninas",
    type: "formales",
    price: 599,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 10,
    image: "niñas zapato de vestir.jpg"
  },

  // NIÑOS

  {
    id: 12,
    name: "Converse All Star",
    user: "ninos",
    type: "casuales",
    price: 799,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 10,
    image: "niños converse All Star.jpg"
  },
  {
    id: 13,
    name: "Charly Exertion City",
    user: "ninos",
    type: "deportivos",
    price: 699,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 10,
    image: "niños tenis charly exertion city.jpg"
  },
  {
    id: 14,
    name: "Charly Urban Zlip City",
    user: "ninos",
    type: "casuales",
    price: 749,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 10,
    image: "niños tenis charly urban zlip city.webp"
  },
  {
    id: 15,
    name: "Tenis Deportivo Infantil",
    user: "ninos",
    type: "deportivos",
    price: 599,
    color: ["Según fotografía"],
    sizes: [17,18,19,20,21],
    stock: 8,
    image: "niños tenis deportivo.jpg"
  }

];

// 2. VARIABLES Y ALMACENAMIENTO

let cart = JSON.parse(localStorage.getItem("lunea_cart")) || [];
let selectedUser = "todos";

const shippingCost = 99;

function saveCart() {
  localStorage.setItem("lunea_cart", JSON.stringify(cart));
}

function money(amount) {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });
}

function getStock(id) {
  const product = products.find(p => p.id === id);
  return product ? product.stock : 0;
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// 3. NAVEGACIÓN ENTRE PÁGINAS

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(page);

  if (!target) return;

  target.classList.add("active");

  if (page === "catalog") renderProducts();
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
  if (page === "payment") updatePayment();

  window.scrollTo({top: 0, behavior: "smooth"});
}

// 4. SELECCIÓN DE USUARIO Y CATEGORÍA

function selectUser(user) {
  selectedUser = user;
  document.getElementById("user-filter").value = user;
  showPage("catalog");
}

// 5. MOSTRAR PRODUCTOS

function renderProducts() {
  const grid = document.getElementById("product-grid");

  const user = document.getElementById("user-filter").value;
  const type = document.getElementById("type-filter").value;
  const search = document.getElementById("search-input").value
    .toLowerCase().trim();

  const filtered = products.filter(product => {
    const matchUser = user === "todos" || product.user === user;
    const matchType = type === "todos" || product.type === type;
    const matchSearch = product.name.toLowerCase().includes(search);

    return matchUser && matchType && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-cart">
        <h3>No encontramos productos</h3>
        <p>Prueba con otra categoría o búsqueda.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">

      <div class="product-image">
        <img src="${encodeURI(product.image)}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.type}</span>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>

        <p>Disponibles: ${product.stock} unidades</p>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <div class="product-options">
          <select id="size-${product.id}" aria-label="Seleccionar talla">
            ${product.sizes.map(size =>
              `<option value="${size}">Talla ${size}</option>`
            ).join("")}
          </select>

          <select id="color-${product.id}" aria-label="Seleccionar color">
            ${product.color.map(color =>
              `<option value="${color}">${color}</option>`
            ).join("")}
          </select>

          <input
            id="qty-${product.id}"
            type="number"
            min="1"
            max="${product.stock}"
            value="1"
            aria-label="Cantidad"
          >
        </div>

        <button
          class="add-button"
          onclick="addToCart(${product.id})"
          ${product.stock === 0 ? "disabled" : ""}
        >
          ${product.stock > 0 ? "🛍️ Agregar al carrito" : "Agotado"}
        </button>

      </div>
    </article>
  `).join("");
}

// 6. AGREGAR PRODUCTOS AL CARRITO

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product || product.stock <= 0) {
    showToast("Producto no disponible.");
    return;
  }

  const size = document.getElementById(`size-${id}`).value;
  const color = document.getElementById(`color-${id}`).value;
  const quantity = Number(document.getElementById(`qty-${id}`).value);

  if (!Number.isInteger(quantity) || quantity < 1) {
    showToast("Selecciona una cantidad válida.");
    return;
  }

  const existing = cart.find(item =>
    item.id === id &&
    item.size === size &&
    item.color === color
  );

  const currentQuantity = existing ? existing.quantity : 0;

  if (currentQuantity + quantity > product.stock) {
    showToast("No hay suficientes unidades disponibles.");
    return;
  }

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity
    });
  }

  saveCart();
  updateCartCount();

  showToast("¡Producto agregado al carrito!");
}

// 7. MOSTRAR CARRITO

function renderCart() {
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>🛍️ Tu carrito está vacío</h3>
        <p>Descubre nuestros modelos y encuentra tus favoritos.</p>
        <button class="primary-button" onclick="showPage('catalog')">
          Explorar productos
        </button>
      </div>
    `;

    updateSummary();
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">

      <img src="${encodeURI(item.image)}" alt="${item.name}">

      <div>
        <h3>${item.name}</h3>
        <p>Talla: ${item.size}</p>
        <p>Color: ${item.color}</p>
        <p>Cantidad: ${item.quantity}</p>
        <b>${money(item.price * item.quantity)}</b>
      </div>

      <button
        class="remove-button"
        onclick="removeFromCart(${index})"
        aria-label="Eliminar producto"
      >✕</button>

    </div>
  `).join("");

  updateSummary();
}

function removeFromCart(index) {
  cart.splice(index, 1);

  saveCart();
  updateCartCount();
  renderCart();

  showToast("Producto eliminado.");
}

// 8. RESUMEN DE COMPRA

function getSubtotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function getTotal() {
  return getSubtotal() + (cart.length ? shippingCost : 0);
}

function updateSummary() {
  const subtotal = getSubtotal();

  document.getElementById("subtotal").textContent = money(subtotal);

  document.getElementById("shipping").textContent =
    money(cart.length ? shippingCost : 0);

  document.getElementById("total").textContent = money(getTotal());
}

// 9. CONTINUAR COMPRA

function goCheckout() {
  if (cart.length === 0) {
    showToast("Agrega productos antes de continuar.");
    return;
  }

  showPage("checkout");
}

// 10. REVISAR DATOS DE ENVÍO

function renderCheckout() {
  const container = document.getElementById("checkout-items");

  container.innerHTML = cart.map(item => `
    <div class="summary-line">
      <span>${item.name} x${item.quantity}</span>
      <b>${money(item.price * item.quantity)}</b>
    </div>
  `).join("");

  document.getElementById("checkout-total").textContent =
    money(getTotal());
}

document.getElementById("shipping-form").addEventListener("submit", function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast("Tu carrito está vacío.");
    showPage("catalog");
    return;
  }

  const formData = new FormData(this);

  const customer = Object.fromEntries(formData.entries());

  sessionStorage.setItem("lunea_customer", JSON.stringify(customer));

  showToast("¡Datos verificados correctamente!");

  setTimeout(() => {
    showPage("payment");
  }, 600);
});

// 11. REVISAR Y PROCESAR PAGO DE DEMOSTRACIÓN

function updatePayment() {
  document.getElementById("payment-total").textContent =
    money(getTotal());
}

function processPayment() {
  const button = document.getElementById("pay-button");

  const customer = JSON.parse(
    sessionStorage.getItem("lunea_customer") || "null"
  );

  if (!customer) {
    showToast("Primero completa tus datos de envío.");
    showPage("checkout");
    return;
  }

  if (cart.length === 0) {
    showToast("Tu carrito está vacío.");
    showPage("catalog");
    return;
  }

  for (const item of cart) {
    const product = products.find(p => p.id === item.id);

    if (!product || product.stock < item.quantity) {
      showToast(`No hay existencias suficientes de ${item.name}.`);
      showPage("catalog");
      return;
    }
  }

  const method = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  button.disabled = true;
  button.textContent = "Procesando demostración...";

  setTimeout(() => {
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      product.stock -= item.quantity;
    });

    const order = {
      number: "LS-" + Date.now().toString().slice(-8),
      date: new Date().toLocaleDateString("es-MX"),
      customer,
      items: [...cart],
      total: getTotal(),
      payment: method,
      status: "Confirmado"
    };

    let orders = JSON.parse(
      localStorage.getItem("lunea_orders") || "[]"
    );

    orders.push(order);

    localStorage.setItem("lunea_orders", JSON.stringify(orders));

    document.getElementById("order-number").textContent =
      "Pedido: " + order.number;

    document.getElementById("order-details").innerHTML = `
      <div class="summary-card">
        <p><b>Cliente:</b> ${escapeHTML(customer.name)}</p>
        <p><b>Total:</b> ${money(order.total)}</p>
        <p><b>Pago:</b> ${escapeHTML(method)}</p>
        <p><b>Estado:</b> Compra confirmada</p>
        <p><b>Fecha:</b> ${order.date}</p>
      </div>
    `;

    cart = [];

    saveCart();
    updateCartCount();

    sessionStorage.removeItem("lunea_customer");

    button.disabled = false;
    button.textContent = "Confirmar pago de demostración";

    showPage("success");

  }, 1200);
}

// 12. PROTECCIÓN DE TEXTO MOSTRADO EN HTML

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// 13. FILTROS DEL CATÁLOGO

document.getElementById("user-filter").addEventListener(
  "change", renderProducts
);

document.getElementById("type-filter").addEventListener(
  "change", renderProducts
);

document.getElementById("search-input").addEventListener(
  "input", renderProducts
);

// 14. INICIAR TIENDA

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  updateSummary();
});