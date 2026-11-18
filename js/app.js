import {layout} from "./components.js";
import {router} from "./router.js";

import {home} from "../views/home.js";
import {products, setupProducts} from "../views/products.js";
import {cart, setupCart} from "../views/cart.js";
import {checkout, setupCheckout} from "../views/checkout.js";
import {enquiry, setupEnquiry} from "../views/enquiry.js";

async function render() {
    let page = location.hash.replace("#/", "") || "home";
    let content = "";

    switch(page) {
        case "home":
            content = home();
            break;

        case "products":
            content = await products();
            break;

        case "cart":
            content = cart();
            break;

        case "checkout":
            content = checkout();
            break;

        case "enquiry":
            content = enquiry();
            break;

        default:
            content = "<main><h1>Page Not Found</h1></main>";
    }

    layout(content);

    if(page === "products") await setupProducts();
    if(page === "cart") setupCart();
    if(page === "checkout") setupCheckout();
    if(page === "enquiry") setupEnquiry();
}

router(render);