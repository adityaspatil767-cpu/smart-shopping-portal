
// SHOPNEST - MAIN JAVASCRIPT

const app = document.getElementById("app");

let products = [];
let categories = [];
let pricing = {
    currency: "₹",
    delivery: 50
};

// HEADER COMPONENT

function header() {
    return `
    <header>
        <h2>🛒 ShopNest</h2>

        <nav>
            <a href="#/home">Home</a>
            <a href="#/products">Products</a>
            <a href="#/cart">Cart 🛒</a>
            <a href="#/checkout">Checkout</a>
            <a href="#/enquiry">Enquiry</a>
        </nav>
    </header>`;
}

// FOOTER COMPONENT

function footer() {
    return `
    <footer>
        © 2026 ShopNest | Smart Shopping, Happy Living
    </footer>`;
}

// LAYOUT COMPONENT

function layout(content) {
    app.innerHTML = header() + content + footer();
}

// HOME PAGE

function home() {
    layout(`
        <section class="hero">
            <h1>Smart Shopping, Happy Living</h1>

            <p>Quality products at affordable prices.</p>

            <a href="#/products" class="btn">
                Shop Now
            </a>
        </section>
    `);
}

// FETCH JSON DATA

async function loadData(file) {
    const response = await fetch("data/" + file);

    if (!response.ok) {
        throw new Error("Unable to load " + file);
    }

    return await response.json();
}

// PRODUCTS PAGE

async function showProducts() {

    layout(`
        <main>
            <h1>Our Products</h1>

            <select id="filter">
                <option value="all">All Products</option>
            </select>

            <p id="loading">Loading products...</p>

            <div id="product-list" class="products"></div>
        </main>
    `);

    try {

        const results = await Promise.all([
            loadData("products.json"),
            loadData("categories.json"),
            loadData("pricing.json")
        ]);

        products = results[0];
        categories = results[1];
        pricing = results[2];

        if (!Array.isArray(products)) {
            throw new Error("Invalid product data");
        }

        const filter = document.getElementById("filter");

        filter.innerHTML = categories.map(c => `
            <option value="${c.id}">
                ${c.name}
            </option>
        `).join("");

        document.getElementById("loading").textContent = "";

        displayProducts("all");

        filter.onchange = function() {
            displayProducts(this.value);
        };

    } catch (error) {

        document.getElementById("loading").textContent =
            "Error loading products. Please check JSON files.";

    }
}

// DYNAMIC PRODUCT DISPLAY

function displayProducts(category) {

    const list = document.getElementById("product-list");

    const items = category === "all"
        ? products
        : products.filter(p => p.category === category);

    if (!items.length) {
        list.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.innerHTML = items.map(p => `
        <div class="card">

            <img
                src="${p.image}"
                alt="${p.name}"
                onerror="this.onerror=null; this.src='https://placehold.co/300x200?text=Image+Not+Found';"
            >

            <h3>${p.name}</h3>

            <p>${pricing.currency}${p.price}</p>

            <button data-add="${p.id}">
                Add to Cart
            </button>

        </div>
    `).join("");
}



// CART FUNCTIONS

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART

function addToCart(id) {

    const product = products.find(p => p.id == id);

    if (!product) return;

    let cart = getCart();

    let item = cart.find(p => p.id == id);

    if (item) {
        item.qty++;
    } else {
        cart.push({...product, qty: 1});
    }

    saveCart(cart);

    alert("Product added to cart!");
}

// CART PAGE

function showCart() {

    let cart = getCart();

    layout(`
        <main>
            <h1>Shopping Cart</h1>

            <div id="cart-list"></div>

            <h3 id="total"></h3>

            <a href="#/checkout" class="btn">
                Proceed to Checkout
            </a>
        </main>
    `);

    const list = document.getElementById("cart-list");

    if (!cart.length) {
        list.innerHTML = "<h3>Your cart is empty!</h3>";
        document.getElementById("total").textContent = "";
        return;
    }

    list.innerHTML = cart.map(p => `
        <div class="card">

            <h3>${p.name}</h3>

            <p>Price: ₹${p.price}</p>

            <p>Quantity: ${p.qty}</p>

            <button data-action="plus" data-id="${p.id}">+</button>

            <button data-action="minus" data-id="${p.id}">-</button>

            <button data-action="remove" data-id="${p.id}">
                Remove
            </button>

        </div>
    `).join("");

    let total = cart.reduce(
        (sum, p) => sum + p.price * p.qty, 0
    );

    document.getElementById("total").textContent =
        "Total: ₹" + total;
}

// UPDATE CART

function updateCart(id, action) {

    let cart = getCart();

    let item = cart.find(p => p.id == id);

    if (action === "remove") {
        cart = cart.filter(p => p.id != id);
    }

    else if (item && action === "plus") {
        item.qty++;
    }

    else if (item && action === "minus") {
        item.qty--;

        if (item.qty <= 0) {
            cart = cart.filter(p => p.id != id);
        }
    }

    saveCart(cart);

    showCart();
}

// CHECKOUT PAGE

function checkout() {

    let cart = getCart();

    let total = cart.reduce(
        (sum, p) => sum + p.price * p.qty, 0
    );

    layout(`
        <main>
            <h1>Checkout</h1>

            <h3>Order Total: ₹${total}</h3>

            <form id="checkout" class="form">

                <input id="name"
                    placeholder="Your Name" required>

                <input id="email"
                    type="email" placeholder="Email" required>

                <input id="phone"
                    type="tel" pattern="[0-9]{10}"
                    placeholder="10 Digit Phone Number" required>

                <textarea id="address"
                    placeholder="Your Address" required></textarea>

                <select id="payment" required>
                    <option value="">Select Payment</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI</option>
                </select>

                <button type="submit">Place Order</button>

                <p id="msg"></p>

            </form>
        </main>
    `);
}

// ENQUIRY PAGE

function enquiry() {

    layout(`
        <main>
            <h1>Product Enquiry</h1>

            <form id="enquiry" class="form">

                <input id="ename"
                    placeholder="Your Name" required>

                <input id="eemail"
                    type="email" placeholder="Email" required>

                <input id="product"
                    placeholder="Product Name" required>

                <textarea id="question"
                    placeholder="Your Question" required></textarea>

                <button type="submit">
                    Submit Enquiry
                </button>

                <p id="emsg"></p>

            </form>
        </main>
    `);
}

// FORM SUBMISSION

app.addEventListener("submit", function(e) {

    e.preventDefault();

    if (e.target.id === "checkout") {

        let cart = getCart();

        if (!cart.length) {
            document.getElementById("msg").textContent =
                "Your cart is empty!";
            return;
        }

        let order = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            payment: document.getElementById("payment").value,
            products: cart
        };

        localStorage.setItem("customer", JSON.stringify(order));

        localStorage.removeItem("cart");

        document.getElementById("msg").textContent =
            "Order placed successfully!";
    }

    if (e.target.id === "enquiry") {

        let details = {
            name: document.getElementById("ename").value,
            email: document.getElementById("eemail").value,
            product: document.getElementById("product").value,
            question: document.getElementById("question").value
        };

        let enquiries = JSON.parse(
            localStorage.getItem("enquiries")
        ) || [];

        enquiries.push(details);

        localStorage.setItem(
            "enquiries", JSON.stringify(enquiries)
        );

        document.getElementById("emsg").textContent =
            "Enquiry submitted successfully!";
    }

});

// BUTTON EVENTS

app.addEventListener("click", function(e) {

    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add);
    }

    if (e.target.dataset.action) {
        updateCart(
            e.target.dataset.id,
            e.target.dataset.action
        );
    }

});

// SPA ROUTER

function router() {

    const page = location.hash.replace("#/", "") || "home";

    switch(page) {

        case "home":
            home();
            break;

        case "products":
            showProducts();
            break;

        case "cart":
            showCart();
            break;

        case "checkout":
            checkout();
            break;

        case "enquiry":
            enquiry();
            break;

        default:
            layout("<main><h1>404 - Page Not Found</h1></main>");
    }
}

// INITIALIZE APPLICATION

window.addEventListener("hashchange", router);

router();



