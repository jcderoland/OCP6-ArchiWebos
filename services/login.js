function submitLoginForm() {
  // Add event listener to the form submission event
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    // Get the values from the form fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare the request data as JSON
    const requestData = { email, password };

    // Perform the POST request using fetch
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        if (data.userId && data.token) {
          // Store the authentication data in localStorage
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("token", data.token);

          // Redirect to another page
          window.location.href = "index.html";
        } else {
          // Failed authentication
          alert("Erreur dans l'identifiant ou le mot de passe");
        }
      });
  });
}

// Call the function to submit the login form
submitLoginForm();
