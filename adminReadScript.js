/*
let cart = []; // Initialize the cart as an empty array

// Function to fetch inventory data from Firestore
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

        displayInventory(data.documents, isAdmin);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        document.getElementById('inventoryList').innerText = 'Error fetching inventory: ' + error.message;
    }
}

function displayInventory(items, isAdmin = false) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        const id = item.name.split('/').pop(); // Get the document ID
        const fields = item.fields;

        // Check if each field exists, and provide fallback values
        const cat_id = fields.Cat_id ? fields.Cat_id.stringValue : 'Unknown';
        const title = fields.Title ? fields.Title.stringValue : 'No Title';
        const description = fields.Description ? fields.Description.stringValue : 'No Description';
        const quantity = fields.Quantity ? fields.Quantity.integerValue : 0;
        const price = fields.Price ? fields.Price.doubleValue : 0.0;
        const imageUrl = fields.ImageUrl ? fields.ImageUrl.stringValue : 'placeholder.jpg';
        const isActive = fields.IsActive ? fields.IsActive.booleanValue : true;

        // Create a row for each item
        const row = document.createElement('tr');
        row.classList.add('item');

        row.innerHTML = `
            <td>${id}</td>
            <td>${cat_id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td><img src="${imageUrl}" alt="${title}" width="100"></td>
            <td>
                <button class="${isActive ? 'deactivate' : 'activate'}" onclick="toggleItemStatus('${id}', ${isActive})">
                    ${isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onclick="openUpdateModal({ id: '${id}', cat_id: '${cat_id}', title: '${title}', description: '${description}', quantity: ${quantity}, price: ${price.toFixed(2)}, imageUrl: '${imageUrl}' })">Update</button>
            </td>
        `;

        // Display items based on whether the user is an admin or customer
        if (isAdmin || isActive) {
            inventoryList.appendChild(row);
        }
    });
}

// Function to toggle item status (activate or deactivate)
async function toggleItemStatus(itemId, isActive) {
    const newStatus = !isActive;
    const updateUrl = `https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord/${itemId}?updateMask.fieldPaths=IsActive`;

    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { IsActive: { booleanValue: newStatus } } })
        });

        if (response.ok) {
            fetchInventory(true);
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
    } catch (error) {
        console.error('Error toggling item status:', error);
        alert('Failed to update item status.');
    }
}

// Function to open the update modal and fill in the fields with existing item data
function openUpdateModal(item) {
    document.getElementById('updateItemId').value = item.id;
    document.getElementById('updateCatId').value = item.cat_id;
    document.getElementById('updateTitle').value = item.title;
    document.getElementById('updateDescription').value = item.description;
    document.getElementById('updateQuantity').value = item.quantity;
    document.getElementById('updatePrice').value = item.price;
    document.getElementById('updateImageUrl').value = item.imageUrl;
    document.getElementById('updateItemModal').style.display = 'block';
}

// Function to close the update modal
function closeUpdateModal() {
    document.getElementById('updateItemModal').style.display = 'none';
}

// Event listener for the update item form submission
document.getElementById('updateItemForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const itemId = document.getElementById('updateItemId').value;
    const updatedFields = {
        Cat_id: { stringValue: document.getElementById('updateCatId').value },
        Title: { stringValue: document.getElementById('updateTitle').value },
        Description: { stringValue: document.getElementById('updateDescription').value },
        Quantity: { integerValue: parseInt(document.getElementById('updateQuantity').value) },
        Price: { doubleValue: parseFloat(document.getElementById('updatePrice').value) },
        ImageUrl: { stringValue: document.getElementById('updateImageUrl').value }
    };

    await updateInventoryItem(itemId, updatedFields);
    closeUpdateModal();
});

// Function to update an item in Firestore
async function updateInventoryItem(itemId, updatedFields) {
    const updateUrl = `https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord/${itemId}?updateMask.fieldPaths=Cat_id&updateMask.fieldPaths=Title&updateMask.fieldPaths=Description&updateMask.fieldPaths=Quantity&updateMask.fieldPaths=Price&updateMask.fieldPaths=ImageUrl`;

    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: updatedFields })
        });

        if (response.ok) {
            fetchInventory(true);
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
    } catch (error) {
        console.error('Error updating inventory item:', error);
        alert('Failed to update item.');
    }
}

// Call fetchInventory when the page loads for the customer (only active items)
fetchInventory(false);*/
let cart = []; // Initialize the cart as an empty array

// Function to fetch inventory data from Firestore
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

        displayInventory(data.documents, isAdmin);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        document.getElementById('inventoryList').innerText = 'Error fetching inventory: ' + error.message;
    }
}

function displayInventory(items, isAdmin = false) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        const id = item.name.split('/').pop(); // Get the document ID
        const fields = item.fields;

        // Check if each field exists, and provide fallback values
        const cat_id = fields.Cat_id ? fields.Cat_id.stringValue : 'Unknown';
        const title = fields.Title ? fields.Title.stringValue : 'No Title';
        const description = fields.Description ? fields.Description.stringValue : 'No Description';
        const quantity = fields.Quantity ? fields.Quantity.integerValue : 0;
        const price = fields.Price ? fields.Price.doubleValue : 0.0;
        const imageUrl = fields.ImageUrl ? fields.ImageUrl.stringValue : 'placeholder.jpg';
        const isActive = fields.IsActive ? fields.IsActive.booleanValue : true;

        // Create a row for each item
        const row = document.createElement('tr');
        row.classList.add('item');

        row.innerHTML = `
            <td>${cat_id}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td><img src="${imageUrl}" alt="${title}" width="100"></td>
            <td>
                <button class="${isActive ? 'deactivate' : 'activate'}" onclick="toggleItemStatus('${id}', ${isActive})">
                    ${isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onclick="openUpdateModal({ id: '${id}', cat_id: '${cat_id}', title: '${title}', description: '${description}', quantity: ${quantity}, price: ${price.toFixed(2)}, imageUrl: '${imageUrl}' })">Update</button>
            </td>
        `;

        // Display items based on whether the user is an admin or customer
        if (isAdmin || isActive) {
            inventoryList.appendChild(row);
        }
    });
}

// Function to toggle item status (activate or deactivate)
async function toggleItemStatus(itemId, isActive) {
    const newStatus = !isActive;
    const updateUrl = `https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord/${itemId}?updateMask.fieldPaths=IsActive`;

    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: { IsActive: { booleanValue: newStatus } } })
        });

        if (response.ok) {
            fetchInventory(true);
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
    } catch (error) {
        console.error('Error toggling item status:', error);
        alert('Failed to update item status.');
    }
}

// Function to open the update modal and fill in the fields with existing item data
function openUpdateModal(item) {
    document.getElementById('updateCatId').value = item.cat_id;
    document.getElementById('updateTitle').value = item.title;
    document.getElementById('updateDescription').value = item.description;
    document.getElementById('updateQuantity').value = item.quantity;
    document.getElementById('updatePrice').value = item.price;
    document.getElementById('updateImageUrl').value = item.imageUrl;
    document.getElementById('updateItemModal').style.display = 'block';
}

// Function to close the update modal
function closeUpdateModal() {
    document.getElementById('updateItemModal').style.display = 'none';
}

// Event listener for the update item form submission
document.getElementById('updateItemForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const updatedFields = {
        Cat_id: { stringValue: document.getElementById('updateCatId').value },
        Title: { stringValue: document.getElementById('updateTitle').value },
        Description: { stringValue: document.getElementById('updateDescription').value },
        Quantity: { integerValue: parseInt(document.getElementById('updateQuantity').value) },
        Price: { doubleValue: parseFloat(document.getElementById('updatePrice').value) },
        ImageUrl: { stringValue: document.getElementById('updateImageUrl').value }
    };

    await updateInventoryItem(itemId, updatedFields);
    closeUpdateModal();
});

// Function to update an item in Firestore
async function updateInventoryItem(itemId, updatedFields) {
    const updateUrl = `https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord/${itemId}?updateMask.fieldPaths=Cat_id&updateMask.fieldPaths=Title&updateMask.fieldPaths=Description&updateMask.fieldPaths=Quantity&updateMask.fieldPaths=Price&updateMask.fieldPaths=ImageUrl`;

    try {
        const response = await fetch(updateUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: updatedFields })
        });

        if (response.ok) {
            fetchInventory(true);
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
    } catch (error) {
        console.error('Error updating inventory item:', error);
        alert('Failed to update item.');
    }
}

// Call fetchInventory when the page loads for the customer (only active items)
fetchInventory(false);

