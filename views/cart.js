import {showCart} from "../js/cart.js";

export function cart() {
    return `
    <main>
        <h1>Shopping Cart</h1>
        <div id="cart-list"></div>
        <h3 id="total">Total: ₹0</h3>
        <a class="btn" href="#/checkout">Proceed to Checkout</a>
    </main>`;
}

export function setupCart() {
    showCart();
}      
