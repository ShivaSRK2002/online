document.addEventListener('DOMContentLoaded', function() {
    fetchInventoryItems();
});

function fetchInventoryItems() {
    const url = 'https://firestore.googleapis.com/v1/projects/inventory-46f20/databases/(default)/documents/InventoryRecord';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert(`Error: ${response.status} ${response.statusText}`);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // Log the entire response data
            if (!data.documents || data.documents.length === 0) {
                alert('No records found.');
            } else {
                displayItems(data.documents);
                alert('Records fetched successfully.');
            }
        })
        .catch(error => {
            alert('There was a problem with the fetch operation: ' + error.message);
            console.error('Fetch error:', error);
        });
}

function displayItems(items) {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Clear existing items

    items.forEach(item => {
        // Adjust the field names based on the actual Firestore structure
        const title = item.fields.title ? item.fields.title.stringValue : 'No Title';
        const description = item.fields.description ? item.fields.description.stringValue : 'No Description';
        const quantity = item.fields.quantity ? item.fields.quantity.integerValue : 'N/A';
        const price = item.fields.price ? item.fields.price.doubleValue : 'N/A';
        const category = item.fields.category ? item.fields.category.stringValue : 'No Category';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td>${quantity}</td>
            <td>$${price}</td>
            <td>${category}</td>
        `;
        
        itemList.appendChild(row);
    });
}
