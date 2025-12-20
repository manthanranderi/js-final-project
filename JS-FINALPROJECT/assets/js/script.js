function loadHomeProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let box = document.getElementById("homeProductList");

    box.innerHTML = "";

    if (products.length === 0) {
        box.innerHTML = `
            <p class="text-center text-muted fs-5">No products added yet.</p>
        `;
        return;
    }

    products.forEach(p => {
        box.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}">
                    <h5>${p.name}</h5>
                    <p><strong>Price:</strong> ${p.price}</p>
                    <p>${p.description ? p.description.substring(0, 100) + "..." : ""}</p>

                    <div class="d-flex justify-content-between">

                        
                        <button class="btn btn-dark btn-sm" onclick="addToCart(${p.id})">
                            Add To Cart
                        </button>

                       
                        <button class="btn btn-outline-dark btn-sm" onclick="viewDetail(${p.id})">
                            View Detail
                        </button>

                    </div>
                </div>
            </div>
        `;
    });
}

loadHomeProducts();


function addToCart(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = products.find(p => p.id === id);
    if (!item) return;

    let exist = cart.find(c => c.id === id);

    if (exist) {
        exist.qty += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            image: item.image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Added To Cart!");
}

function viewDetail(id) {
    window.location.href = `productdetail.html?id=${id}`;
}


    // Load cart count from localStorage on page load
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCounter = document.getElementById("cartItemCount");

        if (cartCounter) {
            cartCounter.innerHTML = cart.length;

            // Hide counter if cart is empty
            cartCounter.style.display = cart.length > 0 ? "block" : "none";
        }
    }

    // Run on page load
    document.addEventListener("DOMContentLoaded", function () {
        updateCartCounter();

        // Optional: Listen for storage changes (if cart updates from other pages)
        window.addEventListener("storage", function () {
            updateCartCounter();
        });
    });
