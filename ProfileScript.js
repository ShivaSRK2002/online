// Firestore URL for fetching customer details
const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/cusotmerdetails/databases/(default)/documents/customerDetails';

// Function to fetch customer details from Firestore
async function fetchCustomerDetails() {
    try {
        const response = await fetch(firestoreUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.documents.map(doc => {
            return {
                id: doc.name.split('/').pop(), // Extracting ID from the document name
                ...doc.fields
            };
        });
    } catch (error) {
        console.error('Error fetching customer details:', error);
        return [];
    }
}

// Function to display customer details in a table
async function displayCustomerDetails() {
    const customerTableBody = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    customerTableBody.innerHTML = ''; // Clear existing content

    const customers = await fetchCustomerDetails();

    customers.forEach(customer => {
        const row = customerTableBody.insertRow();

        const cellId = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellEmail = row.insertCell(2);
        const cellPhone = row.insertCell(3);
        const cellAddress = row.insertCell(4);

        cellId.innerText = customer.id;
        cellName.innerText = customer.name.stringValue; // Assuming the field is named "name"
        cellEmail.innerText = customer.email.stringValue; // Assuming the field is named "email"
        cellPhone.innerText = customer.phone.stringValue; // Assuming the field is named "phone"
        cellAddress.innerText = customer.address.stringValue; // Assuming the field is named "address"
    });
}

// Call displayCustomerDetails on page load
window.onload = displayCustomerDetails;
