export function enquiry() {
    return `
    <main>
        <h1>Product Enquiry</h1>

        <form id="enquiry" class="form">
            <input id="ename" placeholder="Your Name" required>
            <input id="eemail" type="email"
                placeholder="Email" required>
            <input id="product" placeholder="Product Name" required>
            <textarea id="question"
                placeholder="Your Question" required></textarea>

            <button>Submit Enquiry</button>
            <p id="emsg"></p>
        </form>
    </main>`;
}

export function setupEnquiry() {
    document.getElementById("enquiry").onsubmit = function(e) {
        e.preventDefault();

        let details = {
            name: document.getElementById("ename").value,
            email: document.getElementById("eemail").value,
            product: document.getElementById("product").value,
            question: document.getElementById("question").value
        };

        localStorage.setItem("enquiry", JSON.stringify(details));

        document.getElementById("emsg").textContent =
            "Enquiry submitted successfully!";
    };
}
      
