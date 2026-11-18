export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
    let cart = getCart();
    let item = cart.find(p => p.id === product.id);

    if (item) {
        item.qty++;
    } else {
        cart.push({...product, qty: 1});
    }

    saveCart(cart);
    alert("Product added to cart!");
}

export function removeItem(id) {
    saveCart(getCart().filter(p => p.id !== id));
    showCart();
}

export function showCart() {
    let cart = getCart();
    let box = document.getElementById("cart-list");

    if (!box) return;

    if (!cart.length) {
        box.innerHTML = "Your cart is empty!";
        return;
    }

    box.innerHTML = cart.map(p => `
        <div class="card">
            <h3>${p.name}</h3>
            <p>Price: ₹${p.price}</p>
            <p>Quantity: ${p.qty}</p>
            <button onclick="removeProduct(${p.id})">
                Remove
            </button>
            <button onclick="changeQty(${p.id}, 1)">+</button>
            <button onclick="changeQty(${p.id}, -1)">-</button>
        </div>
    `).join("");

    document.getElementById("total").textContent =
        "Total: ₹" + cart.reduce(
            (sum, p) => sum + p.price * p.qty, 0
        );
}

window.removeProduct = removeItem;

window.changeQty = function(id, amount) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += amount;
        if (item.qty <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }

    saveCart(cart);
    showCart();
};