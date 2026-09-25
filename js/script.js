// =================================
// SHOP EASE - JAVASCRIPT
// =================================

console.log("ShopEase Frontend Started");


// =================================
// PRODUCT DATA
// =================================

let products = [
    {
        id: 1,
        name: "Laptop Model 19",
        category: "Electronics",
        price: 65000,
        description: "High performance laptop for everyday use.",
        image: "💻"
    },

    {
        id: 2,
        name: "Smart Phone",
        category: "Electronics",
        price: 25000,
        description: "Latest smartphone with modern features.",
        image: "📱"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Footwear",
        price: 3500,
        description: "Comfortable shoes for running and daily use.",
        image: "👟"
    },

    {
        id: 4,
        name: "Office Chair",
        category: "Home & Kitchen",
        price: 8500,
        description: "Comfortable chair for office and home.",
        image: "🪑"
    }
];


// Check product data

console.log(products);
console.log("Total Products:", products.length);

// =================================
// DISPLAY PRODUCTS
// =================================

function displayProducts(productList) {

    const productContainer = document.getElementById("productContainer");

    // Container கிடைக்கவில்லை என்றால் stop
    if (!productContainer) {
        return;
    }

    // Old products clear
    productContainer.innerHTML = "";

    // Products create
    productList.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(productCard);
    });
}


// Display products
displayProducts(products);

// =================================
// PRODUCT SEARCH
// =================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase().trim();

        const filteredProducts = products.filter(function(product) {

            return (
                product.name.toLowerCase().includes(searchText) ||
                product.category.toLowerCase().includes(searchText)
            );

        });

        displayProducts(filteredProducts);

    });

}

// =================================
// CATEGORY FILTER
// =================================

const categoryButtons = document.querySelectorAll(".category-filter button");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.textContent.trim();

        // All button
        if (selectedCategory === "All") {

            displayProducts(products);

        } else {

            const filteredProducts = products.filter(function(product) {

                return product.category === selectedCategory;

            });

            displayProducts(filteredProducts);
        }

        // Active button
        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});

// =================================
// LOAD CATEGORY FROM URL
// =================================

const urlParams = new URLSearchParams(window.location.search);

const selectedCategory =
    urlParams.get("category");

if (selectedCategory) {

    const selectedButton =
        Array.from(categoryButtons).find(function(button) {

            return button.textContent.trim() === selectedCategory;

        });

    if (selectedButton) {

        const filteredProducts =
            products.filter(function(product) {

                return product.category === selectedCategory;

            });

        displayProducts(filteredProducts);

        categoryButtons.forEach(function(button) {
            button.classList.remove("active");
        });

        selectedButton.classList.add("active");
    }
}

// =================================
// HOME CATEGORY CARD FILTER
// =================================

const homeCategoryCards =
    document.querySelectorAll(".category-card");

homeCategoryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const categoryName =
            card.querySelector("h3").textContent.trim();

        window.location.href =
            "product.html?category=" +
            encodeURIComponent(categoryName);

    });

});

// =================================
// UPDATE CART COUNT
// =================================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    let totalQuantity = 0;

    cart.forEach(function(item) {

        totalQuantity = totalQuantity + item.quantity;

    });

    cartCount.textContent = totalQuantity;
}


// =================================
// ADD TO CART
// =================================

let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];

function addToCart(productId) {

    const product = products.find(function(product) {
        return product.id === productId;
    });

    if (!product) {
        console.log("Product not found");
        return;
    }

    const existingProduct = cart.find(function(item) {
        return item.id === productId;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            image: product.image,
            quantity: 1
        });

    }

    // Save cart
    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

    console.log("Cart saved:", cart);

    updateCartCount();
   const currentQuantity = cart.find(function(item) {
    return item.id === productId;
}).quantity;

alert(
    product.name +
    " added to cart! Quantity: " +
    currentQuantity
);
}

// =================================
// DISPLAY CART
// =================================

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    if (!cartItems) {
        return;
    }

    // Load saved cart
    cart = JSON.parse(
        localStorage.getItem("shopEaseCart")
    ) || [];

    console.log("Cart loaded:", cart);

    // Update count
    updateCartCount();

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        return;
    }

    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.image}
            </div>

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>${item.category}</p>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

            </div>

            <div class="quantity-control">

                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });
    updateCartTotal();
}


// Run on Cart page
displayCart();
// =================================
// INCREASE QUANTITY
// =================================

function increaseQuantity(productId) {

    const item = cart.find(function(product) {
        return product.id === productId;
    });

    if (!item) {
        return;
    }

    item.quantity = item.quantity + 1;

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

    displayCart();
}


// =================================
// DECREASE QUANTITY
// =================================

function decreaseQuantity(productId) {

    const item = cart.find(function(product) {
        return product.id === productId;
    });

    if (!item) {
        return;
    }

    if (item.quantity > 1) {

        item.quantity = item.quantity - 1;

    }

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

    displayCart();
}

// =================================
// REMOVE FROM CART
// =================================

function removeFromCart(productId) {

    cart = cart.filter(function(item) {

        return item.id !== productId;

    });

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();

}

// =================================
// UPDATE CART TOTAL
// =================================

function updateCartTotal() {

    let subtotal = 0;

    cart.forEach(function(item) {

        subtotal = subtotal + (item.price * item.quantity);

    });

    const shipping = 0;

    const total = subtotal + shipping;


    // Subtotal
    const subtotalElement = document.getElementById("subtotal");

    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + subtotal.toLocaleString("en-IN");
    }


    // Shipping
    const shippingElement = document.getElementById("shipping");

    if (shippingElement) {
        shippingElement.textContent =
            "₹" + shipping.toLocaleString("en-IN");
    }


    // Total
    const totalElement = document.getElementById("total");

    if (totalElement) {
        totalElement.textContent =
            "₹" + total.toLocaleString("en-IN");
    }

}

// =================================
// CHECKOUT BUTTON
// =================================

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }

        window.location.href = "checkout.html";

    });

}

// =================================
// CHECKOUT SUMMARY
// =================================

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    if (!checkoutItems) {
        return;
    }

    cart = JSON.parse(
        localStorage.getItem("shopEaseCart")
    ) || [];

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        return;
    }

    let subtotal = 0;

    cart.forEach(function(item) {

        subtotal =
            subtotal + (item.price * item.quantity);

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";

        itemElement.innerHTML = `
            <p>
                ${item.name}
                × ${item.quantity}
            </p>

            <p>
                ₹${(
                    item.price * item.quantity
                ).toLocaleString("en-IN")}
            </p>
        `;

        checkoutItems.appendChild(itemElement);

    });


    const checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    const checkoutTotal =
        document.getElementById("checkoutTotal");


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            "₹" + subtotal.toLocaleString("en-IN");

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "₹" + subtotal.toLocaleString("en-IN");

    }

}


// Run checkout
displayCheckout();

// =================================
// PLACE ORDER
// =================================

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", function() {

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();


        // Check empty fields

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            address === ""
        ) {

            alert("Please fill all the details.");

            return;
        }


        // Check cart

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        // Order success

        alert(
            "Order placed successfully! Thank you, " + name + "!"
        );


        // Clear cart

        cart = [];

        localStorage.removeItem("shopEaseCart");


        // Go to home page

        window.location.href = "order-success.html";

    });

}

// =================================
// LOGIN VALIDATION
// =================================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function() {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();


        // Empty fields

        if (email === "" || password === "") {

            alert("Please enter email and password.");

            return;
        }


        // Basic email validation

        if (!email.includes("@")) {

            alert("Please enter a valid email.");

            return;
        }


        // Login success
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", email);
        alert("Login successful!");
      document.location = "/Frontend/index.html";
    });

}

// =================================
// LOGIN STATE
// =================================

const loginLink = document.getElementById("loginLink");

if (loginLink) {

    const isLoggedIn =
        sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {

        // Change Login → Logout
        loginLink.textContent = "Logout";

        loginLink.addEventListener("click", function(event) {

            event.preventDefault();

            // Clear login data
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("userEmail");

            // Show message
            alert("Logged out successfully!");

            // Go to Home
           setTimeout(function() {
    window.location.assign("/Frontend/index.html");
}, 100);

        });

    }

}

updateCartCount();

