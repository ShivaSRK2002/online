/* -- without bill -- 
const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        return;
    }

    let totalPrice = 0; // Initialize total price

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        
        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        itemDetails.innerHTML = `
            <strong>Item ID:</strong> ${item.id}<br>
            <strong>Title:</strong> ${item.title}<br>
            <strong>Price:</strong> $${item.price.toFixed(2)}<br>
            <strong>Quantity:</strong> <span>${item.quantity}</span>
        `;

        // Quantity controls
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');
        
        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.onclick = () => updateQuantity(item.id, -1);
        
        const quantityDisplay = document.createElement('span');
        quantityDisplay.innerText = ` Quantity: ${item.quantity} `;
        
        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.onclick = () => updateQuantity(item.id, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);
        
        cartItemDiv.appendChild(itemDetails);
        cartItemDiv.appendChild(quantityControls);
        cartContainer.appendChild(cartItemDiv);

        // Calculate the total price for this item
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Total Price:</strong> $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        
        // Remove item if quantity is 0
        if (item.quantity <= 0) {
            cart.splice(cart.indexOf(item), 1);
        }

        // Save updated cart to session storage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Refresh the cart display
        displayCart();
    }
}

// Display cart items when the page loads
displayCart();

// Add an event listener to the confirm button
document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    // Redirect to bill.html
    window.location.href = 'bill.html';
});
*/

/* -- bill --
const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
const customerDetailsAPI = 'https://firestore.googleapis.com/v1/projects/cusotmerdetails/databases/(default)/documents/customerDetails';
const productDetailsAPI = 'https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/inventoryDetails';

// Function to fetch product details
async function fetchProductDetails() {
    try {
        const response = await fetch(productDetailsAPI);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        return data.fields; // Adjust based on the actual structure of your response
    } catch (error) {
        console.error(error);
    }
}

// Function to fetch customer details
async function fetchCustomerDetails() {
    try {
        const response = await fetch(customerDetailsAPI);
        if (!response.ok) {
            throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        return data.fields; // Adjust based on the actual structure of your response
    } catch (error) {
        console.error(error);
    }
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        return;
    }

    let totalPrice = 0; // Initialize total price

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        itemDetails.innerHTML = `
            <strong>Item ID:</strong> ${item.id}<br>
            <strong>Title:</strong> ${item.title}<br>
            <strong>Price:</strong> $${item.price.toFixed(2)}<br>
            <strong>Quantity:</strong> <span>${item.quantity}</span>
        `;

        // Quantity controls
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.onclick = () => updateQuantity(item.id, -1);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.innerText = ` Quantity: ${item.quantity} `;

        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.onclick = () => updateQuantity(item.id, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);

        cartItemDiv.appendChild(itemDetails);
        cartItemDiv.appendChild(quantityControls);
        cartContainer.appendChild(cartItemDiv);

        // Calculate the total price for this item
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Total Price:</strong> $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;

        // Remove item if quantity is 0
        if (item.quantity <= 0) {
            cart.splice(cart.indexOf(item), 1);
        }

        // Save updated cart to session storage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Refresh the cart display
        displayCart();
    }
}

// Function to populate customer details
async function populateCustomerDetails() {
    const customerDetails = await fetchCustomerDetails();
    
    if (customerDetails) {
        document.getElementById('customerName').value = customerDetails.name || '';
        document.getElementById('customerEmail').value = customerDetails.email || '';
        document.getElementById('customerPhone').value = customerDetails.phone || '';
    }
}

// Display cart items when the page loads
displayCart();
populateCustomerDetails();

// Add an event listener to the confirm button
document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    // Redirect to bill.html
    window.location.href = 'bill.html';
});

// Fetch product details when the page loads
fetchProductDetails().then(productDetails => {
    console.log(productDetails); // You can utilize this data as needed
});*/




/* --- cart is same for all customer ---
const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
const customerDetailsAPI = 'https://firestore.googleapis.com/v1/projects/cusotmerdetails/databases/(default)/documents/customerDetails';
const productDetailsAPI = 'https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/inventoryDetails';

// Fetch customer details from Firestore
async function fetchCustomerDetails() {
    try {
        const response = await fetch(customerDetailsAPI);
        if (!response.ok) {
            throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        return data.fields;  // Adjust based on API response
    } catch (error) {
        console.error(error);
    }
}

// Display cart items and customer details
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <strong>Item ID:</strong> ${item.id}<br>
            <strong>Title:</strong> ${item.title}<br>
            <strong>Price:</strong> $${item.price.toFixed(2)}<br>
            <strong>Quantity:</strong> ${item.quantity}<br>
            <hr>
        `;

        cartContainer.appendChild(cartItemDiv);
        totalPrice += item.price * item.quantity;
    });

    cartContainer.innerHTML += `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
}

// Populate customer details
async function populateCustomerDetails() {
    const customerDetails = await fetchCustomerDetails();
    if (customerDetails) {
        document.getElementById('customerName').value = customerDetails.name || '';
        document.getElementById('customerEmail').value = customerDetails.email || '';
        document.getElementById('customerPhone').value = customerDetails.phone || '';
    }
}

// Function to handle confirm payment and proceed to bill page
document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    const customerAddress = document.getElementById('customerAddress').value;

    // Ensure customer address is provided
    if (!customerAddress) {
        alert('Please enter your delivery address.');
        return;
    }

    // Create order details
    const orderDetails = {
        customerDetails: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: customerAddress,
            dateTime: new Date().toLocaleString() // Add current date and time
        },
        cartItems: cart
    };

    // Save order details to sessionStorage
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to bill.html
    window.location.href = 'bill.html';
});

// Initial function calls
displayCart();
populateCustomerDetails();
*/




const customerDetailsAPI = 'https://firestore.googleapis.com/v1/projects/cusotmerdetails/databases/(default)/documents/customerDetails';
const productDetailsAPI = 'https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/inventoryDetails';
const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Fetch customer details from Firebase
async function fetchCustomerDetails() {
    try {
        const response = await fetch(customerDetailsAPI);
        if (!response.ok) {
            throw new Error('Failed to fetch customer details');
        }
        const data = await response.json();
        const customerData = data.fields; // Adjust based on actual structure

        // Store customer details in sessionStorage
        sessionStorage.setItem('customerDetails', JSON.stringify({
            name: customerData.name.stringValue,
            email: customerData.email.stringValue,
            phone: customerData.phone.stringValue
        }));

        // Populate the form with customer details
        document.getElementById('customerName').value = customerData.name.stringValue;
        document.getElementById('customerEmail').value = customerData.email.stringValue;
        document.getElementById('customerPhone').value = customerData.phone.stringValue;
    } catch (error) {
        console.error(error);
    }
}

// Fetch product details from Firebase
async function fetchProductDetails() {
    try {
        const response = await fetch(productDetailsAPI);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        return data.fields; // Adjust based on actual structure
    } catch (error) {
        console.error(error);
    }
}

// Display cart items on the page
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        return;
    }

    let totalPrice = 0; // Initialize total price

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        itemDetails.innerHTML = `
            <strong>Item ID:</strong> ${item.id}<br>
            <strong>Title:</strong> ${item.title}<br>
            <strong>Price:</strong> $${item.price.toFixed(2)}<br>
            <strong>Quantity:</strong> <span>${item.quantity}</span>
        `;

        // Quantity controls
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('quantity-controls');

        const minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.onclick = () => updateQuantity(item.id, -1);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.innerText = ` Quantity: ${item.quantity} `;

        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.onclick = () => updateQuantity(item.id, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);

        cartItemDiv.appendChild(itemDetails);
        cartItemDiv.appendChild(quantityControls);
        cartContainer.appendChild(cartItemDiv);

        // Calculate the total price for this item
        totalPrice += item.price * item.quantity;
    });

    // Display total price
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Total Price:</strong> $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

// Update item quantity in the cart
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;

        // Remove item if quantity is 0
        if (item.quantity <= 0) {
            cart.splice(cart.indexOf(item), 1);
        }

        // Save updated cart to session storage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Refresh the cart display
        displayCart();
    }
}

// Handle Confirm Payment button
document.getElementById('confirmPaymentBtn').addEventListener('click', () => {
    // Get customer address input
    const customerAddress = document.getElementById('customerAddress').value;

    // Get customer details from sessionStorage
    const customerDetails = JSON.parse(sessionStorage.getItem('customerDetails')) || {};

    // Create order details object
    const orderDetails = {
        customerDetails: {
            name: customerDetails.name,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: customerAddress, // Add the address entered by the user
            dateTime: new Date().toLocaleString()
        },
        cartItems: JSON.parse(sessionStorage.getItem('cart')) || []
    };

    // Save order details in sessionStorage
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Redirect to bill.html
    window.location.href = 'bill.html';
});

// Fetch and display customer details when the page loads
fetchCustomerDetails();

// Display cart items when the page loads
displayCart();

