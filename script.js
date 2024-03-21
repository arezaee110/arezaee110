document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {
                alert('Registration successful!');
                registerForm.reset();
            } else {
                return response.text().then(error => Promise.reject(error));
            }
        })
        .catch(error => {
            alert('Registration failed: ' + error);
        });
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (response.ok) {
                alert('Login successful!');
                loginForm.reset();
            } else {
                return response.text().then(error => Promise.reject(error));
            }
        })
        .catch(error => {
            alert('Login failed: ' + error);
        });
        
    });
    const forgotPasswordLink = document.getElementById("forgot-password");
    const modal = document.getElementById("forgot-password-modal");
    const closeBtn = document.getElementsByClassName("close")[0];

    forgotPasswordLink.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
});