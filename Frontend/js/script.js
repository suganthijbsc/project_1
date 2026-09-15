console.log("E-Commerce Website Started Successfully!");


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let products = [];
let cart = [];


// =====================================================
// LOAD CART FROM LOCAL STORAGE
// =====================================================

const savedCart = localStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}


// =====================================================
// PRODUCT QUANTITY - PRODUCT DETAILS PAGE
// =====================================================

let quantity = 1;

function increaseQuantity() {

    quantity++;

    const quantityElement =
        document.getElementById("quantity");

    if (quantityElement) {
        quantityElement.innerText = quantity;
    }

}


function decreaseQuantity() {

    if (quantity > 1) {

        quantity--;

        const quantityElement =
            document.getElementById("quantity");

        if (quantityElement) {
            quantityElement.innerText = quantity;
        }

    }

}


// =====================================================
// OLD PRODUCT ADD TO CART
// =====================================================

function addToCart() {

    alert(
        quantity + " Laptop Model 19 added to cart!"
    );

}


// =====================================================
// CART QUANTITY - OLD CART PAGE
// =====================================================

let cartQuantity = 1;

const productPrice = 65000;


function increaseCartQuantity() {

    cartQuantity++;

    updateOldCart();

}


function decreaseCartQuantity() {

    if (cartQuantity > 1) {

        cartQuantity--;

        updateOldCart();

    }

}


function updateOldCart() {

    const total =
        productPrice * cartQuantity;

    const element =
        document.getElementById("cartTotal");

    if (element) {

        element.innerText =
            total.toLocaleString("en-IN");

    }

}


// =====================================================
// REGISTER
// =====================================================

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("registerMessage");


    if (password.length < 6) {

        message.innerText =
            "Password must contain at least 6 characters.";

        return;

    }


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        return;

    }


    message.innerText =
        "Registration successful!";

    console.log(
        "Name:",
        name,
        "Email:",
        email
    );

}


// =====================================================
// LOGIN
// =====================================================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    if (password.length < 6) {

        message.innerText =
            "Invalid password.";

        return;

    }


    message.innerText =
        "Login successful!";

}


// =====================================================
// CHECKOUT / PLACE ORDER
// =====================================================

function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value;

    const email =
        document.getElementById("customerEmail").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("customerAddress").value;

    const city =
        document.getElementById("customerCity").value;

    const pincode =
        document.getElementById("pincode").value;


    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const orderMessage =
        document.getElementById("orderMessage");


    if (!paymentElement) {

        orderMessage.innerText =
            "Please select a payment method.";

        return;

    }


    const payment =
        paymentElement.value;


    if (phone.length < 10) {

        orderMessage.innerText =
            "Please enter a valid phone number.";

        return;

    }


    if (pincode.length !== 6) {

        orderMessage.innerText =
            "Please enter a valid 6-digit pincode.";

        return;

    }


    console.log("Customer:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("City:", city);
    console.log("Pincode:", pincode);
    console.log("Payment:", payment);


    orderMessage.innerText =
        "Order placed successfully! 🎉";

}


// =====================================================
// SEARCH PRODUCTS
// =====================================================

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value.toLowerCase();


    const filteredProducts =
        products.filter(function(product) {

            const productName =
                product["Product Name"] ||
                product.ProductName ||
                product.product_name ||
                product.name ||
                "";


            return productName
                .toLowerCase()
                .includes(searchText);

        });


    displayProducts(filteredProducts);

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(category) {

    const filteredProducts =
        products.filter(function(product) {

            const productCategory =
                product["Category"] ||
                product.Category ||
                product.category ||
                "";


            return productCategory === category;

        });


    displayProducts(filteredProducts);

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (productList.length === 0) {

        container.innerHTML = `
            <div class="empty-products">
                <h2>No Products Found</h2>
            </div>
        `;

        return;

    }


    productList.forEach(function(product) {


        const productId =
            product.ProductID ||
            product.product_id ||
            product.id;


        const productName =
            product["Product Name"] ||
            product.ProductName ||
            product.product_name ||
            product.name ||
            "Product";


        const category =
            product["Category"] ||
            product.Category ||
            product.category ||
            "General";


        const price =
            Number(
                product.Price ||
                product.price ||
                0
            );


        container.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    🛍️
                </div>


                <h3>
                    ${productName}
                </h3>


                <p>
                    Category: ${category}
                </p>


                <h3>
                    ₹${price.toLocaleString("en-IN")}
                </h3>


                <button
                    onclick="addProductToCart('${productId}')">

                    Add to Cart

                </button>

            </div>

        `;

    });

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addProductToCart(productId) {

    console.log(
        "Add to Cart clicked:",
        productId
    );


    const product =
        products.find(function(product) {

            const id =
                product.ProductID ||
                product.product_id ||
                product.id;


            return String(id) ===
                   String(productId);

        });


    if (!product) {

        console.log(
            "Product not found:",
            productId
        );

        alert("Product not found!");

        return;

    }


    const id =
        product.ProductID ||
        product.product_id ||
        product.id;


    const productName =
        product["Product Name"] ||
        product.ProductName ||
        product.product_name ||
        product.name ||
        "Product";


    const category =
        product["Category"] ||
        product.Category ||
        product.category ||
        "General";


    const price =
        Number(
            product.Price ||
            product.price ||
            0
        );


    const existingProduct =
        cart.find(function(item) {

            return String(item.id) ===
                   String(id);

        });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: id,

            name: productName,

            category: category,

            price: price,

            icon: "🛍️",

            quantity: 1

        });

    }
    function addCurrentProductToCart() {

    const productName = "Laptop Model 19";


    const product = products.find(function(product) {

        const name =
            product["Product Name"] ||
            product.ProductName ||
            product.product_name ||
            product.name ||
            "";

        return name.toLowerCase() ===
               productName.toLowerCase();

    });


    if (!product) {

        console.log(
            "Product not found:",
            productName
        );

        alert("Product not found!");

        return;

    }


    const productId =
        product.ProductID ||
        product.product_id ||
        product.id;


    console.log(
        "Current Product ID:",
        productId
    );


    // Add product to cart
    for (let i = 0; i < quantity; i++) {

        addProductToCart(productId);

    }

}


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartBadge();


    console.log(
        "Current Cart:",
        cart
    );


    alert(
        productName +
        " added to cart!"
    );

}


// =====================================================
// CART BADGE
// =====================================================

function updateCartBadge() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    let totalItems = 0;


    cart.forEach(function(product) {

        totalItems +=
            Number(product.quantity);

    });


    cartCount.innerText =
        totalItems;

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");


    if (!cartContainer) {
        return;
    }


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your Cart is Empty 🛒
                </h2>

                <p>
                    Add some products to continue shopping.
                </p>

            </div>

        `;


        updateCartTotal();

        updateCartBadge();

        return;

    }


    cart.forEach(function(product, index) {


        const itemTotal =
            product.price *
            product.quantity;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="cart-product-image">

                    ${product.icon}

                </div>


                <div class="cart-product-info">

                    <h2>
                        ${product.name}
                    </h2>

                    <p>
                        ${product.category}
                    </p>

                    <p>
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                </div>


                <div class="cart-quantity">

                    <button
                        onclick="decreaseProduct(${index})">

                        -

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseProduct(${index})">

                        +

                    </button>

                </div>


                <div class="cart-price">

                    ₹${itemTotal.toLocaleString("en-IN")}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeProduct(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    updateCartTotal();

    updateCartBadge();

}


// =====================================================
// CART TOTAL
// =====================================================

function updateCartTotal() {

    let total = 0;


    cart.forEach(function(product) {

        total +=
            Number(product.price) *
            Number(product.quantity);

    });


    const subtotal =
        document.getElementById("subtotal");


    const finalTotal =
        document.getElementById("finalTotal");


    if (subtotal) {

        subtotal.innerText =
            total.toLocaleString("en-IN");

    }


    if (finalTotal) {

        finalTotal.innerText =
            total.toLocaleString("en-IN");

    }

}


// =====================================================
// REMOVE PRODUCT
// =====================================================

function removeProduct(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// =====================================================
// INCREASE PRODUCT
// =====================================================

function increaseProduct(index) {

    cart[index].quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// =====================================================
// DECREASE PRODUCT
// =====================================================

function decreaseProduct(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// =====================================================
// GO TO CART
// =====================================================

function goToCart() {

    window.location.href =
        "cart.html";

}


// =====================================================
// GO TO CHECKOUT
// =====================================================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    window.location.href =
        "checkout.html";

}


// =====================================================
// LOAD PRODUCTS FROM FLASK API
// =====================================================

async function loadProductsFromAPI() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5000/api/products"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );

        }


        const data =
            await response.json();


        products = data;


        console.log(
            "Products loaded from MySQL:",
            products
        );


        displayProducts(products);


        updateCartBadge();


    } catch (error) {

        console.error(
            "API Error:",
            error
        );

    }

}


// =====================================================
// START APPLICATION
// =====================================================

loadProductsFromAPI();

displayCart();

updateCartBadge();
typeof addProductToCart
document.querySelector("#productContainer button")?.getAttribute("onclick")