// cartscript.js
/*
// Load cart items from Local Storage
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    const totalAmount = document.getElementById('totalAmount');
    let total = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        totalAmount.style.display = 'none';
    } else {
        cartList.innerHTML = '';
        cartItems.forEach(item => {
            cartList.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <div class="item-title">${item.title}</div>
                        <div class="item-price">$${item.price}</div>
                    </div>
                </div>
            `;
            total += item.price; // Assuming price is a number
        });
        totalAmount.innerText = `Total Amount: $${total.toFixed(2)}`;
        totalAmount.style.display = 'block';
        document.getElementById('proceedButton').style.display = 'block';
    }
}

// Store customer details in Session Storage
function storeCustomerDetails() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;

    sessionStorage.setItem('customerName', customerName);
    sessionStorage.setItem('customerPhone', customerPhone);
    sessionStorage.setItem('customerAddress', customerAddress);
}

// Set a cookie for the order confirmation
function setOrderCookie() {
    const expires = new Date(Date.now() + 86400e3).toUTCString(); // Cookie expires in 1 day
    document.cookie = `orderSuccess=true; expires=${expires}; path=/`;
}

// Check for order success cookie
function checkOrderCookie() {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (cookiePair[0].trim() === 'orderSuccess') {
            return true;
        }
    }
    return false;
}

// Display order success message if cookie is present
function displayOrderSuccessMessage() {
    if (checkOrderCookie()) {
        document.getElementById('orderSuccessMsg').style.display = 'block';
        setTimeout(() => {
            window.location.href = 'bill.html'; // Redirect to bill.html after 3 seconds
        }, 3000);
    }
}

// Confirm payment button event listener
document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    storeCustomerDetails(); // Store customer details
    setOrderCookie(); // Set order confirmation cookie
    displayOrderSuccessMessage(); // Show success message and redirect
});

// Load cart on page load
loadCart();
displayOrderSuccessMessage(); // Check for existing order success message
*/
// cartscript.js

const inventoryURL = "https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord";
const cartURL = "https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/cart";

// Load cart items from Local Storage
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');
    const totalAmount = document.getElementById('totalAmount');
    let total = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        totalAmount.style.display = 'none';
    } else {
        cartList.innerHTML = '';
        cartItems.forEach(item => {
            cartList.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <div class="item-title">${item.title}</div>
                        <div class="item-price">$${item.price}</div>
                    </div>
                </div>
            `;
            total += item.price; // Assuming price is a number
        });
        totalAmount.innerText = `Total Amount: $${total.toFixed(2)}`;
        totalAmount.style.display = 'block';
        document.getElementById('proceedButton').style.display = 'block';
    }
}

// Store customer details in Session Storage
function storeCustomerDetails() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;

    sessionStorage.setItem('customerName', customerName);
    sessionStorage.setItem('customerPhone', customerPhone);
    sessionStorage.setItem('customerAddress', customerAddress);
}

// Set a cookie for the order confirmation
function setOrderCookie() {
    const expires = new Date(Date.now() + 86400e3).toUTCString(); // Cookie expires in 1 day
    document.cookie = `orderSuccess=true; expires=${expires}; path=/`;
}

// Check for order success cookie
function checkOrderCookie() {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (cookiePair[0].trim() === 'orderSuccess') {
            return true;
        }
    }
    return false;
}

// Display order success message if cookie is present
function displayOrderSuccessMessage() {
    if (checkOrderCookie()) {
        document.getElementById('orderSuccessMsg').style.display = 'block';
        setTimeout(() => {
            window.location.href = 'bill.html'; // Redirect to bill.html after 3 seconds
        }, 3000);
    }
}

// Confirm payment button event listener
document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    storeCustomerDetails(); // Store customer details
    setOrderCookie(); // Set order confirmation cookie
    displayOrderSuccessMessage(); // Show success message and redirect
});

// Fetch inventory items and store them in the cart
async function fetchInventory() {
    try {
        const response = await fetch(inventoryURL);
        const data = await response.json();
        const items = data.documents || [];

        // Example: Assuming you have logic to determine which items to add to cart
        // This can be replaced with your actual logic
        const selectedItems = items.filter(item => item.fields.selected && item.fields.quantity > 0); // Filter based on your logic

        // Store selected items in local storage
        localStorage.setItem('cart', JSON.stringify(selectedItems.map(item => ({
            title: item.fields.title.stringValue,
            price: item.fields.price.doubleValue,
            image: item.fields.image.stringValue, // Ensure you adjust the path according to your Firestore structure
        }))));
        loadCart(); // Load cart items after fetching and storing
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
}

// Load cart on page load and fetch inventory
loadCart();
fetchInventory(); // Fetch inventory items
displayOrderSuccessMessage(); // Check for existing order success message
