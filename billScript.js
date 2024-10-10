// Sample order details for demonstration
const orderDetails = {
    customer: {
        name: 'John Doe',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
    },
    items: [
        { title: 'Wooden Table', price: 150.00, quantity: 1 },
        { title: 'Wooden Chair', price: 50.00, quantity: 2 },
    ]
};

// Function to format date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

// Function to display bill details
function displayBill() {
    // Set current date and time
    document.getElementById('dateTime').innerText = getCurrentDateTime();

    // Set customer details
    document.getElementById('customerName').innerText = orderDetails.customer.name;
    document.getElementById('customerPhone').innerText = orderDetails.customer.phone;
    document.getElementById('customerAddress').innerText = orderDetails.customer.address;

    // Display items purchased
    const itemsList = document.getElementById('itemsList');
    let totalCost = 0;
    orderDetails.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<strong>${item.title}</strong> - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
        itemsList.appendChild(itemDiv);
    });

    // Set total cost
    document.getElementById('totalCost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}

// Function to download bill as PDF
function downloadBill() {
    const element = document.getElementById('billContainer');
    html2pdf()
        .from(element)
        .save('bill.pdf');
}

// Call displayBill function to show bill details
displayBill();

// Add event listener for download button
document.getElementById('downloadBillBtn').addEventListener('click', downloadBill);
