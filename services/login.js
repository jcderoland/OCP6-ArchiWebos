// Fetch API URL
const API_URL = "http://localhost:5678/api/users/login";

function submitLoginForm() {
  const form = document.querySelector("#login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { userId, token } = await response.json();

        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true"); // Changed here

        window.location.href = "./index.html";
      } else {
        document.querySelector("#error-message").textContent =
          "Failed to login.";
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  });
}

if (document.querySelector("#login-form")) {
  submitLoginForm();
}

// Function to hide filter buttons for logged in users
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const filterButtons = document.querySelector(".btn-filter");
    filterButtons.style.display = "none";

    const editButton = document.getElementById("editBtn");
    editButton.style.display = "block";
  }
});

// Function to logout
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "./login-page.html";
  alert(
    "Vous vous êtes déconnecté. Merci d'entrer votre login et mot de passe afin de vous reconnecter."
  );
});
