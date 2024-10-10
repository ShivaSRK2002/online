

// Admin login with Email and Password using Firebase REST API
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq2jpC7VV0A80Tr4SXaYBTRoIpqVYFGHc`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: adminEmail,
            password: adminPassword,
            returnSecureToken: true
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Invalid Admin credentials. Please try again.");
        } else {
            alert(`Welcome, Admin! Token: ${data.idToken}`);
            // Redirect to adindex.html after successful login
            window.location.href = 'adminHome.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to login. Please try again.');
    });
});
