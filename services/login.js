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
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "./index.html";
      } else {
        document.querySelector("#error-message").textContent =
          "Login ou mot de passe incorrect";
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  });
}

if (document.querySelector("#login-form")) {
  submitLoginForm();
}

// Hide filter buttons and show edit button for logged in users
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const filterButtons = document.querySelector(".btn-filter");
    filterButtons.style.display = "none";

    const editButton = document.getElementById("editBtn");
    editButton.style.display = "flex";

    const editButton2 = document.getElementById("editBtn2");
    editButton2.style.display = "block";

    const loginButton = document.getElementById("loginButton");
    loginButton.style.display = "none";

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.style.display = "block";
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
