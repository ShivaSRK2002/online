let cart = []; // Initialize the cart as an empty array
let currentPage = 1; // Initialize the current page
const recordsPerPage = 10; // Set number of records per page

// Function to fetch inventory data from Firestore with pagination
async function fetchInventory(isAdmin = false) {
    try {
        const response = await fetch(`https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.error.message}`);
        }

        if (!data.documents || data.documents.length === 0) {
            document.getElementById('inventoryList').innerText = 'No items found.';
            return;
        }

        // Call to displayInventory with paginated items
        displayInventory(data.documents.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage), isAdmin);
        updatePaginationControls(data.documents.length);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        document.getElementById('inventoryList').innerText = 'Error fetching inventory: ' + error.message;
    }
}

// Function to display inventory items
function displayInventory(items, isAdmin = false) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        const id = item.name.split('/').pop(); // Get the document ID
        const fields = item.fields;

        // Check if each field exists, and provide fallback values
        const cat_id = fields.Cat_id ? fields.Cat_id.stringValue : 'Unknown'; // Updated field name
        const title = fields.Title ? fields.Title.stringValue : 'No Title';
        const description = fields.Description ? fields.Description.stringValue : 'No Description';
        const quantity = fields.Quantity ? fields.Quantity.integerValue : 0;
        const price = fields.Price ? fields.Price.doubleValue : 0.0;
        const imageUrl = fields.ImageUrl ? fields.ImageUrl.stringValue : 'placeholder.jpg'; // Default placeholder image
        const isActive = fields.IsActive ? fields.IsActive.booleanValue : true; // Default to active

        // Create a row for each item
        const row = document.createElement('tr');
        row.classList.add('item');

        row.innerHTML = `
            <td>${id}</td>
            <td>${cat_id}</td> <!-- Display correct cat_id -->
            <td>${title}</td>
            <td>${description}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td><img src="${imageUrl}" alt="${title}" width="100"></td>
            <td>
                <button class="${isActive ? 'deactivate' : 'activate'}" onclick="toggleItemStatus('${id}', ${isActive})">
                    ${isActive ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        `;

        // Display items based on whether the user is an admin or customer
        if (isAdmin || isActive) {
            inventoryList.appendChild(row);
        }
    });
}

// Function to update pagination controls
function updatePaginationControls(totalItems) {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = ''; // Clear existing controls

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / recordsPerPage);

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerText = '<< Previous';
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchInventory(false); // Fetch previous page for customer
        }
    });
    paginationContainer.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.disabled = currentPage === i; // Disable if this is the current page
        pageButton.addEventListener('click', () => {
            currentPage = i;
            fetchInventory(false); // Fetch selected page for customer
        });
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >>';
    nextButton.disabled = currentPage === totalPages; // Disable if on the last page
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchInventory(false); // Fetch next page for customer
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Function to toggle item status (activate or deactivate)
async function toggleItemStatus(itemId, isActive) {
    const newStatus = !isActive; // Toggle the active status
    const updateUrl = `https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord/${itemId}?updateMask.fieldPaths=IsActive`;

    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { IsActive: { booleanValue: newStatus } } })
        });

        if (response.ok) {
            // Re-fetch and update the inventory list after toggling the status
            fetchInventory(true); // Pass `true` to display both active and deactivated items for the admin
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
    } catch (error) {
        console.error('Error toggling item status:', error);
        alert('Failed to update item status.');
    }
}

// Function to add an item to the cart
function addToCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1; // Increment quantity if item already in cart
    } else {
        cart.push({ id: itemId, quantity: 1 }); // Add new item to cart
    }
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerText = `Item ID: ${item.id}, Quantity: ${item.quantity}`;
        cartContainer.appendChild(cartItemDiv);
    });
}

// Call fetchInventory when the page loads for the customer (only active items)
fetchInventory(false); // Customer view: only active items
