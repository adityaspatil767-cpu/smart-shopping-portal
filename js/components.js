export function header() {
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

export function footer() {
    return `<footer>© 2026 ShopNest | Smart Shopping</footer>`;
}

export function layout(content) {
    document.getElementById("app").innerHTML =
        header() + content + footer();
}