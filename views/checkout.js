import {getCart} from "../js/cart.js";

export function checkout() {
    return `
    <main>
        <h1>Checkout</h1>

        <form id="checkout" class="form">
            <input id="name" placeholder="Your Name" required>
            <input id="email" type="email"
                placeholder="Email" required>
            <input id="phone" type="tel"
                placeholder="Phone Number" required>
            <textarea id="address"
                placeholder="Address" required></textarea>

            <select id="payment" required>
                <option value="">Select Payment</option>
                <option>Cash on Delivery</option>
                <option>UPI</option>
            </select>

            <button>Place Order</button>
            <p id="msg"></p>
        </form>
    </main>`;
}

export function setupCheckout() {
    document.getElementById("checkout").onsubmit = function(e) {
        e.preventDefault();

        if (!getCart().length) {
            document.getElementById("msg").textContent =
                "Your cart is empty!";
            return;
        }

        let order = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            payment: payment.value,
            cart: getCart()
        };

        localStorage.setItem("customer", JSON.stringify(order));
        localStorage.removeItem("cart");

        document.getElementById("msg").textContent =
            "Order placed successfully!";
    };
}
