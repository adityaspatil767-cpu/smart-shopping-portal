import {loadData} from "../js/data.js";
import {addToCart} from "../js/cart.js";

export async function products() {
    return `
    <main>
        <h1>Our Products</h1>

        <select id="filter">
            <option value="all">All Products</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
        </select>

        <p id="loading">Loading products...</p>
        <div class="products" id="product-list"></div>
    </main>`;
}

export async function setupProducts() {
    let list = document.getElementById("product-list");
    let loading = document.getElementById("loading");

    try {
        let data = await loadData("products.json");

        if (!data.length) throw new Error("No products");

        loading.textContent = "";

        function display(category) {
            let items = category === "all"
                ? data
                : data.filter(p => p.category === category);

            list.innerHTML = items.map(p => `
                <div class="card">
                    <img src="${p.image}" width="150">
                    <h3>${p.name}</h3>
                    <p>₹${p.price}</p>
                    <button data-id="${p.id}">Add to Cart</button>
                </div>
            `).join("");

            list.querySelectorAll("button").forEach(btn => {
                btn.onclick = () => {
                    let product = data.find(
                        p => p.id == btn.dataset.id
                    );
                    addToCart(product);
                };
            });
        }

        display("all");

        document.getElementById("filter").onchange = e =>
            display(e.target.value);

    } catch (error) {
        loading.textContent = "Unable to load products!";
    }
}

  