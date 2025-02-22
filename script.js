const products = [
    { 
        id: 1, 
        name: "LSD-25 🌈", 
        price: 1500, 
        description: "Laboratory-grade lysergic acid diethylamide",
        image: "https://example.com/lsd.png"
    },
    { 
        id: 2, 
        name: "Penjs 💉", 
        price: 3500, 
        description: "High-purity pharmaceutical-grade stimulants",
        image: "https://example.com/penjs.png"
    },
    { 
        id: 3, 
        name: "Neural Blitz 💊", 
        price: 2200, 
        description: "Next-gen nootropic compounds",
        image: "https://example.com/blitz.png"
    },
    { 
        id: 4, 
        name: "Cyber Kush 🌿", 
        price: 1800, 
        description: "Genetically enhanced cannabinoids",
        image: "https://example.com/kush.png"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

function renderProducts() {
    const grid = document.querySelector('.product-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" class="product-image" alt="${product.name}">
            <h3 class="neon-glow">${product.name}</h3>
            <p>${product.description}</p>
            <p class="price-tag">$${product.price}/unit</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function toggleCart() {
    document.getElementById('cartPanel').classList.toggle('cart-open');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    updateCartDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');
}

function checkout() {
    if (!cart.length) return alert('Cart is empty!');
    if (confirm('Finalize transaction?')) {
        alert(`Order confirmed! ${cart.length} items will be delivered securely.`);
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        updateCartDisplay();
    }
}
